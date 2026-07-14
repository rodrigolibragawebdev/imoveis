<template>
  <section class="surface-card border-1 border-round-3xl mt-4 p-3 md:p-4 ranking-desk" aria-label="Filtros do ranking">
    <div class="flex flex-column xl:flex-row xl:align-items-center justify-content-between gap-3">
      <div class="flex align-items-center gap-3 desk-title">
        <span class="rank-seal"><i class="pi pi-chart-bar" /></span>
        <div>
          <strong class="display-font text-xl text-ink">Mesa de decisão</strong>
          <small class="block opacity-60 mt-1">+1 sobe · −1 vai ao fim na próxima carga · muito ruim sai da lista principal</small>
        </div>
      </div>

      <div class="flex flex-wrap gap-2 filter-pills" role="group" aria-label="Tipo de ranking">
        <Button
          v-for="option in rankingOptions"
          :key="option.value"
          :label="`${option.label} ${counts[option.value]}`"
          :icon="option.icon"
          size="small"
          :severity="filter === option.value ? option.severity : 'secondary'"
          :outlined="filter !== option.value"
          @click="emit('update:filter', option.value)"
        />
      </div>
    </div>

    <div class="flex flex-column md:flex-row md:align-items-center justify-content-between gap-3 mt-3 pt-3 neighborhood-row">
      <div class="flex flex-column sm:flex-row gap-2 sm:align-items-center flex-1">
        <label for="neighborhood-filter" class="text-sm font-bold white-space-nowrap">Filtrar por bairro</label>
        <Select
          id="neighborhood-filter"
          :model-value="neighborhood"
          :options="neighborhoods"
          show-clear
          placeholder="Todos os bairros"
          class="w-full sm:w-18rem"
          @update:model-value="emit('update:neighborhood', $event ?? null)"
        />
      </div>
      <Button
        label="Bairros desejados"
        :badge="String(preferredCount)"
        icon="pi pi-heart"
        severity="secondary"
        outlined
        @click="emit('manage-neighborhoods')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Select from 'primevue/select'
import type { PropertyRankingFilter } from '@/types'

defineProps<{
  filter: PropertyRankingFilter
  neighborhood: string | null
  neighborhoods: string[]
  preferredCount: number
  counts: Record<PropertyRankingFilter, number>
}>()

const emit = defineEmits<{
  'update:filter': [filter: PropertyRankingFilter]
  'update:neighborhood': [neighborhood: string | null]
  'manage-neighborhoods': []
}>()

const rankingOptions = [
  { value: 'ranking' as const, label: 'Ranking', icon: 'pi pi-sort-amount-up', severity: 'success' as const },
  { value: 'liked' as const, label: '+1', icon: 'pi pi-thumbs-up', severity: 'success' as const },
  { value: 'unrated' as const, label: 'Sem voto', icon: 'pi pi-circle', severity: 'secondary' as const },
  { value: 'disliked' as const, label: '−1', icon: 'pi pi-thumbs-down', severity: 'warn' as const },
  { value: 'terrible' as const, label: 'Muito ruins', icon: 'pi pi-times-circle', severity: 'danger' as const },
  { value: 'duplicates' as const, label: 'Duplicatas', icon: 'pi pi-clone', severity: 'info' as const },
]
</script>

<style scoped>
.ranking-desk { border-color: rgba(54, 82, 68, .18) !important; background: linear-gradient(135deg, rgba(255, 252, 244, .96), rgba(238, 241, 230, .92)); box-shadow: 0 18px 45px rgba(54, 82, 68, .08); }
.rank-seal { width: 2.9rem; height: 2.9rem; flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; color: var(--cream); background: var(--forest); box-shadow: 0 8px 18px rgba(54, 82, 68, .2); }
.neighborhood-row { border-top: 1px dashed rgba(54, 82, 68, .2); }
.filter-pills :deep(.p-button) { border-radius: 999px; }
@media (max-width: 575px) { .desk-title { align-items: flex-start !important; } }
</style>
