<template>
  <article class="surface-card border-1 border-round-3xl overflow-hidden flex flex-column agendamento-card">
    <div class="relative card-media">
      <a
        :href="agendamento.property.url"
        target="_blank"
        rel="noopener noreferrer"
        class="block w-full h-full media-link"
        :aria-label="`Abrir anúncio: ${agendamento.property.title}`"
      >
        <img
          v-if="agendamento.property.imageUrl && !imageFailed"
          :src="agendamento.property.imageUrl"
          :alt="agendamento.property.title"
          class="w-full h-full object-cover"
          loading="lazy"
          referrerpolicy="no-referrer"
          @error="imageFailed = true"
        />
        <div v-else class="w-full h-full flex align-items-center justify-content-center media-fallback">
          <i class="pi pi-building text-5xl opacity-30" />
        </div>
      </a>
      <div class="absolute top-0 left-0 m-3 agency-anchor">
        <PropertyAgencyBadge
          :property="agendamento.property"
          :agencies="agencies"
          @change="emit('agency', $event)"
          @manage-agencies="emit('manageAgencies')"
        />
      </div>
      <Button
        icon="pi pi-trash"
        severity="secondary"
        text
        rounded
        aria-label="Remover agendamento"
        class="absolute top-0 right-0 m-2 media-action"
        @click="requestRemove"
      />
    </div>

    <div class="p-4 flex flex-column flex-1">
      <div class="flex flex-column justify-content-between align-items-start gap-3 mb-2">
        <h2 class="display-font text-2xl line-height-2 m-0 text-ink flex-order-1" :title="agendamento.property.title">
          {{ agendamento.property.title }}
        </h2>
        <span class="font-bold text-terracotta white-space-nowrap flex-order-0">{{ priceLabel }}</span>
      </div>
      <p v-if="agendamento.property.location" class="m-0 mb-1 text-sm opacity-60">
        <i class="pi pi-map-marker mr-1" />{{ agendamento.property.location }}
      </p>
      <div class="flex align-items-center justify-content-between gap-2 mb-3">
        <p class="m-0 text-xs opacity-50">Agendado em {{ formatDate(agendamento.createdAt) }}</p>
        <Tag v-if="!agendamento.active" value="Voltou para imóveis" icon="pi pi-undo" severity="secondary" rounded />
        <Button
          v-else
          label="Voltar para imóveis"
          icon="pi pi-undo"
          size="small"
          severity="secondary"
          text
          @click="emit('returnToListing', agendamento.id)"
        />
      </div>

      <span class="block text-xs uppercase font-bold opacity-50 mb-2 tracking-wide">A visita avançou?</span>
      <div class="grid grid-nogutter gap-2 mb-4" role="group" aria-label="Status da visita">
        <Button
          v-for="option in statusOptions"
          :key="String(option.value)"
          :label="option.label"
          :icon="option.icon"
          size="small"
          :severity="agendamento.advanced === option.value ? option.severity : 'secondary'"
          :outlined="agendamento.advanced !== option.value"
          class="flex-1 text-xs"
          @click="setAdvanced(option.value)"
        />
      </div>

      <span class="block text-xs uppercase font-bold opacity-50 mb-2 tracking-wide">Fotos da visita</span>
      <div class="flex flex-wrap gap-2 mb-2">
        <div v-for="photo in agendamento.photos" :key="photo.id" class="relative photo-thumb">
          <img :src="apiBaseUrl + photo.url" :alt="`Foto da visita a ${agendamento.property.title}`" loading="lazy" />
          <Button
            icon="pi pi-times"
            severity="secondary"
            text
            rounded
            size="small"
            aria-label="Remover foto"
            class="absolute top-0 right-0 photo-remove"
            @click="removePhoto(photo.id)"
          />
        </div>
        <button type="button" class="photo-add flex align-items-center justify-content-center" :disabled="uploading" @click="fileInput?.click()">
          <i v-if="!uploading" class="pi pi-camera text-xl" />
          <i v-else class="pi pi-spin pi-spinner text-xl" />
        </button>
        <input ref="fileInput" type="file" accept="image/*" multiple class="hidden" @change="onFilesSelected" />
      </div>

      <div class="mt-auto pt-3">
        <span class="block text-xs uppercase font-bold opacity-50 mb-2 tracking-wide">Notas</span>
        <ul v-if="agendamento.notes.length" class="list-none p-0 m-0 mb-2 flex flex-column gap-2">
          <li v-for="note in agendamento.notes" :key="note.id" class="note-item flex align-items-start justify-content-between gap-2">
            <span class="text-sm line-height-3">{{ note.content }}</span>
            <Button icon="pi pi-times" severity="secondary" text rounded size="small" aria-label="Remover nota" @click="removeNote(note.id)" />
          </li>
        </ul>
        <div class="flex gap-2">
          <Textarea v-model="noteDraft" rows="1" auto-resize maxlength="500" class="w-full text-sm" placeholder="Ex.: verificar infiltração no banheiro..." />
          <Button icon="pi pi-plus" aria-label="Adicionar nota" :disabled="!noteDraft.trim()" @click="submitNote" />
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Textarea from 'primevue/textarea'
import PropertyAgencyBadge from '@/components/properties/PropertyAgencyBadge.vue'
import type { Agendamento, PropertyAgencyMatchMode, RealEstateAgency } from '@/types'
import { compressImage } from '@/utils/imageCompression'

const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5177/api'

const props = defineProps<{ agendamento: Agendamento; agencies: RealEstateAgency[] }>()
const emit = defineEmits<{
  setAdvanced: [payload: { id: number; advanced: boolean | null }]
  returnToListing: [id: number]
  remove: [id: number]
  addNote: [payload: { id: number; content: string }]
  removeNote: [payload: { id: number; noteId: number }]
  addPhoto: [payload: { id: number; file: File }]
  removePhoto: [payload: { id: number; photoId: number }]
  agency: [payload: { id: number; agencyId: number | null; mode: PropertyAgencyMatchMode }]
  manageAgencies: []
}>()

const imageFailed = shallowRef(false)
const noteDraft = shallowRef('')
const uploading = shallowRef(false)
const fileInput = shallowRef<HTMLInputElement | null>(null)

const statusOptions = [
  { value: null, label: 'Pendente', icon: 'pi pi-clock', severity: 'secondary' as const },
  { value: true, label: 'Avançou', icon: 'pi pi-check-circle', severity: 'success' as const },
  { value: false, label: 'Não avançou', icon: 'pi pi-times-circle', severity: 'danger' as const },
]

const priceLabel = (() => {
  const price = props.agendamento.property.price
  return price === null
    ? 'Preço não lido'
    : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(price)
})()

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(value.replace(' ', 'T')))
}

function setAdvanced(advanced: boolean | null) {
  emit('setAdvanced', { id: props.agendamento.id, advanced })
}

function requestRemove() {
  emit('remove', props.agendamento.id)
}

function submitNote() {
  const content = noteDraft.value.trim()
  if (!content) return
  emit('addNote', { id: props.agendamento.id, content })
  noteDraft.value = ''
}

function removeNote(noteId: number) {
  emit('removeNote', { id: props.agendamento.id, noteId })
}

function removePhoto(photoId: number) {
  emit('removePhoto', { id: props.agendamento.id, photoId })
}

async function onFilesSelected(event: Event) {
  const input = event.target as HTMLInputElement
  const files = input.files ? Array.from(input.files) : []
  input.value = ''
  if (!files.length) return

  uploading.value = true
  try {
    for (const file of files) {
      const compressed = await compressImage(file)
      emit('addPhoto', { id: props.agendamento.id, file: compressed })
    }
  } finally {
    uploading.value = false
  }
}
</script>

<style scoped>
.agendamento-card {
  border-color: var(--line) !important;
  box-shadow: 0 12px 40px rgba(54, 82, 68, 0.07);
}
.card-media { height: 12rem; background: #dce2d6; }
.media-link { color: inherit; text-decoration: none; }
.media-fallback { color: var(--forest); background: linear-gradient(135deg, #e3ddcc, #d6dfd4); }
.media-action { z-index: 3; color: var(--cream) !important; background: rgba(38, 48, 41, 0.55) !important; backdrop-filter: blur(6px); }
.agency-anchor { z-index: 2; max-width: calc(100% - 4.5rem); }
.tracking-wide { letter-spacing: 0.08em; }
.photo-thumb {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid var(--line);
}
.photo-thumb img { width: 100%; height: 100%; object-fit: cover; }
.photo-remove {
  background: rgba(38, 48, 41, 0.6) !important;
  color: var(--cream) !important;
  width: 1.6rem !important;
  height: 1.6rem !important;
}
.photo-add {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 0.75rem;
  border: 1px dashed var(--line);
  background: transparent;
  color: var(--forest);
  cursor: pointer;
}
.photo-add:disabled { opacity: 0.6; cursor: default; }
.note-item {
  padding: 0.55rem 0.7rem;
  border-radius: 0.75rem;
  background: rgba(38, 48, 41, 0.05);
}
</style>
