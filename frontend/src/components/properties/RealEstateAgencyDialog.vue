<template>
  <Dialog v-model:visible="visible" modal header="Imobiliárias" :style="{ width: 'min(42rem, 94vw)' }">
    <section class="reevaluation-panel flex flex-column sm:flex-row sm:align-items-center justify-content-between gap-3 mb-4">
      <div>
        <strong class="block text-ink">Revisar os anúncios salvos</strong>
        <small class="block opacity-60 mt-1 line-height-3">
          Aplica as palavras-chave novamente sem alterar escolhas manuais.
        </small>
      </div>
      <Button
        label="Reavaliar imóveis"
        icon="pi pi-refresh"
        severity="secondary"
        outlined
        :loading="saving"
        @click="emit('reevaluate')"
      />
    </section>

    <form class="agency-form grid mb-4" @submit.prevent="submit">
      <div class="col-12 sm:col-7">
        <label for="agency-name" class="block text-sm font-bold mb-2">Nome exibido</label>
        <InputText
          id="agency-name"
          v-model="name"
          class="w-full"
          placeholder="Ex.: Auxiliadora Predial"
          maxlength="80"
          autocomplete="off"
        />
      </div>
      <div class="col-12 sm:col-5">
        <label for="agency-keyword" class="block text-sm font-bold mb-2">Palavra no domínio</label>
        <InputText
          id="agency-keyword"
          v-model="keyword"
          class="w-full"
          placeholder="Ex.: auxiliadora"
          maxlength="60"
          autocomplete="off"
        />
      </div>
      <div class="col-12 flex flex-column sm:flex-row justify-content-end gap-2 pt-0">
        <Button
          v-if="editingId !== null"
          type="button"
          label="Cancelar edição"
          severity="secondary"
          text
          :disabled="saving"
          @click="resetForm"
        />
        <Button
          type="submit"
          :label="editingId === null ? 'Adicionar imobiliária' : 'Salvar alteração'"
          :icon="editingId === null ? 'pi pi-plus' : 'pi pi-check'"
          :loading="saving"
          :disabled="!canSubmit"
        />
      </div>
    </form>

    <div v-if="agencies.length" class="flex flex-column gap-2">
      <article
        v-for="agency in agencies"
        :key="agency.id"
        class="agency-item flex flex-column sm:flex-row sm:align-items-center justify-content-between gap-3"
      >
        <div class="min-w-0">
          <strong class="block text-ink text-overflow-ellipsis overflow-hidden">{{ agency.name }}</strong>
          <small class="block mt-1 opacity-60">
            reconhece <code>{{ agency.keyword }}</code> no domínio
          </small>
        </div>
        <div class="flex gap-1 align-self-end sm:align-self-center">
          <Button
            icon="pi pi-pencil"
            severity="secondary"
            text
            rounded
            :aria-label="`Editar ${agency.name}`"
            :disabled="saving"
            @click="edit(agency)"
          />
          <Button
            icon="pi pi-trash"
            severity="danger"
            text
            rounded
            :aria-label="`Excluir ${agency.name}`"
            :disabled="saving"
            @click="emit('delete', agency.id)"
          />
        </div>
      </article>
    </div>

    <div v-else class="empty-agencies text-center py-5 px-3">
      <span class="empty-seal"><i class="pi pi-building" /></span>
      <p class="mb-0 mt-3 opacity-60">Cadastre a primeira imobiliária para reconhecer anúncios automaticamente.</p>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import type { RealEstateAgency } from '@/types'

defineProps<{ agencies: RealEstateAgency[]; saving: boolean }>()
const emit = defineEmits<{
  add: [input: { name: string; keyword: string }]
  update: [input: { id: number; name: string; keyword: string }]
  delete: [id: number]
  reevaluate: []
}>()
const visible = defineModel<boolean>({ required: true })
const editingId = shallowRef<number | null>(null)
const name = shallowRef('')
const keyword = shallowRef('')
const canSubmit = computed(() => name.value.trim().length >= 2 && keyword.value.trim().length >= 2)

watch(visible, (isVisible) => {
  if (!isVisible) resetForm()
})

function edit(agency: RealEstateAgency) {
  editingId.value = agency.id
  name.value = agency.name
  keyword.value = agency.keyword
}

function resetForm() {
  editingId.value = null
  name.value = ''
  keyword.value = ''
}

function submit() {
  if (!canSubmit.value) return
  const input = { name: name.value.trim(), keyword: keyword.value.trim() }
  if (editingId.value === null) {
    emit('add', input)
  } else {
    emit('update', { id: editingId.value, ...input })
  }
  resetForm()
}
</script>

<style scoped>
.reevaluation-panel {
  padding: 1rem;
  border: 1px dashed rgba(54, 82, 68, .24);
  border-radius: 1rem;
  background: linear-gradient(135deg, rgba(54, 82, 68, .07), rgba(255, 252, 244, .7));
}
.agency-form {
  padding: .75rem;
  border: 1px solid rgba(182, 92, 58, .16);
  border-radius: 1.15rem;
  background: rgba(182, 92, 58, .045);
}
.agency-item {
  padding: .8rem 1rem;
  border: 1px solid rgba(54, 82, 68, .13);
  border-radius: 1rem;
  background: rgba(54, 82, 68, .055);
}
.agency-item code {
  color: var(--terracotta);
  font-family: var(--font-body);
  font-weight: 800;
}
.empty-agencies { border: 1px dashed rgba(54, 82, 68, .18); border-radius: 1rem; }
.empty-seal { display: inline-grid; place-items: center; width: 3rem; height: 3rem; border-radius: 50%; color: var(--forest); background: rgba(54, 82, 68, .09); }
</style>
