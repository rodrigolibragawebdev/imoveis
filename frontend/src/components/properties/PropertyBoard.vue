<template>
  <section class="max-w-7xl mx-auto">
    <div class="grid align-items-end mb-5 md:mb-6">
      <div class="col-12 md:col-8">
        <span class="inline-block text-sm uppercase font-bold text-terracotta mb-2 eyebrow">Comparar sem complicar</span>
        <h1 class="display-font text-5xl md:text-7xl line-height-1 m-0 text-ink">Qual lugar parece<br /><em>mais casa?</em></h1>
      </div>
      <div class="col-12 md:col-4">
        <p class="text-lg line-height-3 opacity-70 mb-0">Cole os anúncios, vote e deixe o ranking organizar o que merece uma visita.</p>
      </div>
    </div>

    <PropertyLinkForm :loading="store.saving" @submit="addLinks" />

    <PropertyRankingToolbar
      :filter="store.rankingFilter"
      :neighborhood="store.neighborhoodFilter"
      :neighborhoods="store.availableNeighborhoods"
      :preferred-count="store.preferredNeighborhoods.length"
      :counts="store.filterCounts"
      @update:filter="store.setRankingFilter"
      @update:neighborhood="store.setNeighborhoodFilter"
      @manage-neighborhoods="neighborhoodDialog = true"
    />

    <Message v-if="store.error" severity="error" class="mt-4">{{ store.error }}</Message>

    <div v-if="store.loading" class="grid mt-4">
      <div v-for="index in 3" :key="index" class="col-12 md:col-6 xl:col-4">
        <Skeleton height="34rem" border-radius="1.5rem" />
      </div>
    </div>

    <div v-else-if="store.visibleItems.length" class="grid mt-4 md:mt-5">
      <div v-for="(property, index) in store.visibleItems" :key="property.id" class="col-12 md:col-6 xl:col-4">
        <PropertyCard :property="property" :position="store.rankingFilter === 'terrible' ? undefined : index + 1" @review="saveReview" @delete="remove" />
      </div>
    </div>

    <div v-else class="text-center py-8 px-3">
      <span class="empty-icon inline-flex align-items-center justify-content-center mb-4"><i class="pi pi-map text-4xl" /></span>
      <h2 class="display-font text-3xl m-0 mb-2">Nada neste recorte.</h2>
      <p class="opacity-60 m-0">Troque o ranking ou o bairro; seus imóveis continuam guardados.</p>
    </div>

    <PreferredNeighborhoodDialog
      v-model="neighborhoodDialog"
      :neighborhoods="store.preferredNeighborhoods"
      :saving="store.saving"
      @add="addNeighborhood"
      @delete="removeNeighborhood"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import { useToast } from 'primevue/usetoast'
import Message from 'primevue/message'
import Skeleton from 'primevue/skeleton'
import PreferredNeighborhoodDialog from './PreferredNeighborhoodDialog.vue'
import PropertyCard from './PropertyCard.vue'
import PropertyLinkForm from './PropertyLinkForm.vue'
import PropertyRankingToolbar from './PropertyRankingToolbar.vue'
import { usePropertiesStore } from '@/stores/properties'
import type { PropertyRating } from '@/types'

const store = usePropertiesStore()
const toast = useToast()
const neighborhoodDialog = shallowRef(false)

onMounted(store.load)

async function addLinks(links: string[]) {
  try {
    const count = await store.addLinks(links)
    toast.add({ severity: 'success', summary: 'Cards prontos', detail: `${count} imóvel(is) no ranking.`, life: 3000 })
  } catch {
    toast.add({ severity: 'error', summary: 'Não foi possível cadastrar', detail: store.error, life: 4500 })
  }
}

async function saveReview(payload: { id: number; rating: PropertyRating; note: string; preferenceScore: number | null }) {
  try {
    await store.updateReview(payload.id, payload.rating, payload.note, payload.preferenceScore)
  } catch {
    toast.add({ severity: 'error', summary: 'Avaliação não salva', detail: store.error, life: 4000 })
  }
}

async function addNeighborhood(name: string) {
  try {
    await store.addNeighborhood(name)
    toast.add({ severity: 'success', summary: 'Bairro priorizado', detail: name, life: 2600 })
  } catch {
    toast.add({ severity: 'error', summary: 'Não foi possível cadastrar', detail: store.error, life: 4000 })
  }
}

async function removeNeighborhood(id: number) {
  try {
    await store.removeNeighborhood(id)
    toast.add({ severity: 'secondary', summary: 'Bairro removido da prioridade', life: 2200 })
  } catch {
    toast.add({ severity: 'error', summary: 'Não foi possível remover', detail: store.error, life: 4000 })
  }
}

async function remove(id: number) {
  try {
    await store.remove(id)
    toast.add({ severity: 'secondary', summary: 'Imóvel removido', life: 2200 })
  } catch {
    toast.add({ severity: 'error', summary: 'Não foi possível remover', detail: store.error, life: 4000 })
  }
}
</script>

<style scoped>
.eyebrow { letter-spacing: .14em; }
.empty-icon { width: 5rem; height: 5rem; border-radius: 44% 56% 52% 48%; color: var(--terracotta); background: rgba(182, 92, 58, .1); transform: rotate(-5deg); }
</style>
