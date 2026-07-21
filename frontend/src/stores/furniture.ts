import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import { api, getApiError } from '@/services/api'
import type { FurnitureCategory, FurnitureItem, FurnitureItemInput } from '@/types'

export type FurnitureSort = 'price-asc' | 'price-desc' | 'newest'

export const useFurnitureStore = defineStore('furniture', () => {
  const categories = ref<FurnitureCategory[]>([])
  const items = ref<FurnitureItem[]>([])
  const loading = shallowRef(false)
  const saving = shallowRef(false)
  const error = shallowRef('')
  const categoryId = shallowRef<number | undefined>()
  const sort = shallowRef<FurnitureSort>('price-asc')

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

  async function importItems(inputs: FurnitureItemInput[]) {
    saving.value = true
    error.value = ''
    try {
      const { data } = await api.post<FurnitureItem[]>('/furniture/items/bulk', { items: inputs })
      await loadItems()
      return data
    } catch (requestError) {
      error.value = getApiError(requestError)
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

  return {
    categories,
    items,
    loading,
    saving,
    error,
    categoryId,
    sort,
    initialize,
    setFilters,
    addCategory,
    addItem,
    importItems,
    updateItem,
    removeItem,
    removeItems,
    setPurchased,
  }
})
