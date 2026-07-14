import { lookup } from 'node:dns/promises'
import { isIP } from 'node:net'
import { load } from 'cheerio'
import { AppError } from '../errors/AppError.js'
import { extractPropertyUrlMetadata } from '../utils/propertyUrlMetadata.js'

export interface LinkPreview {
  url: string
  title: string
  imageUrl: string | null
  price: number | null
  source: string
  location: string | null
}

const MAX_REDIRECTS = 4
const MAX_BODY_BYTES = 1_500_000

const isPrivateIpv4 = (address: string) => {
  const parts = address.split('.').map(Number)
  const [a, b] = parts
  if (a === undefined || b === undefined) return true
  return (
    a === 10 ||
    a === 127 ||
    a === 0 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    a >= 224
  )
}

const isPrivateIpv6 = (address: string) => {
  const normalized = address.toLowerCase()
  return (
    normalized === '::1' ||
    normalized === '::' ||
    normalized.startsWith('fc') ||
    normalized.startsWith('fd') ||
    normalized.startsWith('fe8') ||
    normalized.startsWith('fe9') ||
    normalized.startsWith('fea') ||
    normalized.startsWith('feb')
  )
}

async function assertPublicUrl(url: URL) {
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new AppError('O link precisa usar HTTP ou HTTPS')
  }

  if (url.username || url.password) throw new AppError('Links com credenciais não são permitidos')

  const hostname = url.hostname.replace(/^\[|\]$/g, '').toLowerCase()
  if (hostname === 'localhost' || hostname.endsWith('.local')) {
    throw new AppError('Endereços locais não são permitidos')
  }

  const addresses = isIP(hostname) ? [{ address: hostname }] : await lookup(hostname, { all: true })
  if (
    addresses.some(({ address }) =>
      isIP(address) === 4 ? isPrivateIpv4(address) : isPrivateIpv6(address),
    )
  ) {
    throw new AppError('O link aponta para uma rede privada e não pode ser consultado')
  }
}

async function fetchWithSafeRedirects(initialUrl: URL): Promise<Response> {
  let currentUrl = initialUrl

  for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount += 1) {
    await assertPublicUrl(currentUrl)

    const response = await fetch(currentUrl, {
      redirect: 'manual',
      signal: AbortSignal.timeout(8_000),
      headers: {
        'User-Agent': 'CasaEmPauta/1.0 (+link-preview)',
        Accept: 'text/html,application/xhtml+xml',
      },
    })

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location')
      if (!location) throw new Error('Redirecionamento sem destino')
      currentUrl = new URL(location, currentUrl)
      continue
    }

    if (!response.ok) throw new Error(`O site respondeu com status ${response.status}`)
    return response
  }

  throw new Error('O link possui redirecionamentos demais')
}

async function readLimitedBody(response: Response) {
  const declaredLength = Number(response.headers.get('content-length') ?? 0)
  if (declaredLength > MAX_BODY_BYTES) throw new Error('Página grande demais para gerar preview')
  if (!response.body) return ''

  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []
  let total = 0

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    total += value.byteLength
    if (total > MAX_BODY_BYTES) {
      await reader.cancel()
      throw new Error('Página grande demais para gerar preview')
    }
    chunks.push(value)
  }

  const merged = new Uint8Array(total)
  let offset = 0
  for (const chunk of chunks) {
    merged.set(chunk, offset)
    offset += chunk.byteLength
  }
  return new TextDecoder().decode(merged)
}

function parsePrice(value?: string | null): number | null {
  if (!value) return null
  const cleaned = value.replace(/[^\d,.-]/g, '')
  if (!cleaned) return null

  const normalized = cleaned.includes(',')
    ? cleaned.replace(/\./g, '').replace(',', '.')
    : cleaned.replace(/,(?=\d{3}\b)/g, '')
  const price = Number(normalized)
  return Number.isFinite(price) && price >= 0 ? price : null
}

function findJsonLdProduct(html: string) {
  const $ = load(html)
  for (const element of $('script[type="application/ld+json"]').toArray()) {
    try {
      const parsed: unknown = JSON.parse($(element).text())
      const candidates = Array.isArray(parsed)
        ? parsed
        : typeof parsed === 'object' && parsed && '@graph' in parsed
          ? (parsed as { '@graph': unknown[] })['@graph']
          : [parsed]
      const product = candidates.find((candidate) => {
        if (!candidate || typeof candidate !== 'object') return false
        const type = (candidate as { '@type'?: string | string[] })['@type']
        return Array.isArray(type) ? type.includes('Product') : type === 'Product'
      }) as Record<string, unknown> | undefined
      if (product) return product
    } catch {
      // Metadados inválidos são comuns e não devem impedir o preview.
    }
  }
  return null
}

function resolveImage(image: unknown, baseUrl: URL): string | null {
  const candidate = Array.isArray(image) ? image[0] : image
  const raw =
    typeof candidate === 'string'
      ? candidate
      : candidate && typeof candidate === 'object' && 'url' in candidate
        ? String((candidate as { url: unknown }).url)
        : null
  if (!raw) return null
  try {
    return new URL(raw, baseUrl).toString()
  } catch {
    return null
  }
}

class LinkPreviewService {
  async get(rawUrl: string): Promise<LinkPreview> {
    const requestedUrl = new URL(rawUrl)
    const source = requestedUrl.hostname.replace(/^www\./, '')
    const urlMetadata = extractPropertyUrlMetadata(rawUrl)

    try {
      const response = await fetchWithSafeRedirects(requestedUrl)
      const html = await readLimitedBody(response)
      const finalUrl = new URL(response.url || requestedUrl)
      const $ = load(html)
      const product = findJsonLdProduct(html)
      const offers = product?.offers as Record<string, unknown> | undefined

      const title =
        $('meta[property="og:title"]').attr('content')?.trim() ||
        (typeof product?.name === 'string' ? product.name.trim() : '') ||
        $('title').text().trim() ||
        urlMetadata.title
      const image =
        $('meta[property="og:image"]').attr('content') ||
        $('meta[name="twitter:image"]').attr('content') ||
        product?.image
      const rawPrice =
        $('meta[property="product:price:amount"]').attr('content') ||
        $('[itemprop="price"]').first().attr('content') ||
        (offers && typeof offers.price !== 'undefined' ? String(offers.price) : null)

      return {
        url: requestedUrl.toString(),
        title: title.slice(0, 180),
        imageUrl: resolveImage(image, finalUrl),
        price: parsePrice(rawPrice) ?? urlMetadata.price,
        source,
        location: $('meta[property="og:locality"]').attr('content')?.trim() || urlMetadata.location,
      }
    } catch (error) {
      if (error instanceof AppError) throw error
      return {
        url: requestedUrl.toString(),
        title: urlMetadata.title,
        imageUrl: null,
        price: urlMetadata.price,
        source,
        location: urlMetadata.location,
      }
    }
  }
}

export const linkPreviewService = new LinkPreviewService()
