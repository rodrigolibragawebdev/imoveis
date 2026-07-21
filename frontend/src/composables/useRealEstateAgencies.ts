import { shallowRef } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { usePropertiesStore } from '@/stores/properties'
import type { Property, PropertyAgencyMatchMode } from '@/types'

export interface PropertyAgencyChange {
  id: number
  agencyId: number | null
  mode: PropertyAgencyMatchMode
}

interface RealEstateAgencyManagementOptions {
  onPropertyAssigned?: (property: Property) => void
  afterAssignmentsChanged?: () => Promise<void> | void
}

export function useRealEstateAgencies(options: RealEstateAgencyManagementOptions = {}) {
  const store = usePropertiesStore()
  const toast = useToast()
  const confirm = useConfirm()
  const agencyDialog = shallowRef(false)

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
      await options.afterAssignmentsChanged?.()
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
      await options.afterAssignmentsChanged?.()
      toast.add({ severity: 'secondary', summary: 'Imobiliária removida', life: 2400 })
    } catch {
      toast.add({ severity: 'error', summary: 'Não foi possível remover', detail: store.error, life: 4000 })
    }
  }

  async function reevaluateAgencies() {
    try {
      const result = await store.reevaluateRealEstateAgencies()
      await options.afterAssignmentsChanged?.()
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

  async function assignAgency(payload: PropertyAgencyChange) {
    try {
      const property = await store.assignPropertyAgency(payload.id, payload.agencyId, payload.mode)
      options.onPropertyAssigned?.(property)
      toast.add({
        severity: 'success',
        summary: payload.mode === 'manual' ? 'Imobiliária definida' : 'Identificação automática restaurada',
        life: 2400,
      })
    } catch {
      toast.add({ severity: 'error', summary: 'Não foi possível alterar', detail: store.error, life: 4000 })
    }
  }

  return {
    store,
    agencyDialog,
    addAgency,
    updateAgency,
    confirmRemoveAgency,
    reevaluateAgencies,
    assignAgency,
  }
}
