import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      name: 'properties',
      component: () => import('@/views/PropertiesView.vue'),
      meta: { title: 'Avaliação de imóveis' },
    },
    {
      path: '/agendados',
      name: 'agendamentos',
      component: () => import('@/views/AgendadosView.vue'),
      meta: { title: 'Agendamentos' },
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
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.afterEach((to) => {
  document.title = `${String(to.meta.title ?? 'Início')} · Casa em Pauta`
})
