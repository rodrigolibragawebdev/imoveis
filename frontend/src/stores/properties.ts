import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import { api, getApiError } from '@/services/api'
import type { Property, PropertyRating } from '@/types'

export const usePropertiesStore = defineStore('properties', () => {
  const items = ref<Property[]>([])
  const loading = shallowRef(false)
  const saving = shallowRef(false)
  const error = shallowRef('')

  async function load() {
    loading.value = true
    error.value = ''
    try {
      const { data } = await api.get<Property[]>('/properties')
      items.value = data
    } catch (requestError) {
      error.value = getApiError(requestError)
    } finally {
      loading.value = false
    }
  }

  async function addLinks(links: string[]) {
    saving.value = true
    error.value = ''
    try {
      const { data } = await api.post<Property[]>('/properties/bulk', { links })
      const returnedIds = new Set(data.map((property) => property.id))
      items.value = [...data, ...items.value.filter((property) => !returnedIds.has(property.id))]
      return data.length
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    } finally {
      saving.value = false
    }
  }

  async function updateReview(id: number, rating: PropertyRating, note: string) {
    try {
      const { data } = await api.patch<Property>(`/properties/${id}/review`, { rating, note })
      items.value = items.value.map((property) => (property.id === id ? data : property))
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    }
  }

  async function remove(id: number) {
    try {
      await api.delete(`/properties/${id}`)
      items.value = items.value.filter((property) => property.id !== id)
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    }
  }

  return { items, loading, saving, error, load, addLinks, updateReview, remove }
})

