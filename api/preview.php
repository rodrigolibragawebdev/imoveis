<?php

declare(strict_types=1);

const PREVIEW_MAX_REDIRECTS = 4;
const PREVIEW_MAX_BODY_BYTES = 1_500_000;

/** @return array{title: string, price: ?float, location: ?string} */
function propertyUrlMetadata(string $url): array
{
    $parts = parse_url($url);
    $source = preg_replace('/^www\./i', '', (string) ($parts['host'] ?? 'site')) ?: 'site';
    $path = rawurldecode((string) ($parts['path'] ?? ''));
    $segments = array_values(array_filter(array_map('trim', explode('/', $path))));
    $slug = '';

    foreach (array_reverse($segments) as $segment) {
        if (preg_match('/[a-z]/i', $segment) === 1) {
            $slug = preg_replace('/\.html?$/i', '', $segment) ?? $segment;
            break;
        }
    }

    if (str_ends_with($source, 'vivareal.com.br')) {
        $parsed = parseVivaRealSlug($slug, $source);
        if ($parsed !== null) {
            return $parsed;
        }
    }
    if (str_ends_with($source, 'imovelweb.com.br')) {
        $parsed = parseImovelWebSlug($slug, $source);
        if ($parsed !== null) {
            return $parsed;
        }
    }
    if (str_ends_with($source, 'zapimoveis.com.br')) {
        $parsed = parseZapSlug($slug, $source);
        if ($parsed !== null) {
            return $parsed;
        }
    }

    return genericSlugMetadata($slug, $source);
}

function humanizeSlug(string $value): string
{
    $accented = [
        'condominio' => 'Condomínio',
        'dormitorios' => 'dormitórios',
        'petropolis' => 'Petrópolis',
        'sabára' => 'Sabará',
        'sabara' => 'Sabará',
        'sao' => 'São',
        'sebastiao' => 'Sebastião',
    ];
    $lowercase = ['a', 'as', 'com', 'da', 'das', 'de', 'do', 'dos', 'e', 'em'];
    $words = array_values(array_filter(explode('-', strtolower($value))));

    return implode(' ', array_map(
        static function (string $word, int $index) use ($accented, $lowercase): string {
            if (isset($accented[$word])) {
                return $accented[$word];
            }
            if ($index > 0 && in_array($word, $lowercase, true)) {
                return $word;
            }
            return mb_strtoupper(mb_substr($word, 0, 1)) . mb_substr($word, 1);
        },
        $words,
        array_keys($words),
    ));
}

/** @param array{type?: string, rooms?: int, area?: string, neighborhood?: string, city?: string, price?: float} $details */
function detailsMetadata(array $details, string $source): array
{
    $types = [
        'apartamento' => 'Apartamento',
        'casa' => 'Casa',
        'cobertura' => 'Cobertura',
        'kitnet' => 'Kitnet',
        'loft' => 'Loft',
        'studio' => 'Studio',
        'terreno' => 'Terreno',
    ];
    $rawType = strtolower((string) ($details['type'] ?? ''));
    $type = $rawType !== '' ? ($types[$rawType] ?? humanizeSlug($rawType)) : 'Imóvel';
    $rooms = isset($details['rooms'])
        ? ' com ' . $details['rooms'] . ((int) $details['rooms'] === 1 ? ' quarto' : ' quartos')
        : '';
    $area = !empty($details['area']) ? ' · ' . str_replace('.', ',', (string) $details['area']) . ' m²' : '';
    $neighborhood = !empty($details['neighborhood']) ? humanizeSlug((string) $details['neighborhood']) : '';
    $city = !empty($details['city']) ? humanizeSlug((string) $details['city']) : '';
    $location = implode(', ', array_values(array_filter([$neighborhood, $city])));

    return [
        'title' => mb_substr($type . $rooms . $area ?: "Anúncio em {$source}", 0, 180),
        'price' => isset($details['price']) ? (float) $details['price'] : null,
        'location' => $location !== '' ? $location : null,
    ];
}

function parseVivaRealSlug(string $slug, string $source): ?array
{
    $pattern = '/^(?<type>[a-z]+)-(?<rooms>\d+)-quartos-(?<neighborhood>.+?)-bairros-(?<tail>.+)$/i';
    if (preg_match($pattern, $slug, $prefix) !== 1) {
        return null;
    }
    $tailPattern = '/^(?<city>.+?)(?:-com-.+)?-(?<area>\d+(?:[.,]\d+)?)m2-(?:venda|aluguel)-rs(?<price>\d+)-id-\d+$/i';
    if (preg_match($tailPattern, (string) $prefix['tail'], $tail) !== 1) {
        return null;
    }
    return detailsMetadata([
        'type' => (string) $prefix['type'],
        'rooms' => (int) $prefix['rooms'],
        'neighborhood' => (string) $prefix['neighborhood'],
        'city' => (string) $tail['city'],
        'area' => (string) $tail['area'],
        'price' => (float) $tail['price'],
    ], $source);
}

function parseImovelWebSlug(string $slug, string $source): ?array
{
    if (preg_match('/^(?<type>[a-z]+)-a-venda-(?<neighborhood>.+)-(?<rooms>\d+)-quartos-(?<area>\d+(?:[.,]\d+)?)-\d+$/i', $slug, $match) === 1) {
        return detailsMetadata([
            'type' => (string) $match['type'],
            'rooms' => (int) $match['rooms'],
            'neighborhood' => (string) $match['neighborhood'],
            'area' => (string) $match['area'],
        ], $source);
    }
    if (preg_match('/^(?<type>[a-z]+)-(?<rooms>\d+)-dormitorios-(?<area>\d+(?:[.,]\d+)?)-m-em-(?<neighborhood>.+)-\d+$/i', $slug, $match) === 1) {
        return detailsMetadata([
            'type' => (string) $match['type'],
            'rooms' => (int) $match['rooms'],
            'neighborhood' => (string) $match['neighborhood'],
            'area' => (string) $match['area'],
        ], $source);
    }
    if (preg_match('/^(?<type>[a-z]+)-em-(?<neighborhood>.+)-\d+$/i', $slug, $match) === 1) {
        return detailsMetadata([
            'type' => (string) $match['type'],
            'neighborhood' => (string) $match['neighborhood'],
        ], $source);
    }
    return null;
}

function parseZapSlug(string $slug, string $source): ?array
{
    $pattern = '/^(?:venda|aluguel)-(?<type>[a-z]+)-(?<rooms>\d+)-quartos-(?<place>.+)-porto-alegre-rs-(?<area>\d+(?:[.,]\d+)?)m2-id-\d+$/i';
    if (preg_match($pattern, $slug, $match) !== 1) {
        return null;
    }
    return detailsMetadata([
        'type' => (string) $match['type'],
        'rooms' => (int) $match['rooms'],
        'neighborhood' => preg_replace('/^(?:mobiliado|com-[^-]+)-/i', '', (string) $match['place']) ?: (string) $match['place'],
        'city' => 'porto-alegre',
        'area' => (string) $match['area'],
    ], $source);
}

function genericSlugMetadata(string $slug, string $source): array
{
    $cleaned = preg_replace([
        '/\.html?$/i',
        '/-(?:id-)?\d{6,}$/i',
        '/^(?:comprar|aluguel|venda)-/i',
    ], '', $slug) ?? '';
    $readable = humanizeSlug($cleaned);

    return [
        'title' => mb_strlen($readable) >= 8 ? mb_substr($readable, 0, 180) : "Anúncio em {$source}",
        'price' => null,
        'location' => null,
    ];
}

function assertPublicPreviewHost(string $host): ?string
{
    $normalized = strtolower(trim($host, '[]'));
    if ($normalized === 'localhost' || str_ends_with($normalized, '.local')) {
        throw new ApiException('Endereços locais não são permitidos');
    }

    if (filter_var($normalized, FILTER_VALIDATE_IP) !== false) {
        if (filter_var($normalized, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false) {
            throw new ApiException('O link aponta para uma rede privada e não pode ser consultado');
        }
        return null;
    }

    $records = dns_get_record($normalized, DNS_A | DNS_AAAA);
    if ($records === false || $records === []) {
        throw new RuntimeException('Não foi possível localizar o site');
    }

    $addresses = [];
    foreach ($records as $record) {
        $address = $record['ip'] ?? $record['ipv6'] ?? null;
        if (is_string($address)) {
            $addresses[] = $address;
        }
    }
    if ($addresses === []) {
        throw new RuntimeException('Não foi possível localizar o site');
    }
    foreach ($addresses as $address) {
        if (filter_var($address, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false) {
            throw new ApiException('O link aponta para uma rede privada e não pode ser consultado');
        }
    }

    $ipv4 = array_values(array_filter($addresses, static fn (string $address): bool => filter_var($address, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4) !== false));
    return $ipv4[0] ?? $addresses[0];
}

/** @return array{html: string, finalUrl: string} */
function fetchPreviewHtml(string $initialUrl): array
{
    if (!extension_loaded('curl')) {
        throw new RuntimeException('A extensão curl precisa estar ativa para buscar os dados do link');
    }

    $currentUrl = $initialUrl;
    for ($redirect = 0; $redirect <= PREVIEW_MAX_REDIRECTS; $redirect++) {
        $parts = parse_url($currentUrl);
        $scheme = strtolower((string) ($parts['scheme'] ?? ''));
        $host = (string) ($parts['host'] ?? '');
        if (!in_array($scheme, ['http', 'https'], true) || $host === '') {
            throw new ApiException('O link precisa usar HTTP ou HTTPS');
        }
        if (isset($parts['user']) || isset($parts['pass'])) {
            throw new ApiException('Links com credenciais não são permitidos');
        }

        $resolvedAddress = assertPublicPreviewHost($host);
        $body = '';
        $location = null;
        $contentType = '';
        $tooLarge = false;
        $handle = curl_init($currentUrl);
        if ($handle === false) {
            throw new RuntimeException('Não foi possível iniciar a leitura do link');
        }

        $options = [
            CURLOPT_FOLLOWLOCATION => false,
            CURLOPT_CONNECTTIMEOUT => 4,
            CURLOPT_TIMEOUT => 8,
            CURLOPT_PROTOCOLS => CURLPROTO_HTTP | CURLPROTO_HTTPS,
            CURLOPT_REDIR_PROTOCOLS => CURLPROTO_HTTP | CURLPROTO_HTTPS,
            CURLOPT_USERAGENT => 'Mozilla/5.0 (compatible; CasaEmPauta/1.0; +https://www.toolsfera.com/imoveis/)',
            CURLOPT_HTTPHEADER => ['Accept: text/html,application/xhtml+xml'],
            CURLOPT_ENCODING => '',
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_SSL_VERIFYHOST => 2,
            CURLOPT_WRITEFUNCTION => static function ($curl, string $chunk) use (&$body, &$tooLarge): int {
                if (strlen($body) + strlen($chunk) > PREVIEW_MAX_BODY_BYTES) {
                    $tooLarge = true;
                    return 0;
                }
                $body .= $chunk;
                return strlen($chunk);
            },
            CURLOPT_HEADERFUNCTION => static function ($curl, string $header) use (&$location, &$contentType): int {
                $separator = strpos($header, ':');
                if ($separator !== false) {
                    $name = strtolower(trim(substr($header, 0, $separator)));
                    $value = trim(substr($header, $separator + 1));
                    if ($name === 'location') {
                        $location = $value;
                    } elseif ($name === 'content-type') {
                        $contentType = strtolower($value);
                    }
                }
                return strlen($header);
            },
        ];

        if ($resolvedAddress !== null) {
            $port = (int) ($parts['port'] ?? ($scheme === 'https' ? 443 : 80));
            $address = str_contains($resolvedAddress, ':') ? "[{$resolvedAddress}]" : $resolvedAddress;
            $options[CURLOPT_RESOLVE] = ["{$host}:{$port}:{$address}"];
        }

        curl_setopt_array($handle, $options);
        $success = curl_exec($handle);
        $status = (int) curl_getinfo($handle, CURLINFO_RESPONSE_CODE);
        $curlError = curl_error($handle);
        curl_close($handle);

        if ($tooLarge) {
            throw new RuntimeException('Página grande demais para gerar o preview');
        }
        if ($success === false) {
            throw new RuntimeException($curlError !== '' ? $curlError : 'Falha ao consultar o site');
        }
        if ($status >= 300 && $status < 400) {
            if ($location === null || $location === '') {
                throw new RuntimeException('Redirecionamento sem destino');
            }
            $currentUrl = resolveUrl($location, $currentUrl);
            continue;
        }
        if ($status < 200 || $status >= 300) {
            throw new RuntimeException("O site respondeu com status {$status}");
        }
        if ($contentType !== '' && !str_contains($contentType, 'text/html') && !str_contains($contentType, 'application/xhtml+xml')) {
            throw new RuntimeException('O link não aponta para uma página HTML');
        }
        return ['html' => $body, 'finalUrl' => $currentUrl];
    }

    throw new RuntimeException('O link possui redirecionamentos demais');
}

function resolveUrl(string $candidate, string $baseUrl): string
{
    if (filter_var($candidate, FILTER_VALIDATE_URL) !== false) {
        return canonicalHttpUrl($candidate);
    }

    $base = parse_url($baseUrl);
    $scheme = (string) ($base['scheme'] ?? 'https');
    $host = (string) ($base['host'] ?? '');
    $port = isset($base['port']) ? ':' . $base['port'] : '';

    if (str_starts_with($candidate, '//')) {
        return canonicalHttpUrl($scheme . ':' . $candidate);
    }
    if (str_starts_with($candidate, '/')) {
        return canonicalHttpUrl("{$scheme}://{$host}{$port}{$candidate}");
    }

    $basePath = (string) ($base['path'] ?? '/');
    $directory = rtrim(str_replace('\\', '/', dirname($basePath)), '/');
    return canonicalHttpUrl("{$scheme}://{$host}{$port}{$directory}/{$candidate}");
}

function metaContent(DOMXPath $xpath, string $name): ?string
{
    $escaped = strtolower($name);
    $query = "//meta[translate(@property, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')='{$escaped}' or translate(@name, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')='{$escaped}']/@content";
    $nodes = $xpath->query($query);
    if ($nodes === false || $nodes->length === 0) {
        return null;
    }
    $value = trim((string) $nodes->item(0)?->nodeValue);
    return $value !== '' ? html_entity_decode($value, ENT_QUOTES | ENT_HTML5, 'UTF-8') : null;
}

function parsePreviewPrice(mixed $value): ?float
{
    if (!is_string($value) && !is_numeric($value)) {
        return null;
    }
    $cleaned = preg_replace('/[^\d,.-]/', '', (string) $value) ?? '';
    if ($cleaned === '') {
        return null;
    }
    $normalized = str_contains($cleaned, ',')
        ? str_replace(',', '.', str_replace('.', '', $cleaned))
        : preg_replace('/,(?=\d{3}\b)/', '', $cleaned);
    if ($normalized === null || !is_numeric($normalized)) {
        return null;
    }
    $price = (float) $normalized;
    return is_finite($price) && $price >= 0 ? $price : null;
}

function findJsonLdProduct(mixed $value): ?array
{
    if (!is_array($value)) {
        return null;
    }
    $type = $value['@type'] ?? null;
    if ($type === 'Product' || (is_array($type) && in_array('Product', $type, true))) {
        return $value;
    }
    if (isset($value['@graph']) && is_array($value['@graph'])) {
        foreach ($value['@graph'] as $candidate) {
            $product = findJsonLdProduct($candidate);
            if ($product !== null) {
                return $product;
            }
        }
    }
    if (array_is_list($value)) {
        foreach ($value as $candidate) {
            $product = findJsonLdProduct($candidate);
            if ($product !== null) {
                return $product;
            }
        }
    }
    return null;
}

function productFromDocument(DOMXPath $xpath): ?array
{
    $nodes = $xpath->query("//script[translate(@type, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')='application/ld+json']");
    if ($nodes === false) {
        return null;
    }
    foreach ($nodes as $node) {
        try {
            $decoded = json_decode((string) $node->textContent, true, 64, JSON_THROW_ON_ERROR);
            $product = findJsonLdProduct($decoded);
            if ($product !== null) {
                return $product;
            }
        } catch (JsonException) {
            // JSON-LD inválido é comum e não impede o restante do preview.
        }
    }
    return null;
}

function productImage(mixed $image): ?string
{
    if (is_string($image)) {
        return $image;
    }
    if (is_array($image)) {
        if (array_is_list($image)) {
            return isset($image[0]) ? productImage($image[0]) : null;
        }
        if (isset($image['url']) && is_string($image['url'])) {
            return $image['url'];
        }
    }
    return null;
}

/** @return array{url: string, title: string, imageUrl: ?string, price: ?float, source: string, location: ?string} */
function linkPreview(string $url): array
{
    $requestedUrl = canonicalHttpUrl($url);
    $parts = parse_url($requestedUrl);
    $source = preg_replace('/^www\./i', '', (string) ($parts['host'] ?? 'site')) ?: 'site';
    $fallback = propertyUrlMetadata($requestedUrl);

    try {
        $response = fetchPreviewHtml($requestedUrl);
        $document = new DOMDocument();
        $previousErrors = libxml_use_internal_errors(true);
        $loaded = $document->loadHTML($response['html'], LIBXML_NONET | LIBXML_NOERROR | LIBXML_NOWARNING);
        libxml_clear_errors();
        libxml_use_internal_errors($previousErrors);
        if (!$loaded) {
            throw new RuntimeException('HTML inválido');
        }

        $xpath = new DOMXPath($document);
        $product = productFromDocument($xpath);
        $titleNode = $xpath->query('//title')?->item(0);
        $title = metaContent($xpath, 'og:title')
            ?? (isset($product['name']) && is_string($product['name']) ? trim($product['name']) : null)
            ?? ($titleNode !== null ? trim((string) $titleNode->textContent) : null)
            ?? $fallback['title'];
        if (trim($title) === '') {
            $title = $fallback['title'];
        }
        $rawImage = metaContent($xpath, 'og:image')
            ?? metaContent($xpath, 'twitter:image')
            ?? productImage($product['image'] ?? null);
        $offers = isset($product['offers']) && is_array($product['offers']) ? $product['offers'] : [];
        $rawPrice = metaContent($xpath, 'product:price:amount') ?? ($offers['price'] ?? null);
        $location = metaContent($xpath, 'og:locality') ?? $fallback['location'];
        $imageUrl = null;
        if (is_string($rawImage) && trim($rawImage) !== '') {
            try {
                $imageUrl = resolveUrl(trim($rawImage), $response['finalUrl']);
            } catch (Throwable) {
                $imageUrl = null;
            }
        }

        return [
            'url' => $requestedUrl,
            'title' => mb_substr(trim($title), 0, 180),
            'imageUrl' => $imageUrl,
            'price' => parsePreviewPrice($rawPrice) ?? $fallback['price'],
            'source' => $source,
            'location' => $location,
        ];
    } catch (ApiException $error) {
        throw $error;
    } catch (Throwable) {
        return [
            'url' => $requestedUrl,
            'title' => $fallback['title'],
            'imageUrl' => null,
            'price' => $fallback['price'],
            'source' => $source,
            'location' => $fallback['location'],
        ];
    }
}

function enrichProperty(array $property): array
{
    $metadata = propertyUrlMetadata((string) $property['url']);
    if (str_starts_with((string) $property['title'], 'Link de ')) {
        $property['title'] = $metadata['title'];
    }
    $property['price'] ??= $metadata['price'];
    $property['location'] ??= $metadata['location'];
    return $property;
}
