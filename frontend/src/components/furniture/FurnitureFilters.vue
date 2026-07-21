<template>
  <div class="filters-bar">
    <div class="category-filters" aria-label="Filtrar por categoria">
      <Button
        label="Tudo"
        size="small"
        rounded
        :outlined="categoryId !== undefined"
        :severity="categoryId === undefined ? 'primary' : 'secondary'"
        @click="selectCategory(undefined)"
      />
      <Button
        v-for="category in categories"
        :key="category.id"
        :label="category.name"
        size="small"
        rounded
        :outlined="categoryId !== category.id"
        :severity="categoryId === category.id ? 'primary' : 'secondary'"
        @click="selectCategory(category.id)"
      />
    </div>

    <div class="filter-tools">
      <div class="search-field">
        <i class="pi pi-search" aria-hidden="true" />
        <InputText
          v-model="searchQuery"
          type="search"
          placeholder="Buscar item ou variação"
          aria-label="Buscar por texto na lista"
          autocomplete="off"
        />
        <Button
          v-if="searchQuery"
          icon="pi pi-times"
          severity="secondary"
          text
          rounded
          size="small"
          class="clear-search"
          aria-label="Limpar busca"
          @click="searchQuery = ''"
        />
      </div>
      <Select
        v-model="sortModel"
        :options="sortOptions"
        option-label="label"
        option-value="value"
        class="sort-select"
        aria-label="Ordenação"
        @change="emitChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import type { FurnitureCategory } from '@/types'
import type { FurnitureSort } from '@/stores/furniture'

const props = defineProps<{
  categories: FurnitureCategory[]
  categoryId: number | undefined
  sort: FurnitureSort
}>()
const emit = defineEmits<{ change: [payload: { categoryId: number | undefined; sort: FurnitureSort }] }>()
const searchQuery = defineModel<string>('searchQuery', { required: true })

const sortModel = shallowRef<FurnitureSort>(props.sort)
const sortOptions = [
  { label: 'Menor preço', value: 'price-asc' },
  { label: 'Maior preço', value: 'price-desc' },
  { label: 'Mais recentes', value: 'newest' },
]

watch(() => props.sort, (value) => { sortModel.value = value })

function selectCategory(categoryId: number | undefined) {
  emit('change', { categoryId, sort: sortModel.value })
}

function emitChange() {
  emit('change', { categoryId: props.categoryId, sort: sortModel.value })
}
</script>

<style scoped>
.filters-bar { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: .8rem 1rem; margin-bottom: 1rem; }
.category-filters { display: flex; align-items: center; flex-wrap: wrap; gap: .5rem; }
.filter-tools { display: flex; align-items: center; justify-content: flex-end; gap: .65rem; margin-left: auto; }
.search-field { position: relative; display: flex; align-items: center; min-width: 17rem; }
.search-field > .pi-search { position: absolute; z-index: 1; left: .85rem; color: rgba(38, 48, 41, .42); pointer-events: none; }
.search-field :deep(.p-inputtext) { width: 100%; padding-left: 2.35rem; padding-right: 2.45rem; background: rgba(255, 255, 255, .66); }
.clear-search { position: absolute; right: .15rem; width: 2.1rem; height: 2.1rem; }
.sort-select { width: 14rem; }

@media (max-width: 800px) {
  .filter-tools { width: 100%; margin-left: 0; }
  .search-field { flex: 1; }
}

@media (max-width: 560px) {
  .filter-tools { align-items: stretch; flex-direction: column; }
  .search-field, .sort-select { width: 100%; }
}
</style>
