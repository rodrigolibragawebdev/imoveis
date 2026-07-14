<template>
  <article class="surface-card border-1 border-round-2xl overflow-hidden flex flex-column h-full item-card">
    <div class="relative item-media">
      <img
        v-if="item.imageUrl && !imageFailed"
        :src="item.imageUrl"
        :alt="item.title"
        class="w-full h-full object-cover"
        loading="lazy"
        referrerpolicy="no-referrer"
        @error="imageFailed = true"
      />
      <div v-else class="w-full h-full flex align-items-center justify-content-center fallback">
        <i :class="categoryIcon" class="text-4xl opacity-30" />
      </div>
      <span class="absolute top-0 left-0 m-3 text-xs font-bold px-3 py-2 border-round-3xl category-pill" :style="{ backgroundColor: item.categoryColor }">
        {{ item.categoryName }}
      </span>
      <Button icon="pi pi-times" rounded text severity="secondary" class="absolute top-0 right-0 m-2 remove-button" aria-label="Remover item" @click="requestDelete" />
    </div>

    <div class="p-4 flex flex-column flex-1">
      <small class="uppercase font-bold opacity-40 mb-2 source">{{ item.source }}</small>
      <h2 class="display-font text-xl line-height-2 m-0 mb-3">{{ item.title }}</h2>
      <div class="flex align-items-end justify-content-between gap-3 mt-auto">
        <strong class="text-xl text-terracotta">{{ priceLabel }}</strong>
        <a :href="item.url" target="_blank" rel="noopener noreferrer" class="flex align-items-center justify-content-center border-circle text-forest open-link" aria-label="Abrir produto">
          <i class="pi pi-arrow-up-right" />
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import Button from 'primevue/button'
import type { FurnitureItem } from '@/types'

const props = defineProps<{ item: FurnitureItem }>()
const emit = defineEmits<{ delete: [id: number] }>()
const imageFailed = shallowRef(false)

const categoryIcon = computed(() => {
  const name = props.item.categoryName.toLocaleLowerCase('pt-BR')
  if (name.includes('cozinha')) return 'pi pi-shop'
  if (name.includes('escrit')) return 'pi pi-desktop'
  if (name.includes('quarto')) return 'pi pi-moon'
  return 'pi pi-home'
})

const priceLabel = computed(() =>
  props.item.price === null
    ? 'A pesquisar'
    : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(props.item.price),
)

function requestDelete() {
  if (window.confirm(`Remover “${props.item.title}” da lista?`)) emit('delete', props.item.id)
}
</script>

<style scoped>
.item-card { border-color: var(--line) !important; box-shadow: 0 10px 28px rgba(54, 82, 68, .06); transition: transform .22s ease; }
.item-card:hover { transform: translateY(-3px); }
.item-media { height: 11rem; background: #dce2d6; }
.fallback { color: var(--forest); background: linear-gradient(145deg, #e6e0d1, #d9e1d7); }
.category-pill { color: white; box-shadow: 0 4px 12px rgba(38, 48, 41, .14); }
.remove-button { color: var(--cream) !important; background: rgba(38, 48, 41, .55) !important; }
.source { letter-spacing: .1em; }
.open-link { width: 2.6rem; height: 2.6rem; text-decoration: none; background: rgba(54, 82, 68, .1); }
</style>

