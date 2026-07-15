import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import { api, getApiError } from '@/services/api'
import type { FinancingSimulation, FinancingSimulationInput } from '@/types'

export const useFinancingStore = defineStore('financing', () => {
  const items = ref<FinancingSimulation[]>([])
  const loading = shallowRef(false)
  const saving = shallowRef(false)
  const error = shallowRef('')

  async function load() {
    loading.value = true
    error.value = ''
    try {
      const { data } = await api.get<FinancingSimulation[]>('/financing-simulations')
      items.value = data
    } catch (requestError) {
      error.value = getApiError(requestError)
    } finally {
      loading.value = false
    }
  }

  async function create(input: FinancingSimulationInput) {
    saving.value = true
    error.value = ''
    try {
      await api.post<FinancingSimulation>('/financing-simulations', input)
      await load()
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    } finally {
      saving.value = false
    }
  }

  async function remove(id: number) {
    error.value = ''
    try {
      await api.delete(`/financing-simulations/${id}`)
      items.value = items.value.filter((item) => item.id !== id)
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    }
  }

  return { items, loading, saving, error, load, create, remove }
})
