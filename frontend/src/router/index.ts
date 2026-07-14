import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', redirect: '/imoveis' },
    {
      path: '/imoveis',
      name: 'properties',
      component: () => import('@/views/PropertiesView.vue'),
      meta: { title: 'Avaliação de imóveis' },
    },
    {
      path: '/casa',
      name: 'furniture',
      component: () => import('@/views/FurnitureView.vue'),
      meta: { title: 'Lista para a casa' },
    },
    {
      path: '/dicas',
      name: 'tips',
      component: () => import('@/views/TipsView.vue'),
      meta: { title: 'Dicas para comprar' },
    },
    { path: '/:pathMatch(.*)*', redirect: '/imoveis' },
  ],
})

router.afterEach((to) => {
  document.title = `${String(to.meta.title ?? 'Início')} · Casa em Pauta`
})

