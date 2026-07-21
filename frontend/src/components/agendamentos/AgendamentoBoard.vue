<template>
  <section class="max-w-7xl mx-auto">
    <div class="property-intro grid align-items-end mb-5 md:mb-6">
      <div class="col-12 md:col-8">
        <span class="inline-block text-sm uppercase font-bold text-terracotta mb-2 eyebrow">Visitas planejadas</span>
        <h1 class="display-font text-5xl md:text-7xl line-height-1 m-0 text-ink">O que fica<br /><em>pra ver de perto?</em></h1>
      </div>
      <div class="col-12 md:col-4">
        <p class="text-lg line-height-3 opacity-70 mb-0">Anote o que reparar na visita, guarde fotos do local e marque se seguiu em frente.</p>
      </div>
    </div>

    <Message v-if="store.error" severity="error" class="mt-4">{{ store.error }}</Message>
    <Message v-else-if="propertiesStore.error" severity="error" class="mt-4">{{ propertiesStore.error }}</Message>

    <div v-if="store.loading" class="grid mt-4">
      <div v-for="index in 3" :key="index" class="col-12 md:col-6 xl:col-4">
        <Skeleton height="24rem" border-radius="1.5rem" />
      </div>
    </div>

    <div v-else-if="store.orderedItems.length" class="grid mt-4 md:mt-5">
      <div v-for="agendamento in store.orderedItems" :key="agendamento.id" class="col-12 md:col-6 xl:col-4">
        <AgendamentoCard
          :agendamento="agendamento"
          :agencies="propertiesStore.realEstateAgencies"
          @set-advanced="setAdvanced"
          @return-to-listing="returnToListing"
          @remove="confirmRemove"
          @add-note="addNote"
          @remove-note="removeNote"
          @add-photo="addPhoto"
          @remove-photo="removePhoto"
          @agency="assignAgency"
          @manage-agencies="agencyDialog = true"
        />
      </div>
    </div>

    <div v-else class="text-center py-8 px-3">
      <span class="empty-icon inline-flex align-items-center justify-content-center mb-4"><i class="pi pi-calendar text-4xl" /></span>
      <h2 class="display-font text-3xl m-0 mb-2">Nenhuma visita agendada.</h2>
      <p class="opacity-60 m-0">Vá até um imóvel e clique em "Agendar visita" para começar.</p>
    </div>

    <RealEstateAgencyDialog
      v-model="agencyDialog"
      :agencies="propertiesStore.realEstateAgencies"
      :saving="propertiesStore.saving"
      @add="addAgency"
      @update="updateAgency"
      @delete="confirmRemoveAgency"
      @reevaluate="reevaluateAgencies"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import Message from 'primevue/message'
import Skeleton from 'primevue/skeleton'
import AgendamentoCard from './AgendamentoCard.vue'
import RealEstateAgencyDialog from '@/components/properties/RealEstateAgencyDialog.vue'
import { useAgendamentosStore } from '@/stores/agendamentos'
import { useRealEstateAgencies } from '@/composables/useRealEstateAgencies'

const store = useAgendamentosStore()
const toast = useToast()
const confirm = useConfirm()
const {
  store: propertiesStore,
  agencyDialog,
  addAgency,
  updateAgency,
  confirmRemoveAgency,
  reevaluateAgencies,
  assignAgency,
} = useRealEstateAgencies({
  onPropertyAssigned: store.syncPropertyAgency,
  afterAssignmentsChanged: store.load,
})

onMounted(() => {
  store.load()
  propertiesStore.load()
})

async function setAdvanced(payload: { id: number; advanced: boolean | null }) {
  try {
    await store.setAdvanced(payload.id, payload.advanced)
  } catch {
    toast.add({ severity: 'error', summary: 'Não foi possível atualizar', detail: store.error, life: 4000 })
  }
}

async function returnToListing(id: number) {
  try {
    await store.returnToListing(id)
    toast.add({ severity: 'secondary', summary: 'Imóvel de volta na listagem', life: 2200 })
  } catch {
    toast.add({ severity: 'error', summary: 'Não foi possível voltar', detail: store.error, life: 4000 })
  }
}

async function remove(id: number) {
  try {
    await store.remove(id)
    toast.add({ severity: 'secondary', summary: 'Agendamento removido', life: 2200 })
  } catch {
    toast.add({ severity: 'error', summary: 'Não foi possível remover', detail: store.error, life: 4000 })
  }
}

function confirmRemove(id: number) {
  confirm.require({
    header: 'Remover agendamento?',
    message: 'O agendamento, suas notas e suas fotos serão apagados.',
    icon: 'pi pi-trash',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Remover',
    rejectProps: { severity: 'secondary', outlined: true },
    acceptProps: { severity: 'danger' },
    accept: () => remove(id),
  })
}

async function addNote(payload: { id: number; content: string }) {
  try {
    await store.addNote(payload.id, payload.content)
  } catch {
    toast.add({ severity: 'error', summary: 'Não foi possível salvar a nota', detail: store.error, life: 4000 })
  }
}

async function removeNote(payload: { id: number; noteId: number }) {
  try {
    await store.removeNote(payload.id, payload.noteId)
  } catch {
    toast.add({ severity: 'error', summary: 'Não foi possível remover a nota', detail: store.error, life: 4000 })
  }
}

async function addPhoto(payload: { id: number; file: File }) {
  try {
    await store.addPhoto(payload.id, payload.file)
  } catch {
    toast.add({ severity: 'error', summary: 'Não foi possível enviar a foto', detail: store.error, life: 4000 })
  }
}

async function removePhoto(payload: { id: number; photoId: number }) {
  try {
    await store.removePhoto(payload.id, payload.photoId)
  } catch {
    toast.add({ severity: 'error', summary: 'Não foi possível remover a foto', detail: store.error, life: 4000 })
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
