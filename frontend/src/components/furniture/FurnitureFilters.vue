<template>
  <div class="flex flex-column md:flex-row md:align-items-center justify-content-between gap-3 mb-4">
    <div class="flex flex-wrap align-items-center gap-2">
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
    <Select
      v-model="sortModel"
      :options="sortOptions"
      option-label="label"
      option-value="value"
      class="w-full md:w-14rem"
      aria-label="Ordenação"
      @change="emitChange"
    />
  </div>
</template>

<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import Button from 'primevue/button'
import Select from 'primevue/select'
import type { FurnitureCategory } from '@/types'
import type { FurnitureSort } from '@/stores/furniture'

const props = defineProps<{
  categories: FurnitureCategory[]
  categoryId: number | undefined
  sort: FurnitureSort
}>()
const emit = defineEmits<{ change: [payload: { categoryId: number | undefined; sort: FurnitureSort }] }>()

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

