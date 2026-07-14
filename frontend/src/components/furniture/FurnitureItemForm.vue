<template>
  <Dialog v-model:visible="visible" modal header="Adicionar item à lista" :style="{ width: 'min(38rem, 94vw)' }">
    <form class="grid pt-2" @submit.prevent="submit">
      <div class="col-12">
        <label for="item-link" class="block font-bold mb-2">Link do produto</label>
        <InputText id="item-link" v-model="url" type="url" class="w-full" placeholder="https://loja.com.br/produto" autofocus />
        <small class="block mt-2 opacity-60">Vamos tentar preencher nome, imagem e preço automaticamente.</small>
      </div>
      <div class="col-12 md:col-6">
        <label for="item-category" class="block font-bold mb-2">Categoria</label>
        <Select
          id="item-category"
          v-model="categoryId"
          :options="categories"
          option-label="name"
          option-value="id"
          placeholder="Selecione"
          class="w-full"
        />
      </div>
      <div class="col-12 md:col-6">
        <label for="item-price" class="block font-bold mb-2">Preço <span class="font-normal opacity-50">(opcional)</span></label>
        <InputNumber id="item-price" v-model="price" mode="currency" currency="BRL" locale="pt-BR" class="w-full" :min="0" />
      </div>
      <div class="col-12">
        <label for="item-title" class="block font-bold mb-2">Nome <span class="font-normal opacity-50">(opcional)</span></label>
        <InputText id="item-title" v-model="title" class="w-full" placeholder="Deixe vazio para usar o nome do site" maxlength="140" />
      </div>
      <div class="col-12 flex justify-content-end gap-2 mt-2">
        <Button type="button" label="Cancelar" severity="secondary" text @click="visible = false" />
        <Button type="submit" label="Montar card" icon="pi pi-sparkles" :loading="saving" :disabled="!canSubmit" />
      </div>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import type { FurnitureCategory } from '@/types'

defineProps<{ categories: FurnitureCategory[]; saving: boolean }>()
const emit = defineEmits<{
  submit: [payload: { categoryId: number; url: string; title?: string; price?: number }]
}>()
const visible = defineModel<boolean>({ required: true })

const url = shallowRef('')
const categoryId = shallowRef<number>()
const title = shallowRef('')
const price = shallowRef<number>()

const canSubmit = computed(() => {
  if (!categoryId.value || !url.value.trim()) return false
  try {
    return ['http:', 'https:'].includes(new URL(url.value).protocol)
  } catch {
    return false
  }
})

function submit() {
  if (!categoryId.value || !canSubmit.value) return
  emit('submit', {
    categoryId: categoryId.value,
    url: url.value.trim(),
    title: title.value.trim() || undefined,
    price: price.value,
  })
  url.value = ''
  title.value = ''
  price.value = undefined
}
</script>

