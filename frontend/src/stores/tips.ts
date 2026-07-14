import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import { api, getApiError } from '@/services/api'
import type { Tip } from '@/types'

export const useTipsStore = defineStore('tips', () => {
  const items = ref<Tip[]>([])
  const loading = shallowRef(false)
  const error = shallowRef('')

  async function load() {
    loading.value = true
    try {
      const { data } = await api.get<Tip[]>('/tips')
      items.value = data
    } catch (requestError) {
      error.value = getApiError(requestError)
    } finally {
      loading.value = false
    }
  }

  return { items, loading, error, load }
})

