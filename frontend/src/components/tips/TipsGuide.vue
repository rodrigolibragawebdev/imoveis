<template>
  <section class="max-w-7xl mx-auto">
    <div class="mb-6 md:mb-7">
      <span class="inline-block text-sm uppercase font-bold text-terracotta mb-2 eyebrow">Antes de assinar</span>
      <h1 class="display-font text-5xl md:text-7xl line-height-1 m-0">Comprar com<br /><em>os olhos abertos.</em></h1>
    </div>

    <Tabs value="dicas">
      <TabList>
        <Tab value="dicas">Dicas</Tab>
        <Tab value="taxas">Taxas e juros</Tab>
        <Tab value="simulador">Simular financiamento</Tab>
        <Tab value="bancos">Bancos e programas</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="dicas">
          <Message v-if="store.error" severity="error" class="mb-4">{{ store.error }}</Message>

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
        </TabPanel>

        <TabPanel value="taxas">
          <TipsRatesInfo />
        </TabPanel>

        <TabPanel value="simulador">
          <FinancingSimulator />
        </TabPanel>

        <TabPanel value="bancos">
          <LendersAndPrograms />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Message from 'primevue/message'
import Tab from 'primevue/tab'
import TabList from 'primevue/tablist'
import TabPanel from 'primevue/tabpanel'
import TabPanels from 'primevue/tabpanels'
import Tabs from 'primevue/tabs'
import FinancingSimulator from '@/components/tips/FinancingSimulator.vue'
import LendersAndPrograms from '@/components/tips/LendersAndPrograms.vue'
import TipsRatesInfo from '@/components/tips/TipsRatesInfo.vue'
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
.tip-card { border-color: var(--line) !important; }
.placeholder-card { border-color: rgba(182, 92, 58, .35) !important; }
</style>
