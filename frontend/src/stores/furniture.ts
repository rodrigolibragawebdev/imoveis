import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import { api, getApiError } from '@/services/api'
import type { FurnitureCategory, FurnitureItem } from '@/types'

export type FurnitureSort = 'price-asc' | 'price-desc' | 'newest'

interface NewFurnitureItem {
  categoryId: number
  url: string
  title?: string
  imageUrl?: string
  price?: number
}

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

  async function addItem(input: NewFurnitureItem) {
    saving.value = true
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

  async function removeItem(id: number) {
    try {
      await api.delete(`/furniture/items/${id}`)
      items.value = items.value.filter((item) => item.id !== id)
    } catch (requestError) {
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
    removeItem,
  }
})

