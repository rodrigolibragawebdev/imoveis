<template>
  <section class="max-w-7xl mx-auto">
    <div class="property-intro grid align-items-end mb-5 md:mb-6">
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
      :agency-count="store.realEstateAgencies.length"
      :counts="store.filterCounts"
      @update:filter="store.setRankingFilter"
      @update:neighborhood="store.setNeighborhoodFilter"
      @manage-neighborhoods="neighborhoodDialog = true"
      @manage-agencies="agencyDialog = true"
    />

    <Message v-if="store.error" severity="error" class="mt-4">{{ store.error }}</Message>

    <div v-if="store.loading" class="grid mt-4">
      <div v-for="index in 3" :key="index" class="col-12 md:col-6 xl:col-4">
        <Skeleton height="34rem" border-radius="1.5rem" />
      </div>
    </div>

    <div v-else-if="unscheduledItems.length" class="grid mt-4 md:mt-5">
      <div v-for="(property, index) in unscheduledItems" :key="property.id" class="col-12 md:col-6 xl:col-4">
        <PropertyCard
          :property="property"
          :position="store.rankingFilter === 'terrible' ? undefined : index + 1"
          :agencies="store.realEstateAgencies"
          @review="saveReview"
          @delete="confirmRemoveProperty"
          @schedule="schedule"
          @agency="assignAgency"
          @manage-agencies="agencyDialog = true"
        />
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

    <RealEstateAgencyDialog
      v-model="agencyDialog"
      :agencies="store.realEstateAgencies"
      :saving="store.saving"
      @add="addAgency"
      @update="updateAgency"
      @delete="confirmRemoveAgency"
      @reevaluate="reevaluateAgencies"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import Message from 'primevue/message'
import Skeleton from 'primevue/skeleton'
import PreferredNeighborhoodDialog from './PreferredNeighborhoodDialog.vue'
import PropertyCard from './PropertyCard.vue'
import PropertyLinkForm from './PropertyLinkForm.vue'
import PropertyRankingToolbar from './PropertyRankingToolbar.vue'
import RealEstateAgencyDialog from './RealEstateAgencyDialog.vue'
import { usePropertiesStore } from '@/stores/properties'
import { useAgendamentosStore } from '@/stores/agendamentos'
import type { PropertyAgencyMatchMode, PropertyRating } from '@/types'

const store = usePropertiesStore()
const agendamentosStore = useAgendamentosStore()
const toast = useToast()
const confirm = useConfirm()
const router = useRouter()
const neighborhoodDialog = shallowRef(false)
const agencyDialog = shallowRef(false)

const unscheduledItems = computed(() =>
  store.visibleItems.filter((property) => !agendamentosStore.activeProperties.has(property.id)),
)

onMounted(() => {
  store.load()
  agendamentosStore.load()
})

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

async function addAgency(input: { name: string; keyword: string }) {
  try {
    await store.addRealEstateAgency(input)
    toast.add({ severity: 'success', summary: 'Imobiliária adicionada', detail: input.name, life: 2600 })
  } catch {
    toast.add({ severity: 'error', summary: 'Não foi possível cadastrar', detail: store.error, life: 4000 })
  }
}

async function updateAgency(input: { id: number; name: string; keyword: string }) {
  try {
    await store.updateRealEstateAgency(input.id, { name: input.name, keyword: input.keyword })
    toast.add({ severity: 'success', summary: 'Imobiliária atualizada', detail: input.name, life: 2600 })
  } catch {
    toast.add({ severity: 'error', summary: 'Não foi possível atualizar', detail: store.error, life: 4000 })
  }
}

function confirmRemoveAgency(id: number) {
  const agency = store.realEstateAgencies.find((item) => item.id === id)
  confirm.require({
    header: 'Excluir imobiliária?',
    message: agency
      ? `${agency.name} sairá da lista. Os imóveis ligados a ela voltarão para a identificação automática.`
      : 'A imobiliária sairá da lista e os imóveis serão reavaliados.',
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Excluir',
    rejectProps: { severity: 'secondary', outlined: true },
    acceptProps: { severity: 'danger' },
    accept: () => removeAgency(id),
  })
}

async function removeAgency(id: number) {
  try {
    await store.removeRealEstateAgency(id)
    toast.add({ severity: 'secondary', summary: 'Imobiliária removida', life: 2400 })
  } catch {
    toast.add({ severity: 'error', summary: 'Não foi possível remover', detail: store.error, life: 4000 })
  }
}

async function reevaluateAgencies() {
  try {
    const result = await store.reevaluateRealEstateAgencies()
    toast.add({
      severity: 'success',
      summary: 'Imóveis reavaliados',
      detail: `${result.matched} de ${result.evaluated} reconhecidos · ${result.changed} alterados.`,
      life: 4200,
    })
  } catch {
    toast.add({ severity: 'error', summary: 'Não foi possível reavaliar', detail: store.error, life: 4000 })
  }
}

async function assignAgency(payload: { id: number; agencyId: number | null; mode: PropertyAgencyMatchMode }) {
  try {
    await store.assignPropertyAgency(payload.id, payload.agencyId, payload.mode)
    toast.add({
      severity: 'success',
      summary: payload.mode === 'manual' ? 'Imobiliária definida' : 'Identificação automática restaurada',
      life: 2400,
    })
  } catch {
    toast.add({ severity: 'error', summary: 'Não foi possível alterar', detail: store.error, life: 4000 })
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

function confirmRemoveProperty(id: number) {
  confirm.require({
    header: 'Remover imóvel?',
    message: 'O imóvel será removido da comparação.',
    icon: 'pi pi-trash',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Remover',
    rejectProps: { severity: 'secondary', outlined: true },
    acceptProps: { severity: 'danger' },
    accept: () => remove(id),
  })
}

async function schedule(propertyId: number) {
  try {
    await agendamentosStore.schedule(propertyId)
    toast.add({ severity: 'success', summary: 'Visita agendada', life: 2200 })
    router.push('/agendados')
  } catch {
    toast.add({ severity: 'error', summary: 'Não foi possível agendar', detail: agendamentosStore.error, life: 4000 })
  }
}
</script>

<style scoped>
.eyebrow { letter-spacing: .14em; }
.empty-icon { width: 5rem; height: 5rem; border-radius: 44% 56% 52% 48%; color: var(--terracotta); background: rgba(182, 92, 58, .1); transform: rotate(-5deg); }

@media (max-width: 767px) {
  .property-intro { display: none; }
}
</style>
