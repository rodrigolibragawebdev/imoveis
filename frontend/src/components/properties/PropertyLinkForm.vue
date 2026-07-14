<template>
  <form class="surface-card border-1 border-round-3xl p-4 md:p-5 form-panel" @submit.prevent="submit">
    <div class="flex flex-column md:flex-row md:align-items-end gap-4">
      <div class="flex-1">
        <label for="property-links" class="block font-bold text-ink mb-2">Links dos imóveis</label>
        <Textarea
          id="property-links"
          v-model="linksText"
          rows="3"
          auto-resize
          class="w-full"
          placeholder="Cole um link por linha&#10;https://site.com.br/imovel-1"
          :disabled="loading"
        />
        <small class="block mt-2 opacity-60">Até 20 links. Título, imagem e preço serão buscados quando o site permitir.</small>
      </div>
      <Button
        type="submit"
        label="Montar os cards"
        icon="pi pi-sparkles"
        class="white-space-nowrap"
        :loading="loading"
        :disabled="!linksText.trim()"
      />
    </div>
    <Message v-if="localError" severity="warn" class="mt-3 mb-0">{{ localError }}</Message>
  </form>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import Button from 'primevue/button'
import Message from 'primevue/message'
import Textarea from 'primevue/textarea'

defineProps<{ loading: boolean }>()

const emit = defineEmits<{ submit: [links: string[]] }>()

const linksText = shallowRef('')
const localError = shallowRef('')

function submit() {
  const links = linksText.value
    .split(/[\n,]+/)
    .map((link) => link.trim())
    .filter(Boolean)

  const invalid = links.find((link) => {
    try {
      return !['http:', 'https:'].includes(new URL(link).protocol)
    } catch {
      return true
    }
  })

  if (invalid) {
    localError.value = `Confira este link: ${invalid}`
    return
  }
  if (links.length > 20) {
    localError.value = 'Envie no máximo 20 links de cada vez.'
    return
  }

  localError.value = ''
  emit('submit', [...new Set(links)])
  linksText.value = ''
}
</script>

<style scoped>
.form-panel { border-color: var(--line) !important; box-shadow: 0 18px 50px rgba(54, 82, 68, .07); }
</style>

