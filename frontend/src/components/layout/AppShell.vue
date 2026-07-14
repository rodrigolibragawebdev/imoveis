<template>
  <div class="min-h-screen shell">
    <header class="sticky top-0 z-5 px-3 md:px-5 py-3 shell-header">
      <div class="max-w-7xl mx-auto flex align-items-center justify-content-between gap-3">
        <RouterLink to="/" class="flex align-items-center gap-3 no-underline text-ink">
          <span class="brand-mark flex align-items-center justify-content-center">
            <i class="pi pi-home text-xl" />
          </span>
          <span>
            <strong class="display-font text-xl md:text-2xl line-height-1">Casa em Pauta</strong>
            <small class="hidden md:block text-xs opacity-60 mt-1">decidir, planejar, morar</small>
          </span>
        </RouterLink>

        <nav class="flex align-items-center gap-1 md:gap-2" aria-label="Navegação principal">
          <RouterLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="nav-link flex align-items-center gap-2 no-underline px-3 py-2 border-round-3xl"
          >
            <i :class="item.icon" />
            <span class="hidden md:inline text-sm font-semibold">{{ item.label }}</span>
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="relative z-1 px-3 md:px-5 py-5 md:py-7">
      <RouterView v-slot="{ Component }">
        <Transition name="route" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<script setup lang="ts">
const navigation = [
  { to: '/', label: 'Imóveis', icon: 'pi pi-building' },
  { to: '/casa', label: 'Lista da casa', icon: 'pi pi-list-check' },
  { to: '/dicas', label: 'Dicas', icon: 'pi pi-compass' },
]
</script>

<style scoped>
.shell {
  background:
    radial-gradient(circle at 8% 12%, rgba(182, 92, 58, .1), transparent 24rem),
    radial-gradient(circle at 92% 40%, rgba(54, 82, 68, .1), transparent 28rem),
    var(--paper);
}
.shell::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: .22;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.12'/%3E%3C/svg%3E");
}
.shell-header { background: rgba(244, 239, 228, .82); backdrop-filter: blur(18px); border-bottom: 1px solid var(--line); }
.brand-mark { width: 2.7rem; height: 2.7rem; border-radius: 45% 55% 48% 52%; color: var(--cream); background: var(--terracotta); transform: rotate(-4deg); }
.brand-mark .pi { transform: rotate(4deg); }
.nav-link { color: rgba(38, 48, 41, .64); transition: .2s ease; }
.nav-link:hover { color: var(--ink); background: rgba(255, 250, 240, .7); }
.nav-link.router-link-active { color: var(--cream); background: var(--forest); box-shadow: 0 5px 16px rgba(54, 82, 68, .18); }
</style>
