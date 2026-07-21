<template>
  <article class="furniture-row" :class="{ 'is-purchased': item.isPurchased, 'is-selected': selected }">
    <div class="selection-cell">
      <Checkbox
        :model-value="selected"
        binary
        :input-id="`select-furniture-${item.id}`"
        :aria-label="`Selecionar ${item.title}`"
        @update:model-value="emit('select', item.id, Boolean($event))"
      />
    </div>

    <div class="item-media">
      <img
        v-if="item.imageUrl && !imageFailed"
        :src="item.imageUrl"
        :alt="item.title"
        class="item-image"
        loading="lazy"
        referrerpolicy="no-referrer"
        @error="imageFailed = true"
      />
      <div v-else class="item-fallback" aria-hidden="true">
        <i :class="categoryIcon" />
      </div>
    </div>

    <div class="item-description">
      <div class="item-title-line">
        <span v-if="item.isPurchased" class="purchased-mark">
          <i class="pi pi-check" /> Comprado
        </span>
        <span class="category-dot" :style="{ backgroundColor: item.categoryColor }" aria-hidden="true" />
        <span class="category-name">{{ item.categoryName }}</span>
      </div>
      <h2 class="item-title">{{ item.title }}</h2>
      <a :href="item.url" target="_blank" rel="noopener noreferrer" class="item-source">
        {{ sourceLabel }} <i class="pi pi-arrow-up-right" />
      </a>
    </div>

    <div class="item-price">
      <small>Valor estimado</small>
      <strong>{{ priceLabel }}</strong>
    </div>

    <div class="item-metadata" aria-label="Metadados do item">
      <span><i class="pi pi-folder" /> {{ item.categoryName }}</span>
      <span><i class="pi pi-clock" /> {{ updatedLabel }}</span>
    </div>

    <div class="item-actions">
      <Button
        :label="item.isPurchased ? 'Desmarcar' : 'Comprei'"
        :icon="item.isPurchased ? 'pi pi-undo' : 'pi pi-check'"
        size="small"
        :severity="item.isPurchased ? 'secondary' : 'success'"
        :outlined="!item.isPurchased"
        @click="emit('purchase', item.id, !item.isPurchased)"
      />
      <Button icon="pi pi-pencil" size="small" severity="secondary" text aria-label="Editar item" @click="emit('edit', item)" />
      <Button icon="pi pi-trash" size="small" severity="danger" text aria-label="Excluir item" @click="emit('delete', item.id)" />
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import type { FurnitureItem } from '@/types'

const props = defineProps<{ item: FurnitureItem; selected: boolean }>()
const emit = defineEmits<{
  delete: [id: number]
  edit: [item: FurnitureItem]
  purchase: [id: number, isPurchased: boolean]
  select: [id: number, selected: boolean]
}>()

const imageFailed = shallowRef(false)
const categoryIcon = computed(() => {
  const name = props.item.categoryName.toLocaleLowerCase('pt-BR')
  if (name.includes('cozinha')) return 'pi pi-shop'
  if (name.includes('escrit')) return 'pi pi-desktop'
  if (name.includes('quarto')) return 'pi pi-moon'
  return 'pi pi-home'
})
const priceLabel = computed(() => props.item.price === null
  ? 'A pesquisar'
  : new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 2,
    }).format(props.item.price))
const sourceLabel = computed(() => props.item.isSeeded || props.item.source.toLocaleLowerCase('pt-BR') === 'lista inicial'
  ? 'Ver produto'
  : props.item.source)
const updatedLabel = computed(() => new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
}).format(new Date(`${props.item.updatedAt.replace(' ', 'T')}Z`)))

watch(() => props.item.imageUrl, () => { imageFailed.value = false })
</script>

<style scoped>
.furniture-row {
  display: grid;
  grid-template-columns: 2rem 6.5rem minmax(12rem, 1.5fr) minmax(9rem, .55fr) minmax(10rem, .7fr) auto;
  align-items: center;
  gap: 1rem;
  padding: .9rem 1rem;
  border: 1px solid var(--line);
  border-radius: 1.25rem;
  background: rgba(255, 250, 240, .82);
  transition: border-color .2s ease, box-shadow .2s ease, transform .2s ease, opacity .2s ease;
}

.furniture-row:hover {
  border-color: rgba(54, 82, 68, .32);
  box-shadow: 0 12px 28px rgba(54, 82, 68, .08);
  transform: translateY(-1px);
}

.furniture-row.is-selected {
  border-color: var(--terracotta);
  box-shadow: 0 0 0 3px rgba(182, 92, 58, .08);
}

.furniture-row.is-purchased { background: rgba(228, 234, 222, .7); }
.furniture-row.is-purchased .item-image { filter: saturate(.45); opacity: .78; }
.furniture-row.is-purchased .item-title { text-decoration: line-through; text-decoration-thickness: 1px; opacity: .62; }
.selection-cell { display: flex; justify-content: center; }
.item-media { width: 6.5rem; height: 5.25rem; border-radius: .9rem; overflow: hidden; background: #dce2d6; }
.item-image { width: 100%; height: 100%; object-fit: cover; transition: filter .2s ease, opacity .2s ease; }
.item-fallback { width: 100%; height: 100%; display: grid; place-items: center; color: var(--forest); background: linear-gradient(145deg, #e9e1cf, #d6e0d8); }
.item-fallback i { font-size: 1.6rem; opacity: .42; }
.item-title-line { display: flex; align-items: center; gap: .4rem; min-height: 1.3rem; margin-bottom: .25rem; }
.category-dot { width: .55rem; height: .55rem; border-radius: 50%; flex: 0 0 auto; }
.category-name, .item-source, .item-metadata { font-size: .72rem; font-weight: 700; letter-spacing: .045em; text-transform: uppercase; }
.category-name { color: rgba(38, 48, 41, .55); }
.purchased-mark { display: inline-flex; align-items: center; gap: .25rem; padding: .2rem .45rem; border-radius: 999px; color: var(--forest); background: rgba(54, 82, 68, .1); font-size: .65rem; font-weight: 800; text-transform: uppercase; }
.item-title { margin: 0 0 .35rem; font-family: 'Fraunces Variable', serif; font-size: 1.08rem; line-height: 1.25; transition: opacity .2s ease; }
.item-source { color: var(--terracotta); text-decoration: none; }
.item-source:hover { text-decoration: underline; }
.item-source i { font-size: .65rem; }
.item-price { display: flex; flex-direction: column; gap: .2rem; }
.item-price small { color: rgba(38, 48, 41, .5); font-size: .72rem; }
.item-price strong { color: var(--terracotta); font-size: 1.08rem; white-space: nowrap; }
.item-metadata { display: flex; flex-direction: column; gap: .45rem; color: rgba(38, 48, 41, .48); }
.item-metadata span { display: flex; align-items: center; gap: .4rem; }
.item-metadata i { font-size: .75rem; }
.item-actions { display: flex; align-items: center; gap: .1rem; }

@media (max-width: 1000px) {
  .furniture-row { grid-template-columns: 2rem 5.5rem minmax(10rem, 1fr) auto; }
  .item-media { width: 5.5rem; height: 4.75rem; }
  .item-price { grid-column: 3; }
  .item-metadata { display: none; }
  .item-actions { grid-column: 4; grid-row: 1 / span 2; }
}

@media (max-width: 640px) {
  .furniture-row { grid-template-columns: 1.5rem 4.6rem 1fr; gap: .7rem; padding: .8rem; }
  .selection-cell { align-self: start; padding-top: .15rem; }
  .item-media { width: 4.6rem; height: 4.6rem; align-self: start; }
  .item-price { grid-column: 3; }
  .item-price strong { font-size: 1rem; }
  .item-actions { grid-column: 2 / 4; grid-row: auto; justify-content: flex-end; padding-top: .25rem; border-top: 1px solid var(--line); }
}

@media (prefers-reduced-motion: reduce) {
  .furniture-row { transition: none; }
}
</style>
