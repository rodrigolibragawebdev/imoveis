<template>
  <div class="item-group" :class="{ 'has-variations': item.variations.length }">
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
        <div v-else class="item-fallback" aria-hidden="true"><i :class="categoryIcon" /></div>
      </div>

      <div class="item-description">
        <div class="item-title-line">
          <span v-if="item.isPurchased" class="purchased-mark"><i class="pi pi-check" /> Comprado</span>
          <span v-if="item.variations.length" class="primary-mark">Item principal</span>
          <span class="category-dot" :style="{ backgroundColor: item.categoryColor }" aria-hidden="true" />
          <span class="category-name">{{ item.categoryName }}</span>
        </div>
        <h2 class="item-title">{{ item.title }}</h2>
        <div class="item-subline">
          <a :href="item.url" target="_blank" rel="noopener noreferrer" class="item-source">
            {{ sourceLabel }} <i class="pi pi-arrow-up-right" />
          </a>
          <span v-if="item.variations.length" class="option-count">
            {{ totalOptionsLabel }}
          </span>
        </div>
      </div>

      <div class="item-price">
        <small>Valor estimado</small>
        <strong>{{ moneyLabel(item.price) }}</strong>
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

    <div class="variation-toolbar">
      <span class="toolbar-connector" aria-hidden="true" />
      <Button label="Variações" icon="pi pi-plus" size="small" severity="secondary" text @click="emit('addVariation', item)" />
      <small v-if="!item.variations.length">Adicione links alternativos para este mesmo item</small>
      <small v-else>{{ item.variations.length }} {{ item.variations.length === 1 ? 'variação adicionada' : 'variações adicionadas' }}</small>
    </div>

    <TransitionGroup v-if="item.variations.length" name="variation" tag="div" class="variation-list" :aria-label="`Variações de ${item.title}`">
      <article v-for="(variation, index) in item.variations" :key="variation.id" class="variation-row">
        <span class="variation-connector" aria-hidden="true" />
        <div class="variation-media">
          <img
            v-if="variation.imageUrl && !failedVariationIds.includes(variation.id)"
            :src="variation.imageUrl"
            :alt="variation.title"
            loading="lazy"
            referrerpolicy="no-referrer"
            @error="markVariationImageFailed(variation.id)"
          />
          <span v-else aria-hidden="true"><i class="pi pi-image" /></span>
        </div>
        <div class="variation-description">
          <span class="variation-label"><i class="pi pi-sitemap" /> Variação {{ index + 1 }}</span>
          <strong>{{ variation.title }}</strong>
          <a :href="variation.url" target="_blank" rel="noopener noreferrer">
            {{ variation.source }} <i class="pi pi-arrow-up-right" />
          </a>
        </div>
        <div class="variation-price">
          <small>Preço desta opção</small>
          <strong>{{ moneyLabel(variation.price) }}</strong>
        </div>
        <div class="variation-actions">
          <Button icon="pi pi-pencil" size="small" severity="secondary" text :aria-label="`Editar variação ${index + 1}`" @click="emit('editVariation', item, variation)" />
          <Button icon="pi pi-trash" size="small" severity="danger" text :aria-label="`Excluir variação ${index + 1}`" @click="emit('deleteVariation', item, variation)" />
        </div>
      </article>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import type { FurnitureItem, FurnitureVariation } from '@/types'

const props = defineProps<{ item: FurnitureItem; selected: boolean }>()
const emit = defineEmits<{
  addVariation: [item: FurnitureItem]
  delete: [id: number]
  deleteVariation: [item: FurnitureItem, variation: FurnitureVariation]
  edit: [item: FurnitureItem]
  editVariation: [item: FurnitureItem, variation: FurnitureVariation]
  purchase: [id: number, isPurchased: boolean]
  select: [id: number, selected: boolean]
}>()

const imageFailed = shallowRef(false)
const failedVariationIds = shallowRef<number[]>([])
const categoryIcon = computed(() => {
  const name = props.item.categoryName.toLocaleLowerCase('pt-BR')
  if (name.includes('cozinha')) return 'pi pi-shop'
  if (name.includes('escrit')) return 'pi pi-desktop'
  if (name.includes('quarto')) return 'pi pi-moon'
  return 'pi pi-home'
})
const sourceLabel = computed(() => props.item.isSeeded || props.item.source.toLocaleLowerCase('pt-BR') === 'lista inicial'
  ? 'Ver produto'
  : props.item.source)
const updatedLabel = computed(() => new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
}).format(new Date(`${props.item.updatedAt.replace(' ', 'T')}Z`)))
const totalOptionsLabel = computed(() => `${props.item.variations.length + 1} opções`)

watch(() => props.item.imageUrl, () => { imageFailed.value = false })
watch(() => props.item.variations.map((variation) => variation.imageUrl), () => { failedVariationIds.value = [] })

function moneyLabel(price: number | null) {
  return price === null
    ? 'A pesquisar'
    : new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 2,
      }).format(price)
}

function markVariationImageFailed(id: number) {
  failedVariationIds.value = [...new Set([...failedVariationIds.value, id])]
}
</script>

<style scoped>
.item-group { position: relative; margin-bottom: .25rem; }
.item-group.has-variations { margin-bottom: 1rem; }
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
.item-group.has-variations .furniture-row { border-bottom-left-radius: .8rem; }
.furniture-row:hover { border-color: rgba(54, 82, 68, .32); box-shadow: 0 12px 28px rgba(54, 82, 68, .08); transform: translateY(-1px); }
.furniture-row.is-selected { border-color: var(--terracotta); box-shadow: 0 0 0 3px rgba(182, 92, 58, .08); }
.furniture-row.is-purchased { background: rgba(228, 234, 222, .7); }
.furniture-row.is-purchased .item-image { filter: saturate(.45); opacity: .78; }
.furniture-row.is-purchased .item-title { text-decoration: line-through; text-decoration-thickness: 1px; opacity: .62; }
.selection-cell { display: flex; justify-content: center; }
.item-media { width: 6.5rem; height: 5.25rem; border-radius: .9rem; overflow: hidden; background: #dce2d6; }
.item-image { width: 100%; height: 100%; object-fit: cover; transition: filter .2s ease, opacity .2s ease; }
.item-fallback { width: 100%; height: 100%; display: grid; place-items: center; color: var(--forest); background: linear-gradient(145deg, #e9e1cf, #d6e0d8); }
.item-fallback i { font-size: 1.6rem; opacity: .42; }
.item-title-line, .item-subline { display: flex; align-items: center; flex-wrap: wrap; gap: .4rem; }
.item-title-line { min-height: 1.3rem; margin-bottom: .25rem; }
.category-dot { width: .55rem; height: .55rem; border-radius: 50%; flex: 0 0 auto; }
.category-name, .item-source, .item-metadata { font-size: .72rem; font-weight: 700; letter-spacing: .045em; text-transform: uppercase; }
.category-name { color: rgba(38, 48, 41, .55); }
.purchased-mark, .primary-mark, .option-count { display: inline-flex; align-items: center; padding: .2rem .45rem; border-radius: 999px; font-size: .65rem; font-weight: 800; text-transform: uppercase; }
.purchased-mark { gap: .25rem; color: var(--forest); background: rgba(54, 82, 68, .1); }
.primary-mark { color: var(--terracotta); background: rgba(182, 92, 58, .09); }
.option-count { color: rgba(38, 48, 41, .58); background: rgba(54, 82, 68, .07); }
.item-title { margin: 0 0 .35rem; font-family: 'Fraunces Variable', serif; font-size: 1.08rem; line-height: 1.25; transition: opacity .2s ease; }
.item-source { color: var(--terracotta); text-decoration: none; }
.item-source:hover { text-decoration: underline; }
.item-source i { font-size: .65rem; }
.item-price, .variation-price { display: flex; flex-direction: column; gap: .2rem; }
.item-price small, .variation-price small { color: rgba(38, 48, 41, .5); font-size: .72rem; }
.item-price strong, .variation-price strong { color: var(--terracotta); font-size: 1.08rem; white-space: nowrap; }
.item-metadata { display: flex; flex-direction: column; gap: .45rem; color: rgba(38, 48, 41, .48); }
.item-metadata span { display: flex; align-items: center; gap: .4rem; }
.item-metadata i { font-size: .75rem; }
.item-actions, .variation-actions { display: flex; align-items: center; gap: .1rem; }

.variation-toolbar { position: relative; display: flex; align-items: center; gap: .4rem; min-height: 2.35rem; margin: .15rem 0 .1rem 7.8rem; }
.variation-toolbar small { color: rgba(38, 48, 41, .45); font-size: .68rem; }
.toolbar-connector { position: absolute; left: -4.65rem; top: -.16rem; width: 4.8rem; height: 1.35rem; border-bottom: 1px solid rgba(182, 92, 58, .3); border-left: 1px solid rgba(182, 92, 58, .3); border-bottom-left-radius: .8rem; }
.variation-toolbar :deep(.p-button) { color: var(--terracotta); padding-left: .45rem; padding-right: .55rem; }
.variation-list { position: relative; display: flex; flex-direction: column; gap: .6rem; margin: .1rem 0 .35rem 3.15rem; padding-left: 1.45rem; }
.variation-row { position: relative; display: grid; grid-template-columns: 4rem minmax(12rem, 1fr) minmax(9rem, .35fr) auto; align-items: center; gap: .9rem; min-height: 5.15rem; padding: .7rem .85rem; border: 1px dashed rgba(182, 92, 58, .3); border-radius: 1rem; background: rgba(255, 250, 240, .58); }
.variation-row::before { content: ''; position: absolute; left: -1.5rem; top: calc(-.6rem - 1px); width: 1px; height: calc(50% + .6rem + 1px); background: rgba(182, 92, 58, .48); }
.variation-row:first-child::before { top: -.1rem; height: calc(50% + .1rem); background: linear-gradient(var(--terracotta), rgba(182, 92, 58, .48)); }
.variation-connector { position: absolute; left: -1.5rem; top: 50%; width: 1.5rem; height: 2px; background: rgba(182, 92, 58, .4); }
.variation-connector::after { content: ''; position: absolute; right: -.18rem; top: -.2rem; width: .45rem; height: .45rem; border-radius: 50%; background: var(--terracotta); }
.variation-media { width: 4rem; height: 3.75rem; overflow: hidden; border-radius: .75rem; background: rgba(54, 82, 68, .08); }
.variation-media img { width: 100%; height: 100%; object-fit: cover; }
.variation-media span { display: grid; place-items: center; width: 100%; height: 100%; color: rgba(54, 82, 68, .35); }
.variation-description { display: flex; flex-direction: column; align-items: flex-start; gap: .18rem; min-width: 0; }
.variation-label { color: var(--terracotta); font-size: .62rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
.variation-description strong { max-width: 100%; overflow: hidden; font-family: 'Fraunces Variable', serif; font-size: .95rem; text-overflow: ellipsis; white-space: nowrap; }
.variation-description a { color: rgba(38, 48, 41, .52); font-size: .68rem; font-weight: 700; text-decoration: none; text-transform: uppercase; }
.variation-description a:hover { color: var(--terracotta); text-decoration: underline; }
.variation-price strong { font-size: .95rem; }
.variation-enter-active, .variation-leave-active { transition: opacity .2s ease, transform .2s ease; }
.variation-enter-from, .variation-leave-to { opacity: 0; transform: translateX(-8px); }

@media (max-width: 1100px) {
  .furniture-row { grid-template-columns: 2rem 5.5rem minmax(10rem, 1fr) auto; }
  .item-media { width: 5.5rem; height: 4.75rem; }
  .item-price { grid-column: 3; }
  .item-metadata { display: none; }
  .item-actions { grid-column: 4; grid-row: 1 / span 2; max-width: 14rem; flex-wrap: wrap; justify-content: flex-end; }
}

@media (max-width: 700px) {
  .furniture-row { grid-template-columns: 1.5rem 4.6rem 1fr; gap: .7rem; padding: .8rem; }
  .selection-cell { align-self: start; padding-top: .15rem; }
  .item-media { width: 4.6rem; height: 4.6rem; align-self: start; }
  .item-price { grid-column: 3; }
  .item-price strong { font-size: 1rem; }
  .item-actions { grid-column: 2 / 4; grid-row: auto; max-width: none; justify-content: flex-end; padding-top: .5rem; border-top: 1px solid var(--line); }
  .variation-toolbar { margin-left: 3.7rem; }
  .variation-toolbar small { display: none; }
  .toolbar-connector { left: -2.65rem; width: 2.8rem; }
  .variation-list { margin-left: 1rem; padding-left: 1rem; }
  .variation-row { grid-template-columns: 3.4rem minmax(0, 1fr) auto; gap: .65rem; }
  .variation-media { width: 3.4rem; height: 3.4rem; }
  .variation-price { grid-column: 2; }
  .variation-actions { grid-column: 3; grid-row: 1 / span 2; }
}

@media (prefers-reduced-motion: reduce) {
  .furniture-row, .variation-enter-active, .variation-leave-active { transition: none; }
}
</style>
