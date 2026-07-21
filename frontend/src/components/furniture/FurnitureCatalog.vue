<template>
  <section class="max-w-7xl mx-auto">
    <header class="catalog-header">
      <div class="hidden md:block">
        <span class="eyebrow">Do essencial ao detalhe</span>
        <h1 class="display-font catalog-title">A casa,<br /><em>peça por peça.</em></h1>
      </div>
      <div class="header-actions">
        <Button label="Lixeira" icon="pi pi-history" severity="secondary" text @click="trashDialog = true" />
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
        v-model:search-query="searchQuery"
        @change="store.setFilters($event.categoryId, $event.sort)"
      />

      <div class="list-toolbar">
        <div class="selection-summary">
          <Checkbox
            :model-value="allVisibleSelected"
            binary
            input-id="select-all-furniture"
            aria-label="Selecionar todos os itens visíveis"
            :disabled="!visibleItems.length"
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
      <TransitionGroup v-else-if="visibleItems.length" name="list" tag="div" class="furniture-list">
        <FurnitureListItem
          v-for="item in visibleItems"
          :key="item.id"
          :item="item"
          :selected="selectedIds.includes(item.id)"
          @select="setSelected"
          @purchase="setPurchased"
          @edit="openEdit"
          @delete="requestRemoveItem"
          @add-variation="openCreateVariation"
          @edit-variation="openEditVariation"
          @delete-variation="requestRemoveVariation"
        />
      </TransitionGroup>
      <div v-else class="empty-state">
        <span class="empty-icon"><i class="pi pi-inbox" /></span>
        <h2 class="display-font">{{ emptyStateTitle }}</h2>
        <p>{{ emptyStateDescription }}</p>
        <Button v-if="hasSearch" label="Limpar busca" icon="pi pi-times" severity="secondary" outlined @click="searchQuery = ''" />
        <Button v-else label="Adicionar primeiro item" icon="pi pi-plus" @click="openCreate" />
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
      :progress="store.importProgress"
      @submit="importItems"
    />
    <FurnitureVariationForm
      v-model="variationDialog"
      :item="variationParent"
      :variation="editingVariation"
      :saving="store.saving"
      @submit="saveVariation"
    />
    <FurnitureTrashDialog
      v-model="trashDialog"
      :items="store.trashItems"
      :loading="store.trashLoading"
      :saving="store.saving"
      @restore="restoreItem"
      @restore-all="restoreAllItems"
      @permanent-delete="requestPermanentDelete"
      @permanent-delete-all="requestEmptyTrash"
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
import FurnitureTrashDialog from './FurnitureTrashDialog.vue'
import FurnitureVariationForm from './FurnitureVariationForm.vue'
import { useFurnitureStore } from '@/stores/furniture'
import type { FurnitureItem, FurnitureItemInput, FurnitureVariation, FurnitureVariationInput } from '@/types'

const store = useFurnitureStore()
const toast = useToast()
const confirm = useConfirm()
const categoryDialog = shallowRef(false)
const itemDialog = shallowRef(false)
const importDialog = shallowRef(false)
const trashDialog = shallowRef(false)
const variationDialog = shallowRef(false)
const editingItem = shallowRef<FurnitureItem | null>(null)
const variationParent = shallowRef<FurnitureItem | null>(null)
const editingVariation = shallowRef<FurnitureVariation | null>(null)
const selectedIds = shallowRef<number[]>([])
const searchQuery = shallowRef('')
const debouncedSearchQuery = shallowRef('')

const normalizedSearchQuery = computed(() => foldSearchText(debouncedSearchQuery.value))
const hasSearch = computed(() => normalizedSearchQuery.value !== '')
const visibleItems = computed(() => {
  if (!normalizedSearchQuery.value) return store.items
  return store.items.filter((item) => furnitureSearchText(item).includes(normalizedSearchQuery.value))
})
const allVisibleSelected = computed(() => visibleItems.value.length > 0 && visibleItems.value.every((item) => selectedIds.value.includes(item.id)))
const purchasedCount = computed(() => visibleItems.value.filter((item) => item.isPurchased).length)
const listSummary = computed(() => {
  const visibleCount = visibleItems.value.length
  const countLabel = hasSearch.value
    ? `${visibleCount} de ${store.items.length} ${store.items.length === 1 ? 'item' : 'itens'}`
    : `${visibleCount} ${visibleCount === 1 ? 'item' : 'itens'}`
  return `${countLabel} · ${purchasedCount.value} ${purchasedCount.value === 1 ? 'comprado' : 'comprados'}`
})
const emptyStateTitle = computed(() => hasSearch.value ? 'Nenhum resultado' : 'Nenhum item por aqui')
const emptyStateDescription = computed(() => hasSearch.value
  ? `Não encontramos item ou variação para “${debouncedSearchQuery.value.trim()}”.`
  : 'Troque o filtro, importe um JSON ou adicione o primeiro link desta categoria.')

onMounted(store.initialize)
watch(searchQuery, (value, _previousValue, onCleanup) => {
  if (value === '') {
    debouncedSearchQuery.value = ''
    return
  }
  const timeoutId = globalThis.setTimeout(() => {
    debouncedSearchQuery.value = value
  }, 300)
  onCleanup(() => globalThis.clearTimeout(timeoutId))
})
watch(itemDialog, (isOpen) => {
  if (!isOpen) editingItem.value = null
})
watch(variationDialog, (isOpen) => {
  if (isOpen) return
  variationParent.value = null
  editingVariation.value = null
})
watch(importDialog, (isOpen) => {
  if (!isOpen) store.clearImportProgress()
})
watch(trashDialog, async (isOpen) => {
  if (!isOpen) return
  try {
    await store.loadTrash()
  } catch {
    showError('Não foi possível abrir a lixeira')
  }
})
watch(() => visibleItems.value.map((item) => item.id), (visibleIds) => {
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

function openCreateVariation(item: FurnitureItem) {
  variationParent.value = item
  editingVariation.value = null
  variationDialog.value = true
}

function openEditVariation(item: FurnitureItem, variation: FurnitureVariation) {
  variationParent.value = item
  editingVariation.value = variation
  variationDialog.value = true
}

function setSelected(id: number, selected: boolean) {
  selectedIds.value = selected
    ? [...new Set([...selectedIds.value, id])]
    : selectedIds.value.filter((selectedId) => selectedId !== id)
}

function toggleAll(selected: boolean) {
  selectedIds.value = selected ? visibleItems.value.map((item) => item.id) : []
}

function foldSearchText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .replace(/\s+/g, ' ')
    .trim()
}

function furnitureSearchText(item: FurnitureItem) {
  return foldSearchText([
    item.title,
    item.source,
    item.url,
    item.categoryName,
    ...item.variations.flatMap((variation) => [variation.title, variation.source, variation.url]),
  ].join(' '))
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
    const result = await store.importItems(items)
    importDialog.value = false
    const importedCount = result.importedItems.length + result.importedInPreviousAttempts
    const ignoredCount = Math.max(0, items.length - importedCount)
    toast.add({
      severity: 'success',
      summary: result.resumed ? 'Importação retomada e concluída' : 'Lista importada',
      detail: `${importedCount} ${importedCount === 1 ? 'item foi adicionado' : 'itens foram adicionados'} em ${result.totalBatches} ${result.totalBatches === 1 ? 'lote' : 'lotes'}.${ignoredCount ? ` ${ignoredCount} ${ignoredCount === 1 ? 'nome repetido foi ignorado' : 'nomes repetidos foram ignorados'}.` : ''}`,
      life: 3200,
    })
  } catch {
    showError('Não foi possível importar')
  }
}

async function saveVariation(payload: FurnitureVariationInput) {
  if (!variationParent.value) return
  try {
    const wasEditing = Boolean(editingVariation.value)
    if (editingVariation.value) {
      await store.updateVariation(variationParent.value.id, editingVariation.value.id, payload)
    } else {
      await store.addVariation(variationParent.value.id, payload)
    }
    variationDialog.value = false
    toast.add({
      severity: 'success',
      summary: wasEditing ? 'Variação atualizada' : 'Variação adicionada',
      detail: wasEditing ? 'A opção foi atualizada dentro do item.' : 'A nova opção já aparece abaixo do item principal.',
      life: 3000,
    })
  } catch {
    showError('Não foi possível salvar a variação')
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
    header: 'Mover item para a lixeira?',
    message: `“${item.title}” ficará inativo e poderá ser restaurado depois.`,
    icon: 'pi pi-trash',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Mover para a lixeira',
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
    toast.add({ severity: 'secondary', summary: 'Item movido para a lixeira', detail: 'Você pode restaurá-lo pela lixeira da lista.', life: 3000 })
  } catch {
    showError('Não foi possível remover')
  }
}

function requestRemoveVariation(item: FurnitureItem, variation: FurnitureVariation) {
  confirm.require({
    header: 'Excluir variação?',
    message: `“${variation.title}” será removida de “${item.title}”. O item principal será mantido.`,
    icon: 'pi pi-trash',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Excluir variação',
    rejectProps: { severity: 'secondary', outlined: true },
    acceptProps: { severity: 'danger', icon: 'pi pi-trash' },
    defaultFocus: 'reject',
    blockScroll: true,
    accept: () => removeVariation(item.id, variation.id),
  })
}

async function removeVariation(itemId: number, variationId: number) {
  try {
    await store.removeVariation(itemId, variationId)
    toast.add({ severity: 'secondary', summary: 'Variação removida', detail: 'O item principal foi mantido.', life: 2400 })
  } catch {
    showError('Não foi possível remover a variação')
  }
}

async function removeSelected() {
  const count = selectedIds.value.length
  if (!count) return
  confirm.require({
    header: count === 1 ? 'Mover item para a lixeira?' : `Mover ${count} itens para a lixeira?`,
    message: count === 1
      ? 'O item selecionado ficará inativo e poderá ser restaurado depois.'
      : 'Os itens selecionados ficarão inativos e poderão ser restaurados depois.',
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: 'Cancelar',
    acceptLabel: count === 1 ? 'Mover item' : `Mover ${count} itens`,
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
    toast.add({ severity: 'secondary', summary: 'Itens movidos para a lixeira', detail: `${count} ${count === 1 ? 'item pode ser restaurado' : 'itens podem ser restaurados'}.`, life: 3000 })
  } catch {
    showError('Não foi possível mover a seleção')
  }
}

async function restoreItem(id: number) {
  try {
    await store.restoreItem(id)
    toast.add({ severity: 'success', summary: 'Item restaurado', detail: 'Ele voltou para a lista ativa.', life: 2600 })
  } catch {
    showError('Não foi possível restaurar')
  }
}

async function restoreAllItems(ids: number[]) {
  if (!ids.length) return
  try {
    await store.restoreItems(ids)
    toast.add({ severity: 'success', summary: 'Lixeira restaurada', detail: `${ids.length} ${ids.length === 1 ? 'item voltou' : 'itens voltaram'} para a lista ativa.`, life: 3000 })
  } catch {
    showError('Não foi possível restaurar a lixeira')
  }
}

function requestPermanentDelete(id: number) {
  const item = store.trashItems.find((candidate) => candidate.id === id)
  if (!item) return
  confirm.require({
    header: 'Excluir definitivamente?',
    message: `“${item.title}” e suas variações serão apagados do banco. Esta ação não pode ser desfeita.`,
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Excluir definitivamente',
    rejectProps: { severity: 'secondary', outlined: true },
    acceptProps: { severity: 'danger', icon: 'pi pi-trash' },
    defaultFocus: 'reject',
    blockScroll: true,
    accept: () => permanentlyDeleteItem(id),
  })
}

function requestEmptyTrash(ids: number[]) {
  if (!ids.length) return
  confirm.require({
    header: `Esvaziar a lixeira com ${ids.length} ${ids.length === 1 ? 'item' : 'itens'}?`,
    message: 'Todos os itens e suas variações serão apagados do banco. Esta ação não pode ser desfeita.',
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Esvaziar lixeira',
    rejectProps: { severity: 'secondary', outlined: true },
    acceptProps: { severity: 'danger', icon: 'pi pi-trash' },
    defaultFocus: 'reject',
    blockScroll: true,
    accept: () => permanentlyDeleteItems(ids),
  })
}

async function permanentlyDeleteItem(id: number) {
  try {
    await store.permanentlyDeleteItem(id)
    toast.add({ severity: 'secondary', summary: 'Item excluído definitivamente', detail: 'O item e suas variações foram apagados do banco.', life: 3000 })
  } catch {
    showError('Não foi possível excluir definitivamente')
  }
}

async function permanentlyDeleteItems(ids: number[]) {
  try {
    await store.permanentlyDeleteItems(ids)
    toast.add({ severity: 'secondary', summary: 'Lixeira esvaziada', detail: `${ids.length} ${ids.length === 1 ? 'item foi apagado' : 'itens foram apagados'} definitivamente.`, life: 3000 })
  } catch {
    showError('Não foi possível esvaziar a lixeira')
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
