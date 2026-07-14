<template>
  <article class="surface-card border-1 border-round-3xl overflow-hidden flex flex-column property-card">
    <div class="relative card-media">
      <a
        :href="property.url"
        target="_blank"
        rel="noopener noreferrer"
        class="block w-full h-full media-link"
        :aria-label="`Abrir anúncio: ${property.title}`"
      >
        <img
          v-if="property.imageUrl && !imageFailed"
          :src="property.imageUrl"
          :alt="property.title"
          class="w-full h-full object-cover"
          loading="lazy"
          referrerpolicy="no-referrer"
          @error="imageFailed = true"
        />
        <div v-else class="w-full h-full flex align-items-center justify-content-center media-fallback">
          <i class="pi pi-building text-5xl opacity-30" />
        </div>
        <span class="absolute media-link-hint">
          Abrir anúncio <i class="pi pi-arrow-up-right text-xs" />
        </span>
      </a>
      <Tag :value="property.source" severity="secondary" class="absolute top-0 left-0 m-3" />
      <Button
        icon="pi pi-trash"
        severity="secondary"
        text
        rounded
        aria-label="Remover imóvel"
        class="absolute top-0 right-0 m-2 media-action"
        @click="requestDelete"
      />
    </div>

    <div class="p-4 flex flex-column flex-1">
      <div class="flex justify-content-between align-items-start gap-3 mb-2">
        <h2 class="display-font text-2xl line-height-2 m-0 text-ink">{{ property.title }}</h2>
        <span class="font-bold text-terracotta white-space-nowrap">{{ priceLabel }}</span>
      </div>
      <p v-if="property.location" class="m-0 mb-3 text-sm opacity-60">
        <i class="pi pi-map-marker mr-1" />{{ property.location }}
      </p>

      <div class="mt-auto">
        <span class="block text-xs uppercase font-bold opacity-50 mb-2 tracking-wide">Meu voto</span>
        <div class="grid grid-nogutter gap-2 mb-4" role="group" aria-label="Avaliação do imóvel">
          <Button
            v-for="option in ratingOptions"
            :key="option.value"
            :label="option.label"
            :icon="option.icon"
            size="small"
            :severity="property.rating === option.value ? option.severity : 'secondary'"
            :outlined="property.rating !== option.value"
            class="flex-1 text-xs"
            @click="setRating(option.value)"
          />
        </div>

        <label :for="`note-${property.id}`" class="block text-xs uppercase font-bold opacity-50 mb-2 tracking-wide">Por que sim ou não?</label>
        <Textarea
          :id="`note-${property.id}`"
          v-model="note"
          rows="2"
          auto-resize
          maxlength="280"
          class="w-full text-sm"
          placeholder="Ex.: rua barulhenta, ótima varanda..."
          @blur="saveNote"
        />

        <a
          :href="property.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex align-items-center gap-2 mt-3 text-sm font-bold text-forest no-underline"
        >
          Abrir anúncio <i class="pi pi-arrow-up-right text-xs" />
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Textarea from 'primevue/textarea'
import type { Property, PropertyRating } from '@/types'

const props = defineProps<{ property: Property }>()
const emit = defineEmits<{
  review: [payload: { id: number; rating: PropertyRating; note: string }]
  delete: [id: number]
}>()

const note = shallowRef(props.property.note)
const imageFailed = shallowRef(false)

const ratingOptions = [
  { value: 'liked' as const, label: '+1', icon: 'pi pi-thumbs-up', severity: 'success' as const },
  { value: 'disliked' as const, label: '−1', icon: 'pi pi-thumbs-down', severity: 'warn' as const },
  { value: 'terrible' as const, label: 'Muito ruim', icon: 'pi pi-times-circle', severity: 'danger' as const },
]

const priceLabel = computed(() =>
  props.property.price === null
    ? 'Preço não lido'
    : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(props.property.price),
)

watch(
  () => props.property.note,
  (value) => { note.value = value },
)

watch(
  () => props.property.imageUrl,
  () => { imageFailed.value = false },
)

function setRating(rating: Exclude<PropertyRating, null>) {
  emit('review', {
    id: props.property.id,
    rating: props.property.rating === rating ? null : rating,
    note: note.value.trim(),
  })
}

function saveNote() {
  const cleanNote = note.value.trim()
  if (cleanNote !== props.property.note) {
    emit('review', { id: props.property.id, rating: props.property.rating, note: cleanNote })
  }
}

function requestDelete() {
  if (window.confirm('Remover este imóvel da comparação?')) emit('delete', props.property.id)
}
</script>

<style scoped>
.property-card { border-color: var(--line) !important; min-height: 35rem; box-shadow: 0 12px 40px rgba(54, 82, 68, .07); transition: transform .25s ease, box-shadow .25s ease; }
.property-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(54, 82, 68, .12); }
.card-media { height: 14rem; background: #dce2d6; }
.media-link { color: inherit; text-decoration: none; }
.media-link::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 55%, rgba(24, 34, 28, .62)); opacity: 0; transition: opacity .2s ease; pointer-events: none; }
.media-link:hover::after, .media-link:focus-visible::after { opacity: 1; }
.media-link:focus-visible { outline: 3px solid var(--terracotta); outline-offset: -3px; }
.media-link-hint { z-index: 1; right: 1rem; bottom: .85rem; color: var(--cream); font-size: .8rem; font-weight: 700; opacity: 0; transform: translateY(.35rem); transition: opacity .2s ease, transform .2s ease; }
.media-link:hover .media-link-hint, .media-link:focus-visible .media-link-hint { opacity: 1; transform: translateY(0); }
.media-fallback { color: var(--forest); background: linear-gradient(135deg, #e3ddcc, #d6dfd4); }
.media-action { z-index: 2; color: var(--cream) !important; background: rgba(38, 48, 41, .55) !important; backdrop-filter: blur(6px); }
.tracking-wide { letter-spacing: .08em; }
</style>
