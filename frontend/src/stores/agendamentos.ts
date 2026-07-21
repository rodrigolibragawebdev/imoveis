import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import { api, getApiError } from '@/services/api'
import type { Agendamento, Property } from '@/types'

export const useAgendamentosStore = defineStore('agendamentos', () => {
  const items = ref<Agendamento[]>([])
  const loading = shallowRef(false)
  const saving = shallowRef(false)
  const error = shallowRef('')

  const activeProperties = computed(() => {
    const ids = new Set<number>()
    for (const item of items.value) {
      if (item.active) ids.add(item.propertyId)
    }
    return ids
  })

  function replace(agendamento: Agendamento) {
    const index = items.value.findIndex((item) => item.id === agendamento.id)
    if (index === -1) items.value.unshift(agendamento)
    else items.value[index] = agendamento
  }

  async function load() {
    loading.value = true
    error.value = ''
    try {
      const { data } = await api.get<Agendamento[]>('/agendamentos')
      items.value = data
    } catch (requestError) {
      error.value = getApiError(requestError)
    } finally {
      loading.value = false
    }
  }

  async function schedule(propertyId: number) {
    saving.value = true
    error.value = ''
    try {
      const { data } = await api.post<Agendamento>('/agendamentos', { propertyId })
      replace(data)
      return data
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    } finally {
      saving.value = false
    }
  }

  async function setAdvanced(id: number, advanced: boolean | null) {
    error.value = ''
    try {
      const { data } = await api.patch<Agendamento>(`/agendamentos/${id}`, { advanced })
      replace(data)
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    }
  }

  async function returnToListing(id: number) {
    error.value = ''
    try {
      const { data } = await api.post<Agendamento>(`/agendamentos/${id}/return`)
      replace(data)
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    }
  }

  async function remove(id: number) {
    error.value = ''
    try {
      await api.delete(`/agendamentos/${id}`)
      items.value = items.value.filter((item) => item.id !== id)
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    }
  }

  async function addNote(id: number, content: string) {
    error.value = ''
    try {
      const { data } = await api.post<Agendamento>(`/agendamentos/${id}/notes`, { content })
      replace(data)
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    }
  }

  async function removeNote(id: number, noteId: number) {
    error.value = ''
    try {
      await api.delete(`/agendamentos/${id}/notes/${noteId}`)
      const item = items.value.find((entry) => entry.id === id)
      if (item) item.notes = item.notes.filter((note) => note.id !== noteId)
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    }
  }

  async function addPhoto(id: number, file: File) {
    saving.value = true
    error.value = ''
    try {
      const formData = new FormData()
      formData.append('photo', file)
      const { data } = await api.post<Agendamento>(`/agendamentos/${id}/photos`, formData, {
        headers: { 'Content-Type': undefined },
      })
      replace(data)
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    } finally {
      saving.value = false
    }
  }

  async function removePhoto(id: number, photoId: number) {
    error.value = ''
    try {
      await api.delete(`/agendamentos/${id}/photos/${photoId}`)
      const item = items.value.find((entry) => entry.id === id)
      if (item) item.photos = item.photos.filter((photo) => photo.id !== photoId)
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    }
  }

  function syncPropertyAgency(property: Pick<Property, 'id' | 'agencyId' | 'agencyName' | 'agencyMatchMode'>) {
    items.value = items.value.map((agendamento) => agendamento.propertyId === property.id
      ? {
          ...agendamento,
          property: {
            ...agendamento.property,
            agencyId: property.agencyId,
            agencyName: property.agencyName,
            agencyMatchMode: property.agencyMatchMode,
          },
        }
      : agendamento)
  }

  return {
    items,
    loading,
    saving,
    error,
    activeProperties,
    load,
    schedule,
    setAdvanced,
    returnToListing,
    remove,
    addNote,
    removeNote,
    addPhoto,
    removePhoto,
    syncPropertyAgency,
  }
})
