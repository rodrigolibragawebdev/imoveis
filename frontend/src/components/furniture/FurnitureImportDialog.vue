<template>
  <Dialog v-model:visible="visible" modal header="Importar lista em JSON" :style="{ width: 'min(48rem, 95vw)' }">
    <div class="import-layout">
      <section class="import-editor">
        <div class="editor-heading">
          <div>
            <strong>Conteúdo do arquivo</strong>
            <small>Cole o JSON ou escolha um arquivo com até 50 itens.</small>
          </div>
          <Button label="Escolher .json" icon="pi pi-upload" size="small" severity="secondary" outlined @click="openFilePicker" />
          <input ref="fileInput" type="file" accept="application/json,.json" class="file-input" @change="readFile" />
        </div>
        <Textarea v-model="jsonText" rows="15" class="json-input" spellcheck="false" aria-label="JSON para importar" />
        <Message v-if="validationError" severity="error" :closable="false" class="validation-message">{{ validationError }}</Message>
        <Message v-else-if="parsedItems.length" severity="success" :closable="false" class="validation-message">
          {{ parsedItems.length }} {{ parsedItems.length === 1 ? 'item pronto' : 'itens prontos' }} para importar.
        </Message>
      </section>

      <aside class="example-panel">
        <span class="example-eyebrow">Formato esperado</span>
        <p>Use o nome exato de uma categoria existente. Título, imagem e preço são opcionais.</p>
        <pre><code>{{ exampleJson }}</code></pre>
        <Button label="Usar exemplo" icon="pi pi-copy" size="small" text @click="useExample" />
        <div class="category-note">
          <strong>Categorias disponíveis</strong>
          <span>{{ categoryNames }}</span>
        </div>
      </aside>
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" text @click="visible = false" />
      <Button
        label="Importar itens"
        icon="pi pi-file-import"
        :loading="saving"
        :disabled="Boolean(validationError) || parsedItems.length === 0"
        @click="submit"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, shallowRef, useTemplateRef, watch } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Message from 'primevue/message'
import Textarea from 'primevue/textarea'
import type { FurnitureCategory, FurnitureItemInput } from '@/types'

interface ImportItem {
  category?: unknown
  categoryId?: unknown
  url?: unknown
  title?: unknown
  imageUrl?: unknown
  price?: unknown
}

const props = defineProps<{ categories: FurnitureCategory[]; saving: boolean }>()
const emit = defineEmits<{ submit: [items: FurnitureItemInput[]] }>()
const visible = defineModel<boolean>({ required: true })
const jsonText = shallowRef('')
const parsedItems = shallowRef<FurnitureItemInput[]>([])
const validationError = shallowRef('')
const fileInput = useTemplateRef<HTMLInputElement>('fileInput')

const fallbackCategory = computed(() => props.categories[0])
const exampleJson = computed(() => JSON.stringify({
  items: [
    {
      category: fallbackCategory.value?.name ?? 'Sala',
      url: 'https://loja.com.br/produto/sofa',
      title: 'Sofá de 3 lugares',
      imageUrl: 'https://loja.com.br/imagens/sofa.jpg',
      price: 2499.9,
    },
    {
      category: props.categories[1]?.name ?? fallbackCategory.value?.name ?? 'Cozinha',
      url: 'https://loja.com.br/produto/geladeira',
      price: 3899,
    },
  ],
}, null, 2))
const categoryNames = computed(() => props.categories.map((category) => category.name).join(', ') || 'Crie uma categoria primeiro')

watch(jsonText, validateJson)
watch(visible, (isVisible) => {
  if (isVisible && !jsonText.value) jsonText.value = exampleJson.value
})

function openFilePicker() {
  fileInput.value?.click()
}

async function readFile(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  if (file.size > 100_000) {
    validationError.value = 'O arquivo precisa ter no máximo 100 KB.'
    input.value = ''
    return
  }
  jsonText.value = await file.text()
  input.value = ''
}

function useExample() {
  jsonText.value = exampleJson.value
}

function validateJson(value: string) {
  parsedItems.value = []
  validationError.value = ''
  if (!value.trim()) {
    validationError.value = 'Cole um JSON ou escolha um arquivo.'
    return
  }

  let decoded: unknown
  try {
    decoded = JSON.parse(value)
  } catch {
    validationError.value = 'O JSON não é válido. Confira vírgulas, aspas e chaves.'
    return
  }

  const rawItems = Array.isArray(decoded)
    ? decoded
    : typeof decoded === 'object' && decoded !== null && Array.isArray((decoded as { items?: unknown }).items)
      ? (decoded as { items: unknown[] }).items
      : null
  if (!rawItems?.length) {
    validationError.value = 'Use um objeto com a propriedade “items” contendo pelo menos um item.'
    return
  }
  if (rawItems.length > 50) {
    validationError.value = 'Importe no máximo 50 itens por vez.'
    return
  }

  const categoriesByName = new Map(props.categories.map((category) => [category.name.toLocaleLowerCase('pt-BR'), category.id]))
  const categoryIds = new Set(props.categories.map((category) => category.id))
  const urls = new Set<string>()
  const normalized: FurnitureItemInput[] = []

  for (const [index, rawItem] of rawItems.entries()) {
    const position = index + 1
    if (typeof rawItem !== 'object' || rawItem === null || Array.isArray(rawItem)) {
      validationError.value = `O item ${position} precisa ser um objeto.`
      return
    }
    const item = rawItem as ImportItem
    const categoryId = typeof item.categoryId === 'number' && Number.isInteger(item.categoryId)
      ? item.categoryId
      : typeof item.category === 'string'
        ? categoriesByName.get(item.category.trim().toLocaleLowerCase('pt-BR'))
        : undefined
    if (!categoryId || !categoryIds.has(categoryId)) {
      validationError.value = `A categoria do item ${position} não existe. Use um dos nomes disponíveis.`
      return
    }
    if (typeof item.url !== 'string' || !isHttpUrl(item.url)) {
      validationError.value = `O link do item ${position} precisa começar com http:// ou https://.`
      return
    }
    const url = item.url.trim()
    if (urls.has(url)) {
      validationError.value = `O link do item ${position} está repetido no JSON.`
      return
    }
    urls.add(url)
    if (item.title !== undefined && (typeof item.title !== 'string' || item.title.trim().length > 140)) {
      validationError.value = `O título do item ${position} precisa ser um texto de até 140 caracteres.`
      return
    }
    if (item.imageUrl !== undefined && (typeof item.imageUrl !== 'string' || (item.imageUrl !== '' && !isHttpUrl(item.imageUrl)))) {
      validationError.value = `A imagem do item ${position} precisa ser um link http(s).`
      return
    }
    if (item.price !== undefined && (typeof item.price !== 'number' || !Number.isFinite(item.price) || item.price < 0)) {
      validationError.value = `O preço do item ${position} precisa ser um número positivo.`
      return
    }
    normalized.push({
      categoryId,
      url,
      title: typeof item.title === 'string' ? item.title.trim() || undefined : undefined,
      imageUrl: typeof item.imageUrl === 'string' ? item.imageUrl.trim() || undefined : undefined,
      price: typeof item.price === 'number' ? item.price : undefined,
    })
  }

  parsedItems.value = normalized
}

function isHttpUrl(value: string) {
  try {
    return ['http:', 'https:'].includes(new URL(value.trim()).protocol)
  } catch {
    return false
  }
}

function submit() {
  if (!validationError.value && parsedItems.value.length) emit('submit', parsedItems.value)
}
</script>

<style scoped>
.import-layout { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(15rem, .65fr); gap: 1rem; padding-top: .35rem; }
.import-editor, .example-panel { min-width: 0; }
.editor-heading { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: .75rem; }
.editor-heading div { display: flex; flex-direction: column; gap: .2rem; }
.editor-heading small { opacity: .58; }
.file-input { display: none; }
.json-input { width: 100%; font-family: 'Consolas', 'Courier New', monospace; font-size: .8rem; line-height: 1.55; resize: vertical; }
.validation-message { margin: .75rem 0 0; }
.example-panel { padding: 1rem; border-radius: 1rem; color: var(--cream); background: var(--forest); }
.example-panel p { margin: .55rem 0 .9rem; font-size: .8rem; line-height: 1.5; opacity: .72; }
.example-eyebrow { color: #e9b89f; font-size: .7rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
.example-panel pre { max-height: 19rem; overflow: auto; margin: 0; padding: .8rem; border: 1px solid rgba(255, 250, 240, .12); border-radius: .75rem; background: rgba(0, 0, 0, .14); }
.example-panel code { font-size: .68rem; line-height: 1.55; white-space: pre-wrap; overflow-wrap: anywhere; }
.example-panel :deep(.p-button) { color: #f3c1aa; margin-top: .45rem; }
.category-note { display: flex; flex-direction: column; gap: .3rem; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255, 250, 240, .13); font-size: .75rem; }
.category-note span { line-height: 1.45; opacity: .68; }

@media (max-width: 720px) {
  .import-layout { grid-template-columns: 1fr; }
  .example-panel { order: -1; }
  .example-panel pre { max-height: 10rem; }
  .editor-heading { align-items: flex-start; }
}
</style>
