<template>
  <AppShell />
  <ConfirmDialog :draggable="false">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <section class="confirm-card" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-message">
        <span class="confirm-icon" aria-hidden="true"><i :class="message.icon" /></span>
        <span class="confirm-eyebrow">Confirmar ação</span>
        <h2 id="confirm-title" class="display-font confirm-title">{{ message.header }}</h2>
        <p id="confirm-message" class="confirm-message">{{ message.message }}</p>
        <div class="confirm-actions">
          <Button v-bind="message.rejectProps" :label="message.rejectLabel" autofocus @click="rejectCallback" />
          <Button v-bind="message.acceptProps" :label="message.acceptLabel" @click="acceptCallback" />
        </div>
      </section>
    </template>
  </ConfirmDialog>
  <Toast position="bottom-right" />
</template>

<script setup lang="ts">
import Toast from 'primevue/toast'
import Button from 'primevue/button'
import ConfirmDialog from 'primevue/confirmdialog'
import AppShell from '@/components/layout/AppShell.vue'
</script>

<style scoped>
.confirm-card {
  width: min(27rem, calc(100vw - 2rem));
  padding: 1.5rem;
  border: 1px solid rgba(54, 82, 68, .18);
  border-radius: 1.5rem;
  background: var(--cream);
  box-shadow: 0 28px 80px rgba(38, 48, 41, .24);
  text-align: center;
}

.confirm-icon {
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  margin: 0 auto 1rem;
  border-radius: 50%;
  color: var(--terracotta);
  background: rgba(182, 92, 58, .1);
}

.confirm-icon i { font-size: 1.35rem; }
.confirm-eyebrow { color: var(--terracotta); font-size: .68rem; font-weight: 800; letter-spacing: .13em; text-transform: uppercase; }
.confirm-title { margin: .35rem 0 .55rem; color: var(--ink); font-size: 1.65rem; }
.confirm-message { margin: 0 auto 1.35rem; color: rgba(38, 48, 41, .66); line-height: 1.55; }
.confirm-actions { display: flex; justify-content: center; gap: .6rem; }

@media (max-width: 420px) {
  .confirm-actions { flex-direction: column-reverse; }
  .confirm-actions :deep(.p-button) { width: 100%; justify-content: center; }
}
</style>
