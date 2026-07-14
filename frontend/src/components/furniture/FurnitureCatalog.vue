<template>
  <section class="max-w-7xl mx-auto">
    <div class="flex flex-column lg:flex-row lg:align-items-end justify-content-between gap-4 mb-5 md:mb-6">
      <div>
        <span class="inline-block text-sm uppercase font-bold text-terracotta mb-2 eyebrow">Do essencial ao detalhe</span>
        <h1 class="display-font text-5xl md:text-7xl line-height-1 m-0">A casa,<br /><em>peça por peça.</em></h1>
      </div>
      <div class="flex flex-wrap gap-2">
        <Button label="Nova categoria" icon="pi pi-folder-plus" severity="secondary" outlined @click="categoryDialog = true" />
        <Button label="Adicionar item" icon="pi pi-plus" @click="itemDialog = true" />
      </div>
    </div>

    <div class="surface-card border-1 border-round-3xl p-3 md:p-4 catalog-panel">
      <FurnitureFilters
        :categories="store.categories"
        :category-id="store.categoryId"
        :sort="store.sort"
        @change="store.setFilters($event.categoryId, $event.sort)"
      />

      <Message v-if="store.error" severity="error" class="mb-4">{{ store.error }}</Message>

      <div v-if="store.loading" class="grid">
        <div v-for="index in 8" :key="index" class="col-12 sm:col-6 lg:col-4 xl:col-3"><Skeleton height="25rem" border-radius="1rem" /></div>
      </div>
      <div v-else-if="store.items.length" class="grid">
        <div v-for="item in store.items" :key="item.id" class="col-12 sm:col-6 lg:col-4 xl:col-3">
          <FurnitureCard :item="item" @delete="removeItem" />
        </div>
      </div>
      <div v-else class="text-center py-7">
        <i class="pi pi-inbox text-5xl opacity-20" />
        <h2 class="display-font text-2xl mb-2">Nenhum item por aqui</h2>
        <p class="opacity-60">Troque o filtro ou adicione o primeiro link desta categoria.</p>
      </div>
    </div>

    <CategoryForm v-model="categoryDialog" :saving="store.saving" @submit="createCategory" />
    <FurnitureItemForm v-model="itemDialog" :categories="store.categories" :saving="store.saving" @submit="createItem" />
  </section>
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import Message from 'primevue/message'
import Skeleton from 'primevue/skeleton'
import CategoryForm from './CategoryForm.vue'
import FurnitureCard from './FurnitureCard.vue'
import FurnitureFilters from './FurnitureFilters.vue'
import FurnitureItemForm from './FurnitureItemForm.vue'
import { useFurnitureStore } from '@/stores/furniture'

const store = useFurnitureStore()
const toast = useToast()
const categoryDialog = shallowRef(false)
const itemDialog = shallowRef(false)

onMounted(store.initialize)

async function createCategory(payload: { name: string; color: string }) {
  try {
    await store.addCategory(payload.name, payload.color)
    categoryDialog.value = false
    toast.add({ severity: 'success', summary: 'Categoria criada', detail: payload.name, life: 2800 })
  } catch {
    toast.add({ severity: 'error', summary: 'Não foi possível criar', detail: store.error, life: 4000 })
  }
}

async function createItem(payload: { categoryId: number; url: string; title?: string; price?: number }) {
  try {
    await store.addItem(payload)
    itemDialog.value = false
    toast.add({ severity: 'success', summary: 'Item adicionado', detail: 'O card já está na lista.', life: 2800 })
  } catch {
    toast.add({ severity: 'error', summary: 'Não foi possível adicionar', detail: store.error, life: 4500 })
  }
}

async function removeItem(id: number) {
  try {
    await store.removeItem(id)
    toast.add({ severity: 'secondary', summary: 'Item removido', life: 2200 })
  } catch {
    toast.add({ severity: 'error', summary: 'Não foi possível remover', detail: store.error, life: 4000 })
  }
}
</script>

<style scoped>
.eyebrow { letter-spacing: .14em; }
.catalog-panel { border-color: var(--line) !important; box-shadow: 0 18px 54px rgba(54, 82, 68, .07); }
</style>

