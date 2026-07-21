import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import { api, getApiError } from '@/services/api'
import type {
  AgencyReevaluationResult,
  PreferredNeighborhood,
  Property,
  PropertyAgencyMatchMode,
  PropertyRankingFilter,
  PropertyRating,
  RealEstateAgency,
} from '@/types'

function comparableText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim()
}

export const usePropertiesStore = defineStore('properties', () => {
  const items = ref<Property[]>([])
  const preferredNeighborhoods = ref<PreferredNeighborhood[]>([])
  const realEstateAgencies = ref<RealEstateAgency[]>([])
  const loading = shallowRef(false)
  const saving = shallowRef(false)
  const error = shallowRef('')
  const rankingFilter = shallowRef<PropertyRankingFilter>('ranking')
  const neighborhoodFilter = shallowRef<string | null>(null)

  const availableNeighborhoods = computed(() => {
    const names = new Map<string, string>()
    for (const item of items.value) {
      if (item.neighborhood) names.set(comparableText(item.neighborhood), item.neighborhood)
    }
    for (const neighborhood of preferredNeighborhoods.value) {
      names.set(comparableText(neighborhood.name), neighborhood.name)
    }
    return [...names.values()].sort((left, right) => left.localeCompare(right, 'pt-BR'))
  })

  const filterCounts = computed<Record<PropertyRankingFilter, number>>(() => ({
    ranking: items.value.filter((item) => item.rating !== 'terrible').length,
    liked: items.value.filter((item) => item.rating === 'liked').length,
    unrated: items.value.filter((item) => item.rating === null).length,
    disliked: items.value.filter((item) => item.rating === 'disliked').length,
    terrible: items.value.filter((item) => item.rating === 'terrible').length,
    duplicates: items.value.filter((item) => item.hasDuplicates && item.rating !== 'terrible').length,
  }))

  const visibleItems = computed(() => items.value.filter((item) => {
    const matchesRanking = {
      ranking: item.rating !== 'terrible',
      liked: item.rating === 'liked',
      unrated: item.rating === null,
      disliked: item.rating === 'disliked',
      terrible: item.rating === 'terrible',
      duplicates: item.hasDuplicates && item.rating !== 'terrible',
    }[rankingFilter.value]
    if (!matchesRanking) return false
    if (!neighborhoodFilter.value) return true
    return comparableText(item.neighborhood ?? '') === comparableText(neighborhoodFilter.value)
  }))

  async function loadProperties() {
    const { data } = await api.get<Property[]>('/properties')
    items.value = data
  }

  async function loadNeighborhoods() {
    const { data } = await api.get<PreferredNeighborhood[]>('/neighborhoods')
    preferredNeighborhoods.value = data
  }

  async function loadRealEstateAgencies() {
    const { data } = await api.get<RealEstateAgency[]>('/real-estate-agencies')
    realEstateAgencies.value = data
  }

  async function load() {
    loading.value = true
    error.value = ''
    try {
      await Promise.all([loadProperties(), loadNeighborhoods(), loadRealEstateAgencies()])
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
      await loadProperties()
      return data.length
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    } finally {
      saving.value = false
    }
  }

  async function updateReview(id: number, rating: PropertyRating, note: string, preferenceScore: number | null) {
    error.value = ''
    try {
      const { data } = await api.patch<Property>(`/properties/${id}/review`, { rating, note, preferenceScore })
      items.value = items.value.map((property) => (property.id === id ? data : property))
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    }
  }

  async function addNeighborhood(name: string) {
    saving.value = true
    error.value = ''
    try {
      await api.post<PreferredNeighborhood>('/neighborhoods', { name })
      await Promise.all([loadNeighborhoods(), loadProperties()])
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    } finally {
      saving.value = false
    }
  }

  async function removeNeighborhood(id: number) {
    saving.value = true
    error.value = ''
    try {
      await api.delete(`/neighborhoods/${id}`)
      await Promise.all([loadNeighborhoods(), loadProperties()])
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    } finally {
      saving.value = false
    }
  }

  async function addRealEstateAgency(input: { name: string; keyword: string }) {
    saving.value = true
    error.value = ''
    try {
      await api.post<RealEstateAgency>('/real-estate-agencies', input)
      await loadRealEstateAgencies()
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    } finally {
      saving.value = false
    }
  }

  async function updateRealEstateAgency(id: number, input: { name: string; keyword: string }) {
    saving.value = true
    error.value = ''
    try {
      await api.patch<RealEstateAgency>(`/real-estate-agencies/${id}`, input)
      await Promise.all([loadRealEstateAgencies(), loadProperties()])
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    } finally {
      saving.value = false
    }
  }

  async function removeRealEstateAgency(id: number) {
    saving.value = true
    error.value = ''
    try {
      await api.delete(`/real-estate-agencies/${id}`)
      await Promise.all([loadRealEstateAgencies(), loadProperties()])
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    } finally {
      saving.value = false
    }
  }

  async function reevaluateRealEstateAgencies() {
    saving.value = true
    error.value = ''
    try {
      const { data } = await api.post<AgencyReevaluationResult>('/real-estate-agencies/reevaluate')
      await loadProperties()
      return data
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    } finally {
      saving.value = false
    }
  }

  async function assignPropertyAgency(id: number, agencyId: number | null, mode: PropertyAgencyMatchMode) {
    error.value = ''
    try {
      const { data } = await api.patch<Property>(`/properties/${id}/agency`, { agencyId, mode })
      items.value = items.value.map((property) => (property.id === id ? data : property))
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    }
  }

  async function remove(id: number) {
    error.value = ''
    try {
      await api.delete(`/properties/${id}`)
      items.value = items.value.filter((property) => property.id !== id)
    } catch (requestError) {
      error.value = getApiError(requestError)
      throw requestError
    }
  }

  function setRankingFilter(filter: PropertyRankingFilter) {
    rankingFilter.value = filter
  }

  function setNeighborhoodFilter(neighborhood: string | null) {
    neighborhoodFilter.value = neighborhood
  }

  return {
    items,
    preferredNeighborhoods,
    realEstateAgencies,
    loading,
    saving,
    error,
    rankingFilter,
    neighborhoodFilter,
    availableNeighborhoods,
    filterCounts,
    visibleItems,
    load,
    addLinks,
    updateReview,
    addNeighborhood,
    removeNeighborhood,
    addRealEstateAgency,
    updateRealEstateAgency,
    removeRealEstateAgency,
    reevaluateRealEstateAgencies,
    assignPropertyAgency,
    remove,
    setRankingFilter,
    setNeighborhoodFilter,
  }
})
