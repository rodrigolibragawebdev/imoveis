import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import { api, getApiError } from '@/services/api'
import type { FurnitureCategory, FurnitureItem, FurnitureItemInput, FurnitureVariation, FurnitureVariationInput } from '@/types'

export type FurnitureSort = 'price-asc' | 'price-desc' | 'newest'
export interface FurnitureImportProgress {
  current: number
  total: number
  completed: number
  batchSize: number
  resumed: boolean
  status: 'running' | 'failed' | 'completed'
}
export interface FurnitureImportResult {
  importedItems: FurnitureItem[]
  importedInPreviousAttempts: number
  resumed: boolean
  totalBatches: number
}
interface FurnitureImportCheckpoint {
  version: 1
  batchSize: number
  totalBatches: number
  completedBatches: number
  importedCount: number
  updatedAt: string
}

const IMPORT_BATCH_SIZE = 10
const IMPORT_CHECKPOINT_PREFIX = 'casa-em-pauta:furniture-import:v1:'

export const useFurnitureStore = defineStore('furniture', () => {
  const categories = ref<FurnitureCategory[]>([])
  const items = ref<FurnitureItem[]>([])
  const trashItems = ref<FurnitureItem[]>([])
  const loading = shallowRef(false)
  const trashLoading = shallowRef(false)
  const saving = shallowRef(false)
  const error = shallowRef('')
  const categoryId = shallowRef<number | undefined>()
  const sort = shallowRef<FurnitureSort>('price-asc')
  const importProgress = shallowRef<FurnitureImportProgress | null>(null)

  function clearImportProgress() {
    importProgress.value = null
  }

  async function loadCategories() {
    try {
      const { data } = await api.get<FurnitureCategory[]>('/furniture/categories')
      categories.value = data
    } catch (requestError) {
      error.value = getApiError(requestError)
    }
  }

  async function loadItems() {
    loading.value = true
    error.value = ''
    try {
      const { data } = await api.get<FurnitureItem[]>('/furniture/items', {
        params: { categoryId: categoryId.value, sort: sort.value },
      })
      items.value = data
    } catch (requestError) {
      error.value = getApiError(requestError)
    } finally {
      loading.value = false
    }
  }

  async function loadTrash() {
    trashLoading.value = true
    error.value = ''
    try {
      const { data } = await api.get<FurnitureItem[]>('/furniture/items/trash')
      trashItems.value = data
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    } finally {
      trashLoading.value = false
    }
  }

  async function initialize() {
    await Promise.all([loadCategories(), loadItems()])
  }

  async function setFilters(nextCategoryId: number | undefined, nextSort: FurnitureSort) {
    categoryId.value = nextCategoryId
    sort.value = nextSort
    await loadItems()
  }

  async function addCategory(name: string, color: string) {
    saving.value = true
    try {
      const { data } = await api.post<FurnitureCategory>('/furniture/categories', { name, color })
      categories.value = [...categories.value, data].sort((a, b) => a.name.localeCompare(b.name))
      return data
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    } finally {
      saving.value = false
    }
  }

  async function addItem(input: FurnitureItemInput) {
    saving.value = true
    error.value = ''
    try {
      await api.post<FurnitureItem>('/furniture/items', input)
      await loadItems()
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    } finally {
      saving.value = false
    }
  }

  async function importItems(inputs: FurnitureItemInput[]): Promise<FurnitureImportResult> {
    error.value = ''
    const batches = Array.from(
      { length: Math.ceil(inputs.length / IMPORT_BATCH_SIZE) },
      (_, index) => inputs.slice(index * IMPORT_BATCH_SIZE, (index + 1) * IMPORT_BATCH_SIZE),
    )
    const importId = await importFingerprint(inputs)
    saving.value = true
    const checkpointKey = `${IMPORT_CHECKPOINT_PREFIX}${importId}`
    const savedCheckpoint = readImportCheckpoint(checkpointKey, batches.length)
    const completedBefore = savedCheckpoint?.completedBatches ?? 0
    let completedBatches = completedBefore
    let importedCount = savedCheckpoint?.importedCount ?? 0
    const resumed = completedBefore > 0
    const importedItems: FurnitureItem[] = []
    let currentBatch = Math.min(completedBatches + 1, batches.length)

    writeImportCheckpoint(checkpointKey, {
      version: 1,
      batchSize: IMPORT_BATCH_SIZE,
      totalBatches: batches.length,
      completedBatches,
      importedCount,
      updatedAt: new Date().toISOString(),
    })

    try {
      for (let index = completedBatches; index < batches.length; index++) {
        const batch = batches[index] ?? []
        currentBatch = index + 1
        importProgress.value = {
          current: currentBatch,
          total: batches.length,
          completed: completedBatches,
          batchSize: batch.length,
          resumed,
          status: 'running',
        }
        const { data } = await api.post<FurnitureItem[]>('/furniture/items/bulk', {
          items: batch,
          importMeta: { id: importId, batch: currentBatch, totalBatches: batches.length },
        }, { timeout: 120_000 })
        importedItems.push(...data)
        importedCount += data.length
        completedBatches = currentBatch
        writeImportCheckpoint(checkpointKey, {
          version: 1,
          batchSize: IMPORT_BATCH_SIZE,
          totalBatches: batches.length,
          completedBatches,
          importedCount,
          updatedAt: new Date().toISOString(),
        })
      }
      await loadItems()
      removeImportCheckpoint(checkpointKey)
      importProgress.value = {
        current: batches.length,
        total: batches.length,
        completed: batches.length,
        batchSize: batches.at(-1)?.length ?? 0,
        resumed,
        status: 'completed',
      }
      return {
        importedItems,
        importedInPreviousAttempts: savedCheckpoint?.importedCount ?? 0,
        resumed,
        totalBatches: batches.length,
      }
    } catch (requestError) {
      const detail = getApiError(requestError)
      error.value = `O lote ${currentBatch} de ${batches.length} falhou. ${detail} Tente novamente para continuar do último lote concluído.`
      importProgress.value = {
        current: currentBatch,
        total: batches.length,
        completed: completedBatches,
        batchSize: batches[currentBatch - 1]?.length ?? 0,
        resumed,
        status: 'failed',
      }
      throw requestError
    } finally {
      saving.value = false
    }
  }

  async function updateItem(id: number, input: FurnitureItemInput) {
    saving.value = true
    error.value = ''
    try {
      await api.patch<FurnitureItem>(`/furniture/items/${id}`, input)
      await loadItems()
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    } finally {
      saving.value = false
    }
  }

  async function removeItem(id: number) {
    error.value = ''
    try {
      await api.delete(`/furniture/items/${id}`)
      items.value = items.value.filter((item) => item.id !== id)
      trashItems.value = []
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    }
  }

  async function removeItems(ids: number[]) {
    error.value = ''
    try {
      await api.delete('/furniture/items/bulk', { data: { ids } })
      const removedIds = new Set(ids)
      items.value = items.value.filter((item) => !removedIds.has(item.id))
      trashItems.value = []
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    }
  }

  async function setPurchased(id: number, isPurchased: boolean) {
    error.value = ''
    const current = items.value.find((item) => item.id === id)
    const previousValue = current?.isPurchased
    if (current) current.isPurchased = isPurchased
    try {
      await api.patch(`/furniture/items/${id}/purchased`, { isPurchased })
    } catch (requestError) {
      if (current && previousValue !== undefined) current.isPurchased = previousValue
      error.value = getApiError(requestError)
      throw requestError
    }
  }

  async function restoreItem(id: number) {
    saving.value = true
    error.value = ''
    try {
      await api.patch(`/furniture/items/${id}/restore`)
      trashItems.value = trashItems.value.filter((item) => item.id !== id)
      await loadItems()
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    } finally {
      saving.value = false
    }
  }

  async function restoreItems(ids: number[]) {
    if (!ids.length) return
    saving.value = true
    error.value = ''
    try {
      await api.patch('/furniture/items/bulk/restore', { ids })
      const restoredIds = new Set(ids)
      trashItems.value = trashItems.value.filter((item) => !restoredIds.has(item.id))
      await loadItems()
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    } finally {
      saving.value = false
    }
  }

  async function permanentlyDeleteItem(id: number) {
    saving.value = true
    error.value = ''
    try {
      await api.delete(`/furniture/items/trash/${id}`)
      trashItems.value = trashItems.value.filter((item) => item.id !== id)
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    } finally {
      saving.value = false
    }
  }

  async function permanentlyDeleteItems(ids: number[]) {
    if (!ids.length) return
    saving.value = true
    error.value = ''
    try {
      await api.delete('/furniture/items/trash/bulk', { data: { ids } })
      const deletedIds = new Set(ids)
      trashItems.value = trashItems.value.filter((item) => !deletedIds.has(item.id))
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    } finally {
      saving.value = false
    }
  }

  async function addVariation(itemId: number, input: FurnitureVariationInput) {
    saving.value = true
    error.value = ''
    try {
      await api.post<FurnitureVariation>(`/furniture/items/${itemId}/variations`, input)
      await loadItems()
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    } finally {
      saving.value = false
    }
  }

  async function updateVariation(itemId: number, variationId: number, input: FurnitureVariationInput) {
    saving.value = true
    error.value = ''
    try {
      await api.patch<FurnitureVariation>(`/furniture/items/${itemId}/variations/${variationId}`, input)
      await loadItems()
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    } finally {
      saving.value = false
    }
  }

  async function removeVariation(itemId: number, variationId: number) {
    error.value = ''
    try {
      await api.delete(`/furniture/items/${itemId}/variations/${variationId}`)
      const item = items.value.find((candidate) => candidate.id === itemId)
      if (item) item.variations = item.variations.filter((variation) => variation.id !== variationId)
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    }
  }

  return {
    categories,
    items,
    trashItems,
    loading,
    trashLoading,
    saving,
    error,
    categoryId,
    sort,
    importProgress,
    clearImportProgress,
    initialize,
    loadTrash,
    setFilters,
    addCategory,
    addItem,
    importItems,
    updateItem,
    removeItem,
    removeItems,
    restoreItem,
    restoreItems,
    permanentlyDeleteItem,
    permanentlyDeleteItems,
    setPurchased,
    addVariation,
    updateVariation,
    removeVariation,
  }
})

async function importFingerprint(inputs: FurnitureItemInput[]) {
  const content = JSON.stringify(inputs)
  if (globalThis.crypto?.subtle) {
    const digest = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(content))
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
  }

  let first = 2166136261
  let second = 2246822519
  for (let index = 0; index < content.length; index++) {
    const code = content.charCodeAt(index)
    first = Math.imul(first ^ code, 16777619)
    second = Math.imul(second ^ code, 3266489917)
  }
  const fallback = `${(first >>> 0).toString(16).padStart(8, '0')}${(second >>> 0).toString(16).padStart(8, '0')}`
  return fallback.repeat(4)
}

function readImportCheckpoint(key: string, totalBatches: number): FurnitureImportCheckpoint | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<FurnitureImportCheckpoint>
    if (
      parsed.version !== 1
      || parsed.batchSize !== IMPORT_BATCH_SIZE
      || parsed.totalBatches !== totalBatches
      || !Number.isInteger(parsed.completedBatches)
      || (parsed.completedBatches ?? -1) < 0
      || (parsed.completedBatches ?? totalBatches + 1) >= totalBatches
      || typeof parsed.importedCount !== 'number'
      || parsed.importedCount < 0
    ) {
      localStorage.removeItem(key)
      return null
    }
    return parsed as FurnitureImportCheckpoint
  } catch {
    return null
  }
}

function writeImportCheckpoint(key: string, checkpoint: FurnitureImportCheckpoint) {
  try {
    localStorage.setItem(key, JSON.stringify(checkpoint))
  } catch {
    // A importação continua mesmo quando o navegador bloqueia ou esgota o localStorage.
  }
}

function removeImportCheckpoint(key: string) {
  try {
    localStorage.removeItem(key)
  } catch {
    // Nada a fazer: um checkpoint completo será invalidado na próxima leitura.
  }
}
