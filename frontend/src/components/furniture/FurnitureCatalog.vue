<template>
  <section class="max-w-7xl mx-auto">
    <header class="catalog-header">
      <div class="hidden md:block">
        <span class="eyebrow">Do essencial ao detalhe</span>
        <h1 class="display-font catalog-title">A casa,<br /><em>peça por peça.</em></h1>
      </div>
      <div class="header-actions">
        <Button label="Importar JSON" icon="pi pi-file-import" severity="secondary" outlined @click="importDialog = true" />
        <Button label="Nova categoria" icon="pi pi-folder-plus" severity="secondary" outlined @click="categoryDialog = true" />
        <Button label="Adicionar item" icon="pi pi-plus" @click="openCreate" />
      </div>
    </header>

    <div class="catalog-panel">
      <FurnitureFilters
        :categories="store.categories"
        :category-id="store.categoryId"
        :sort="store.sort"
        @change="store.setFilters($event.categoryId, $event.sort)"
      />

      <div class="list-toolbar">
        <div class="selection-summary">
          <Checkbox
            :model-value="allVisibleSelected"
            binary
            input-id="select-all-furniture"
            aria-label="Selecionar todos os itens visíveis"
            :disabled="!store.items.length"
            @update:model-value="toggleAll(Boolean($event))"
          />
          <label for="select-all-furniture">
            <strong>{{ selectedIds.length ? `${selectedIds.length} selecionado${selectedIds.length === 1 ? '' : 's'}` : 'Selecionar lista' }}</strong>
            <small>{{ listSummary }}</small>
          </label>
        </div>
        <Button
          v-if="selectedIds.length"
          :label="`Excluir ${selectedIds.length}`"
          icon="pi pi-trash"
          severity="danger"
          size="small"
          outlined
          @click="removeSelected"
        />
      </div>

      <Message v-if="store.error" severity="error" class="mb-4">{{ store.error }}</Message>

      <div v-if="store.loading" class="furniture-list" aria-label="Carregando itens">
        <Skeleton v-for="index in 6" :key="index" height="7.25rem" border-radius="1.25rem" />
      </div>
      <TransitionGroup v-else-if="store.items.length" name="list" tag="div" class="furniture-list">
        <FurnitureListItem
          v-for="item in store.items"
          :key="item.id"
          :item="item"
          :selected="selectedIds.includes(item.id)"
          @select="setSelected"
          @purchase="setPurchased"
          @edit="openEdit"
          @delete="requestRemoveItem"
        />
      </TransitionGroup>
      <div v-else class="empty-state">
        <span class="empty-icon"><i class="pi pi-inbox" /></span>
        <h2 class="display-font">Nenhum item por aqui</h2>
        <p>Troque o filtro, importe um JSON ou adicione o primeiro link desta categoria.</p>
        <Button label="Adicionar primeiro item" icon="pi pi-plus" @click="openCreate" />
      </div>
    </div>

    <CategoryForm v-model="categoryDialog" :saving="store.saving" @submit="createCategory" />
    <FurnitureItemForm
      v-model="itemDialog"
      :categories="store.categories"
      :saving="store.saving"
      :item="editingItem"
      @submit="saveItem"
    />
    <FurnitureImportDialog
      v-model="importDialog"
      :categories="store.categories"
      :saving="store.saving"
      @submit="importItems"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, shallowRef, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Message from 'primevue/message'
import Skeleton from 'primevue/skeleton'
import CategoryForm from './CategoryForm.vue'
import FurnitureFilters from './FurnitureFilters.vue'
import FurnitureImportDialog from './FurnitureImportDialog.vue'
import FurnitureItemForm from './FurnitureItemForm.vue'
import FurnitureListItem from './FurnitureListItem.vue'
import { useFurnitureStore } from '@/stores/furniture'
import type { FurnitureItem, FurnitureItemInput } from '@/types'

const store = useFurnitureStore()
const toast = useToast()
const confirm = useConfirm()
const categoryDialog = shallowRef(false)
const itemDialog = shallowRef(false)
const importDialog = shallowRef(false)
const editingItem = shallowRef<FurnitureItem | null>(null)
const selectedIds = shallowRef<number[]>([])

const allVisibleSelected = computed(() => store.items.length > 0 && store.items.every((item) => selectedIds.value.includes(item.id)))
const purchasedCount = computed(() => store.items.filter((item) => item.isPurchased).length)
const listSummary = computed(() => `${store.items.length} ${store.items.length === 1 ? 'item' : 'itens'} · ${purchasedCount.value} ${purchasedCount.value === 1 ? 'comprado' : 'comprados'}`)

onMounted(store.initialize)
watch(itemDialog, (isOpen) => {
  if (!isOpen) editingItem.value = null
})
watch(() => store.items.map((item) => item.id), (visibleIds) => {
  const visible = new Set(visibleIds)
  selectedIds.value = selectedIds.value.filter((id) => visible.has(id))
})

function openCreate() {
  editingItem.value = null
  itemDialog.value = true
}

function openEdit(item: FurnitureItem) {
  editingItem.value = item
  itemDialog.value = true
}

function setSelected(id: number, selected: boolean) {
  selectedIds.value = selected
    ? [...new Set([...selectedIds.value, id])]
    : selectedIds.value.filter((selectedId) => selectedId !== id)
}

function toggleAll(selected: boolean) {
  selectedIds.value = selected ? store.items.map((item) => item.id) : []
}

async function createCategory(payload: { name: string; color: string }) {
  try {
    await store.addCategory(payload.name, payload.color)
    categoryDialog.value = false
    toast.add({ severity: 'success', summary: 'Categoria criada', detail: payload.name, life: 2800 })
  } catch {
    showError('Não foi possível criar')
  }
}

async function saveItem(payload: FurnitureItemInput) {
  try {
    const wasEditing = Boolean(editingItem.value)
    if (editingItem.value) await store.updateItem(editingItem.value.id, payload)
    else await store.addItem(payload)
    itemDialog.value = false
    toast.add({
      severity: 'success',
      summary: wasEditing ? 'Item atualizado' : 'Item adicionado',
      detail: wasEditing ? 'As alterações já aparecem na lista.' : 'O item já está na lista.',
      life: 2800,
    })
  } catch {
    showError('Não foi possível salvar')
  }
}

async function importItems(items: FurnitureItemInput[]) {
  try {
    await store.importItems(items)
    importDialog.value = false
    toast.add({
      severity: 'success',
      summary: 'Lista importada',
      detail: `${items.length} ${items.length === 1 ? 'item foi adicionado' : 'itens foram adicionados'}.`,
      life: 3200,
    })
  } catch {
    showError('Não foi possível importar')
  }
}

async function setPurchased(id: number, isPurchased: boolean) {
  try {
    await store.setPurchased(id, isPurchased)
    toast.add({
      severity: isPurchased ? 'success' : 'secondary',
      summary: isPurchased ? 'Marcado como comprado' : 'Item voltou à lista',
      life: 2200,
    })
  } catch {
    showError('Não foi possível atualizar')
  }
}

function requestRemoveItem(id: number) {
  const item = store.items.find((candidate) => candidate.id === id)
  if (!item) return
  confirm.require({
    header: 'Excluir item?',
    message: `“${item.title}” será removido permanentemente da lista da casa.`,
    icon: 'pi pi-trash',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Excluir',
    rejectProps: { severity: 'secondary', outlined: true },
    acceptProps: { severity: 'danger', icon: 'pi pi-trash' },
    defaultFocus: 'reject',
    blockScroll: true,
    accept: () => removeItem(id),
  })
}

async function removeItem(id: number) {
  try {
    await store.removeItem(id)
    selectedIds.value = selectedIds.value.filter((selectedId) => selectedId !== id)
    toast.add({ severity: 'secondary', summary: 'Item removido', life: 2200 })
  } catch {
    showError('Não foi possível remover')
  }
}

async function removeSelected() {
  const count = selectedIds.value.length
  if (!count) return
  confirm.require({
    header: count === 1 ? 'Excluir item selecionado?' : `Excluir ${count} itens selecionados?`,
    message: count === 1
      ? 'O item selecionado será removido permanentemente da lista da casa.'
      : 'Todos os itens selecionados serão removidos permanentemente da lista da casa.',
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: 'Cancelar',
    acceptLabel: count === 1 ? 'Excluir item' : `Excluir ${count} itens`,
    rejectProps: { severity: 'secondary', outlined: true },
    acceptProps: { severity: 'danger', icon: 'pi pi-trash' },
    defaultFocus: 'reject',
    blockScroll: true,
    accept: removeSelectedItems,
  })
}

async function removeSelectedItems() {
  const count = selectedIds.value.length
  if (!count) return
  try {
    await store.removeItems(selectedIds.value)
    selectedIds.value = []
    toast.add({ severity: 'secondary', summary: 'Itens removidos', detail: `${count} ${count === 1 ? 'item excluído' : 'itens excluídos'}.`, life: 2600 })
  } catch {
    showError('Não foi possível excluir a seleção')
  }
}

function showError(summary: string) {
  toast.add({ severity: 'error', summary, detail: store.error, life: 4500 })
}
</script>

<style scoped>
.catalog-header { display: flex; align-items: end; justify-content: space-between; gap: 2rem; margin-bottom: 2.5rem; }
.eyebrow { display: inline-block; margin-bottom: .5rem; color: var(--terracotta); font-size: .8rem; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }
.catalog-title { margin: 0; font-size: clamp(3rem, 6vw, 5rem); line-height: .95; }
.header-actions { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: .5rem; }
.catalog-panel { padding: 1rem; border: 1px solid var(--line); border-radius: 1.75rem; background: rgba(255, 250, 240, .66); box-shadow: 0 18px 54px rgba(54, 82, 68, .07); }
.list-toolbar { display: flex; align-items: center; justify-content: space-between; min-height: 3.25rem; margin: -.1rem 0 1rem; padding: .5rem .7rem .5rem 1rem; border: 1px solid var(--line); border-radius: 1rem; background: rgba(54, 82, 68, .045); }
.selection-summary { display: flex; align-items: center; gap: .75rem; }
.selection-summary label { display: flex; flex-direction: column; gap: .12rem; cursor: pointer; }
.selection-summary strong { font-size: .82rem; }
.selection-summary small { color: rgba(38, 48, 41, .55); font-size: .7rem; }
.furniture-list { display: flex; flex-direction: column; gap: .65rem; }
.empty-state { display: flex; flex-direction: column; align-items: center; padding: 4rem 1rem; text-align: center; }
.empty-icon { display: grid; place-items: center; width: 4rem; height: 4rem; border-radius: 50%; color: var(--forest); background: rgba(54, 82, 68, .08); }
.empty-icon i { font-size: 1.75rem; opacity: .45; }
.empty-state h2 { margin: 1rem 0 .35rem; font-size: 1.75rem; }
.empty-state p { max-width: 28rem; margin: 0 0 1.25rem; opacity: .6; }
.list-enter-active, .list-leave-active { transition: opacity .2s ease, transform .2s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateY(6px); }

@media (max-width: 767px) {
  .catalog-header { margin-bottom: 1rem; }
  .header-actions { width: 100%; justify-content: stretch; }
  .header-actions :deep(.p-button) { flex: 1 1 auto; }
  .catalog-panel { padding: .7rem; border-radius: 1.25rem; }
}

@media (prefers-reduced-motion: reduce) {
  .list-enter-active, .list-leave-active { transition: none; }
}
</style>
