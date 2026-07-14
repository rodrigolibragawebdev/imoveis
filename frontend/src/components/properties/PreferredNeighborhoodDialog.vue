<template>
  <Dialog v-model:visible="visible" modal header="Bairros desejados" :style="{ width: 'min(34rem, 94vw)' }">
    <p class="mt-0 opacity-65 line-height-3">Imóveis nesses bairros recebem prioridade dentro da mesma faixa de voto.</p>

    <form class="flex gap-2 mb-4" @submit.prevent="submit">
      <InputText v-model="name" class="flex-1" placeholder="Ex.: Jardim Itu Sabará" maxlength="60" autofocus />
      <Button type="submit" label="Adicionar" icon="pi pi-plus" :loading="saving" :disabled="name.trim().length < 2" />
    </form>

    <div v-if="neighborhoods.length" class="flex flex-column gap-2">
      <div v-for="neighborhood in neighborhoods" :key="neighborhood.id" class="flex align-items-center justify-content-between gap-3 px-3 py-2 border-round-2xl neighborhood-item">
        <span class="font-bold"><i class="pi pi-map-marker text-terracotta mr-2" />{{ neighborhood.name }}</span>
        <Button icon="pi pi-trash" severity="secondary" text rounded :aria-label="`Remover ${neighborhood.name}`" :disabled="saving" @click="emit('delete', neighborhood.id)" />
      </div>
    </div>
    <div v-else class="text-center py-5 opacity-60">
      <i class="pi pi-map text-3xl" />
      <p class="mb-0">Nenhum bairro desejado cadastrado.</p>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import type { PreferredNeighborhood } from '@/types'

defineProps<{ neighborhoods: PreferredNeighborhood[]; saving: boolean }>()
const emit = defineEmits<{ add: [name: string]; delete: [id: number] }>()
const visible = defineModel<boolean>({ required: true })
const name = shallowRef('')

function submit() {
  const cleanName = name.value.trim()
  if (cleanName.length < 2) return
  emit('add', cleanName)
  name.value = ''
}
</script>

<style scoped>
.neighborhood-item { background: rgba(54, 82, 68, .07); border: 1px solid rgba(54, 82, 68, .12); }
</style>
