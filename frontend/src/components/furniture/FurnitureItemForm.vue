<template>
  <Dialog v-model:visible="visible" modal :header="item ? 'Editar item' : 'Adicionar item à lista'" :style="{ width: 'min(38rem, 94vw)' }">
    <form class="grid pt-2" @submit.prevent="submit">
      <div class="col-12">
        <label for="item-link" class="block font-bold mb-2">Link do produto</label>
        <InputText id="item-link" v-model="url" type="url" class="w-full" placeholder="https://loja.com.br/produto" autofocus />
        <small class="block mt-2 opacity-60">{{ item ? 'Ao trocar o link, a origem do card também será atualizada.' : 'Vamos tentar preencher nome, imagem e preço automaticamente.' }}</small>
      </div>
      <div class="col-12 md:col-6">
        <label for="item-category" class="block font-bold mb-2">Categoria</label>
        <Select id="item-category" v-model="categoryId" :options="categories" option-label="name" option-value="id" placeholder="Selecione" class="w-full" />
      </div>
      <div class="col-12 md:col-6">
        <label for="item-price" class="block font-bold mb-2">Preço <span class="font-normal opacity-50">(opcional)</span></label>
        <InputNumber id="item-price" v-model="price" mode="currency" currency="BRL" locale="pt-BR" class="w-full" :min="0" />
      </div>
      <div class="col-12">
        <label for="item-title" class="block font-bold mb-2">Nome</label>
        <InputText id="item-title" v-model="title" class="w-full" placeholder="Deixe vazio para usar o nome do site" maxlength="140" />
      </div>
      <div class="col-12">
        <label for="item-image" class="block font-bold mb-2">Imagem <span class="font-normal opacity-50">(opcional)</span></label>
        <InputText id="item-image" v-model="imageUrl" type="url" class="w-full" placeholder="https://loja.com.br/imagem.jpg" />
        <small class="block mt-2 opacity-60">Útil quando a loja protege a imagem e não conseguimos lê-la automaticamente.</small>
      </div>
      <div class="col-12 flex justify-content-end gap-2 mt-2">
        <Button type="button" label="Cancelar" severity="secondary" text @click="visible = false" />
        <Button type="submit" :label="item ? 'Salvar alterações' : 'Montar card'" :icon="item ? 'pi pi-check' : 'pi pi-sparkles'" :loading="saving" :disabled="!canSubmit" />
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
import Select from 'primevue/select'
import type { FurnitureCategory, FurnitureItem, FurnitureItemInput } from '@/types'

const props = defineProps<{ categories: FurnitureCategory[]; saving: boolean; item?: FurnitureItem | null }>()
const emit = defineEmits<{ submit: [payload: FurnitureItemInput] }>()
const visible = defineModel<boolean>({ required: true })
const url = shallowRef('')
const categoryId = shallowRef<number>()
const title = shallowRef('')
const imageUrl = shallowRef('')
const price = shallowRef<number>()

const canSubmit = computed(() => {
  if (!categoryId.value || !url.value.trim() || (props.item && !title.value.trim())) return false
  try {
    const linkIsValid = ['http:', 'https:'].includes(new URL(url.value).protocol)
    const imageIsValid = !imageUrl.value.trim() || ['http:', 'https:'].includes(new URL(imageUrl.value).protocol)
    return linkIsValid && imageIsValid
  } catch {
    return false
  }
})

watch([visible, () => props.item], ([isVisible]) => {
  if (!isVisible) return
  url.value = props.item?.url ?? ''
  categoryId.value = props.item?.categoryId
  title.value = props.item?.title ?? ''
  imageUrl.value = props.item?.imageUrl ?? ''
  price.value = props.item?.price ?? undefined
}, { immediate: true })

function submit() {
  if (!categoryId.value || !canSubmit.value) return
  emit('submit', {
    categoryId: categoryId.value,
    url: url.value.trim(),
    title: title.value.trim() || undefined,
    imageUrl: imageUrl.value.trim() || undefined,
    price: price.value,
  })
}
</script>
