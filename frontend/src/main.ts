import '@fontsource-variable/fraunces'
import '@fontsource-variable/manrope'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import '@/assets/main.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import Aura from '@primeuix/themes/aura'
import App from './App.vue'
import { router } from './router'

createApp(App)
  .use(createPinia())
  .use(router)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: { darkModeSelector: '.app-dark', cssLayer: false },
    },
    ripple: true,
    locale: {
      startsWith: 'Começa com',
      contains: 'Contém',
      noFilter: 'Sem filtro',
      emptyMessage: 'Nenhum resultado encontrado',
      emptySearchMessage: 'Nenhum resultado encontrado',
    },
  })
  .use(ConfirmationService)
  .use(ToastService)
  .mount('#app')
