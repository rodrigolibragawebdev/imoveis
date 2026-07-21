<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Lixeira da lista"
    :style="{ width: 'min(52rem, 95vw)' }"
    :content-style="{ paddingTop: '.25rem' }"
  >
    <div class="trash-intro">
      <div>
        <span class="trash-eyebrow">Nada se perde por engano</span>
        <p>Itens removidos ficam inativos no banco e podem voltar para a lista a qualquer momento.</p>
      </div>
      <div v-if="items.length" class="trash-bulk-actions">
        <Button
          label="Restaurar todos"
          icon="pi pi-history"
          severity="secondary"
          outlined
          :disabled="saving"
          @click="emit('restoreAll', itemIds)"
        />
        <Button
          label="Esvaziar lixeira"
          icon="pi pi-trash"
          severity="danger"
          text
          :disabled="saving"
          @click="emit('permanentDeleteAll', itemIds)"
        />
      </div>
    </div>

    <div v-if="loading" class="trash-list" aria-label="Carregando itens inativos">
      <Skeleton v-for="index in 4" :key="index" height="6.5rem" border-radius="1rem" />
    </div>

    <div v-else-if="!items.length" class="trash-empty">
      <span class="empty-mark"><i class="pi pi-check" /></span>
      <h3 class="display-font">A lixeira está vazia</h3>
      <p>Nenhum item inativo. Sua lista ativa está completa por aqui.</p>
    </div>

    <div v-else class="trash-list">
      <article v-for="item in items" :key="item.id" class="trash-item">
        <div class="item-visual" aria-hidden="true">
          <img v-if="item.imageUrl" :src="item.imageUrl" alt="" loading="lazy" />
          <i v-else class="pi pi-box" />
        </div>

        <div class="item-copy">
          <span class="category-label">
            <span class="category-dot" :style="{ backgroundColor: item.categoryColor }" />
            {{ item.categoryName }}
          </span>
          <h3 class="display-font item-title">{{ item.title }}</h3>
          <div class="item-meta">
            <span>{{ formatPrice(item.price) }}</span>
            <span v-if="item.variations.length">
              {{ item.variations.length }} {{ item.variations.length === 1 ? 'variação preservada' : 'variações preservadas' }}
            </span>
            <time v-if="item.deletedAt" :datetime="item.deletedAt">Removido em {{ formatDeletedAt(item.deletedAt) }}</time>
          </div>
        </div>

        <div class="item-actions">
          <Button
            label="Restaurar"
            icon="pi pi-undo"
            severity="success"
            outlined
            :disabled="saving"
            @click="emit('restore', item.id)"
          />
          <Button
            title="Esta ação é permanente"
            aria-label="Excluir definitivamente"
            icon="pi pi-trash"
            severity="danger"
            text
            :disabled="saving"
            @click="emit('permanentDelete', item.id)"
          />
        </div>
      </article>
    </div>

    <template #footer>
      <Button label="Fechar" severity="secondary" text @click="visible = false" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Skeleton from 'primevue/skeleton'
import type { FurnitureItem } from '@/types'

const emit = defineEmits<{
  restore: [id: number]
  restoreAll: [ids: number[]]
  permanentDelete: [id: number]
  permanentDeleteAll: [ids: number[]]
}>()
const visible = defineModel<boolean>({ required: true })
const props = defineProps<{
  items: FurnitureItem[]
  loading: boolean
  saving: boolean
}>()
const itemIds = computed(() => props.items.map((item) => item.id))

function formatPrice(price: number | null) {
  if (price === null) return 'Sem preço estimado'
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
}

function formatDeletedAt(value: string) {
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
    .format(new Date(value.replace(' ', 'T')))
}
</script>

<style scoped>
.trash-intro { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; margin-bottom: 1rem; padding: 1rem 1.1rem; border: 1px solid rgba(54, 82, 68, .12); border-radius: 1rem; background: linear-gradient(135deg, rgba(54, 82, 68, .075), rgba(255, 250, 240, .35)); }
.trash-intro p { max-width: 35rem; margin: .25rem 0 0; color: rgba(38, 48, 41, .64); font-size: .82rem; line-height: 1.5; }
.trash-eyebrow { color: var(--forest); font-size: .7rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
.trash-bulk-actions { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: .35rem; }
.trash-list { display: flex; flex-direction: column; gap: .65rem; max-height: min(58vh, 34rem); overflow: auto; padding-right: .2rem; }
.trash-item { display: grid; grid-template-columns: 4.75rem minmax(0, 1fr) auto; align-items: center; gap: 1rem; padding: .8rem; border: 1px solid rgba(38, 48, 41, .12); border-radius: 1rem; background: rgba(255, 250, 240, .72); }
.item-visual { display: grid; place-items: center; width: 4.75rem; height: 4.75rem; overflow: hidden; border-radius: .8rem; color: rgba(54, 82, 68, .4); background: rgba(54, 82, 68, .09); }
.item-visual img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(.45); opacity: .72; }
.item-visual i { font-size: 1.45rem; }
.item-copy { min-width: 0; }
.category-label { display: flex; align-items: center; gap: .4rem; color: rgba(38, 48, 41, .54); font-size: .66rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
.category-dot { width: .5rem; height: .5rem; border-radius: 50%; }
.item-title { margin: .25rem 0 .4rem; font-size: 1.05rem; line-height: 1.18; overflow-wrap: anywhere; }
.item-meta { display: flex; flex-wrap: wrap; gap: .35rem .8rem; color: rgba(38, 48, 41, .54); font-size: .7rem; }
.item-meta span:first-child { color: var(--terracotta); font-weight: 800; }
.item-actions { display: flex; align-items: center; gap: .25rem; }
.trash-empty { display: flex; min-height: 18rem; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
.empty-mark { display: grid; place-items: center; width: 3.75rem; height: 3.75rem; border-radius: 50%; color: var(--forest); background: rgba(54, 82, 68, .09); }
.trash-empty h3 { margin: 1rem 0 .3rem; font-size: 1.6rem; }
.trash-empty p { margin: 0; color: rgba(38, 48, 41, .56); font-size: .82rem; }

@media (max-width: 640px) {
  .trash-intro { align-items: stretch; flex-direction: column; }
  .trash-bulk-actions { align-items: stretch; flex-direction: column; }
  .trash-item { grid-template-columns: 3.75rem minmax(0, 1fr); }
  .item-visual { width: 3.75rem; height: 3.75rem; }
  .item-actions { grid-column: 1 / -1; }
  .item-actions :deep(.p-button:first-child) { flex: 1; }
}
</style>
