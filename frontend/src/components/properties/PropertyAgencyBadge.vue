<template>
  <div class="agency-badge-wrapper">
    <Button
      :label="property.agencyName ?? 'Adicionar imobiliária'"
      :icon="property.agencyName ? 'pi pi-pencil' : 'pi pi-plus'"
      severity="secondary"
      size="small"
      class="agency-label"
      :aria-label="agencyButtonLabel"
      @click="toggleEditor"
    />

    <Popover ref="agencyPopover">
      <div class="agency-editor">
        <span class="block text-xs uppercase font-bold text-terracotta tracking-wide mb-1">Imobiliária</span>
        <strong class="block text-ink mb-1">{{ property.agencyName ?? 'Ainda não identificada' }}</strong>
        <small class="block opacity-60 line-height-3 mb-3">
          {{ property.agencyMatchMode === 'manual' ? 'Escolha manual preservada nas reavaliações.' : 'Identificação automática pela URL.' }}
        </small>
        <Select
          v-model="agencyDraft"
          :options="agencies"
          option-label="name"
          option-value="id"
          show-clear
          filter
          placeholder="Selecionar imobiliária"
          class="w-full"
        />
        <div class="flex justify-content-end gap-2 mt-3">
          <Button label="Gerenciar lista" severity="secondary" text size="small" @click="manageAgencies" />
          <Button label="Salvar" icon="pi pi-check" size="small" @click="saveAgency" />
        </div>
        <Button
          label="Voltar à identificação automática"
          icon="pi pi-refresh"
          severity="secondary"
          text
          size="small"
          class="w-full mt-1"
          @click="useAutomaticAgency"
        />
      </div>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { computed, shallowRef, useTemplateRef } from 'vue'
import Button from 'primevue/button'
import Popover from 'primevue/popover'
import Select from 'primevue/select'
import type { Property, PropertyAgencyMatchMode, RealEstateAgency } from '@/types'

type AgencyProperty = Pick<Property, 'id' | 'agencyId' | 'agencyName' | 'agencyMatchMode'>

const props = defineProps<{ property: AgencyProperty; agencies: RealEstateAgency[] }>()
const emit = defineEmits<{
  change: [payload: { id: number; agencyId: number | null; mode: PropertyAgencyMatchMode }]
  manageAgencies: []
}>()
const agencyDraft = shallowRef<number | null>(props.property.agencyId)
const agencyPopover = useTemplateRef<InstanceType<typeof Popover>>('agencyPopover')
const agencyButtonLabel = computed(() => props.property.agencyName
  ? `Editar imobiliária ${props.property.agencyName}`
  : 'Adicionar imobiliária manualmente')

function toggleEditor(event: Event) {
  agencyDraft.value = props.property.agencyId
  agencyPopover.value?.toggle(event)
}

function saveAgency() {
  emit('change', { id: props.property.id, agencyId: agencyDraft.value, mode: 'manual' })
  agencyPopover.value?.hide()
}

function useAutomaticAgency() {
  emit('change', { id: props.property.id, agencyId: null, mode: 'automatic' })
  agencyPopover.value?.hide()
}

function manageAgencies() {
  agencyPopover.value?.hide()
  emit('manageAgencies')
}
</script>

<style scoped>
.agency-badge-wrapper { max-width: 100%; }
.agency-label {
  max-width: min(16rem, calc(100vw - 10rem));
  border: 1px solid rgba(255, 255, 255, .62) !important;
  border-radius: .55rem !important;
  color: var(--forest) !important;
  background: rgba(255, 252, 244, .92) !important;
  box-shadow: 0 5px 16px rgba(24, 34, 28, .12);
  backdrop-filter: blur(8px);
}
.agency-label :deep(.p-button-label) { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.agency-editor { width: min(22rem, calc(100vw - 3rem)); }
.tracking-wide { letter-spacing: .08em; }
</style>
