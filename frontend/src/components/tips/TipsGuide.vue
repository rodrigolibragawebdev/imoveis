<template>
  <section class="max-w-7xl mx-auto">
    <div class="grid align-items-center mb-6 md:mb-8">
      <div class="col-12 lg:col-7">
        <span class="inline-block text-sm uppercase font-bold text-terracotta mb-2 eyebrow">Antes de assinar</span>
        <h1 class="display-font text-5xl md:text-7xl line-height-1 m-0">Comprar com<br /><em>os olhos abertos.</em></h1>
      </div>
      <div class="col-12 lg:col-5">
        <div class="border-round-3xl p-4 md:p-5 note-panel">
          <i class="pi pi-bookmark-fill text-terracotta text-xl mb-3" />
          <p class="text-lg line-height-3 m-0">Esta área já está preparada para receber o conteúdo definitivo das dicas. Quando você enviar, os textos entram aqui sem mexer nas outras partes do sistema.</p>
        </div>
      </div>
    </div>

    <Message v-if="store.error" severity="error">{{ store.error }}</Message>

    <div v-if="store.items.length" class="grid">
      <article v-for="(tip, index) in store.items" :key="tip.id" class="col-12 md:col-6">
        <div class="surface-card border-1 border-round-3xl p-4 md:p-5 h-full tip-card">
          <span class="display-font text-5xl text-terracotta opacity-30">{{ String(index + 1).padStart(2, '0') }}</span>
          <h2 class="display-font text-3xl mb-3">{{ tip.title }}</h2>
          <p class="line-height-3 opacity-70 white-space-pre-line">{{ tip.content }}</p>
        </div>
      </article>
    </div>

    <div v-else-if="!store.loading" class="grid">
      <div v-for="topic in futureTopics" :key="topic.number" class="col-12 md:col-4">
        <article class="h-full border-top-2 pt-4 pb-6 placeholder-card">
          <div class="flex align-items-center justify-content-between mb-5">
            <span class="display-font text-4xl opacity-25">{{ topic.number }}</span>
            <i :class="topic.icon" class="text-xl text-terracotta" />
          </div>
          <h2 class="display-font text-2xl m-0 mb-2">{{ topic.title }}</h2>
          <p class="line-height-3 opacity-55 m-0">Conteúdo reservado para a próxima etapa.</p>
        </article>
      </div>
    </div>

    <div class="mt-4 md:mt-7 flex flex-column md:flex-row align-items-start md:align-items-center justify-content-between gap-4 border-round-3xl p-4 md:p-5 next-step">
      <div>
        <strong class="display-font text-2xl">Conteúdo em construção</strong>
        <p class="m-0 mt-1 opacity-60">O espaço está pronto; falta apenas a sua curadoria.</p>
      </div>
      <Tag value="Próxima etapa" icon="pi pi-arrow-right" severity="warn" rounded />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Message from 'primevue/message'
import Tag from 'primevue/tag'
import { useTipsStore } from '@/stores/tips'

const store = useTipsStore()
const futureTopics = [
  { number: '01', title: 'Documentação', icon: 'pi pi-file-check' },
  { number: '02', title: 'Visita e vistoria', icon: 'pi pi-search' },
  { number: '03', title: 'Custos da compra', icon: 'pi pi-calculator' },
]

onMounted(store.load)
</script>

<style scoped>
.eyebrow { letter-spacing: .14em; }
.note-panel { color: var(--cream); background: var(--forest); box-shadow: 0 18px 45px rgba(54, 82, 68, .16); transform: rotate(1deg); }
.tip-card { border-color: var(--line) !important; }
.placeholder-card { border-color: rgba(182, 92, 58, .35) !important; }
.next-step { background: rgba(255, 250, 240, .7); border: 1px solid var(--line); }
</style>

