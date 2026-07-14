<template>
  <Dialog v-model:visible="visible" modal header="Nova categoria" :style="{ width: 'min(30rem, 92vw)' }">
    <form class="flex flex-column gap-4 pt-2" @submit.prevent="submit">
      <div>
        <label for="category-name" class="block font-bold mb-2">Nome da categoria</label>
        <InputText id="category-name" v-model="name" class="w-full" placeholder="Ex.: Varanda" maxlength="40" autofocus />
      </div>
      <div>
        <label for="category-color" class="block font-bold mb-2">Cor de identificação</label>
        <div class="flex align-items-center gap-3">
          <input id="category-color" v-model="color" type="color" class="color-input border-none p-0" />
          <span class="text-sm opacity-60">{{ color.toUpperCase() }}</span>
        </div>
      </div>
      <div class="flex justify-content-end gap-2 mt-2">
        <Button type="button" label="Cancelar" severity="secondary" text @click="visible = false" />
        <Button type="submit" label="Criar categoria" icon="pi pi-plus" :loading="saving" :disabled="name.trim().length < 2" />
      </div>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'

defineProps<{ saving: boolean }>()
const emit = defineEmits<{ submit: [payload: { name: string; color: string }] }>()
const visible = defineModel<boolean>({ required: true })

const name = shallowRef('')
const color = shallowRef('#B65C3A')

function submit() {
  emit('submit', { name: name.value.trim(), color: color.value })
  name.value = ''
}
</script>

<style scoped>
.color-input { width: 3.25rem; height: 3.25rem; border-radius: 50%; overflow: hidden; cursor: pointer; background: transparent; }
</style>

