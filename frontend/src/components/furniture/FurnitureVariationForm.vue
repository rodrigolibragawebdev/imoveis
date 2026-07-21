<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="variation ? 'Editar variação' : 'Adicionar variação'"
    :style="{ width: 'min(38rem, 94vw)' }"
  >
    <div v-if="item" class="parent-context">
      <span class="context-icon"><i class="pi pi-sitemap" /></span>
      <span>
        <small>Esta opção ficará dentro de</small>
        <strong>{{ item.title }}</strong>
      </span>
    </div>

    <form class="grid pt-2" @submit.prevent="submit">
      <div class="col-12">
        <label for="variation-link" class="block font-bold mb-2">Link desta opção</label>
        <InputText id="variation-link" v-model="url" type="url" class="w-full" placeholder="https://loja.com.br/outra-opcao" autofocus />
        <small class="block mt-2 opacity-60">
          {{ variation ? 'O domínio exibido também será atualizado.' : 'Só o link já basta. Vamos tentar capturar título, imagem e preço automaticamente.' }}
        </small>
      </div>
      <div class="col-12">
        <Button
          type="button"
          :label="showDetails ? 'Ocultar complementos' : 'Adicionar nome, imagem ou preço'"
          :icon="showDetails ? 'pi pi-chevron-up' : 'pi pi-sliders-h'"
          severity="secondary"
          size="small"
          text
          @click="showDetails = !showDetails"
        />
      </div>
      <template v-if="showDetails">
        <div class="col-12 md:col-5">
          <label for="variation-price" class="block font-bold mb-2">Preço <span class="font-normal opacity-50">(opcional)</span></label>
          <InputNumber id="variation-price" v-model="price" mode="currency" currency="BRL" locale="pt-BR" class="w-full" :min="0" />
        </div>
        <div class="col-12 md:col-7">
          <label for="variation-title" class="block font-bold mb-2">Nome <span class="font-normal opacity-50">(opcional)</span></label>
          <InputText id="variation-title" v-model="title" class="w-full" placeholder="Ex.: Sofá bege — Loja B" />
        </div>
        <div class="col-12">
          <label for="variation-image" class="block font-bold mb-2">Imagem <span class="font-normal opacity-50">(opcional)</span></label>
          <InputText id="variation-image" v-model="imageUrl" type="url" class="w-full" placeholder="https://loja.com.br/imagem.jpg" />
        </div>
      </template>
      <div class="col-12 flex justify-content-end gap-2 mt-2">
        <Button type="button" label="Cancelar" severity="secondary" text @click="visible = false" />
        <Button
          type="submit"
          :label="variation ? 'Salvar variação' : 'Adicionar variação'"
          :icon="variation ? 'pi pi-check' : 'pi pi-plus'"
          :loading="saving"
          :disabled="!canSubmit"
        />
      </div>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import type { FurnitureItem, FurnitureVariation, FurnitureVariationInput } from '@/types'

const props = defineProps<{
  item: FurnitureItem | null
  variation?: FurnitureVariation | null
  saving: boolean
}>()
const emit = defineEmits<{ submit: [payload: FurnitureVariationInput] }>()
const visible = defineModel<boolean>({ required: true })
const url = shallowRef('')
const title = shallowRef('')
const imageUrl = shallowRef('')
const price = shallowRef<number>()
const showDetails = shallowRef(false)

const canSubmit = computed(() => {
  if (!props.item || !url.value.trim() || (props.variation && !title.value.trim())) return false
  try {
    const linkIsValid = ['http:', 'https:'].includes(new URL(url.value).protocol)
    const imageIsValid = !imageUrl.value.trim() || ['http:', 'https:'].includes(new URL(imageUrl.value).protocol)
    return linkIsValid && imageIsValid
  } catch {
    return false
  }
})

watch([visible, () => props.variation], ([isVisible]) => {
  if (!isVisible) return
  url.value = props.variation?.url ?? ''
  title.value = props.variation?.title ?? ''
  imageUrl.value = props.variation?.imageUrl ?? ''
  price.value = props.variation?.price ?? undefined
  showDetails.value = Boolean(props.variation)
}, { immediate: true })

function submit() {
  if (!canSubmit.value) return
  emit('submit', {
    url: url.value.trim(),
    title: title.value.trim() || undefined,
    imageUrl: imageUrl.value.trim() || undefined,
    price: price.value,
  })
}
</script>

<style scoped>
.parent-context {
  display: flex;
  align-items: center;
  gap: .75rem;
  margin: 0 0 1rem;
  padding: .75rem;
  border: 1px solid var(--line);
  border-radius: 1rem;
  background: rgba(54, 82, 68, .05);
}
.context-icon { display: grid; place-items: center; width: 2.4rem; height: 2.4rem; border-radius: .75rem; color: var(--terracotta); background: rgba(182, 92, 58, .1); }
.parent-context > span:last-child { display: flex; flex-direction: column; gap: .12rem; min-width: 0; }
.parent-context small { opacity: .58; }
.parent-context strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
