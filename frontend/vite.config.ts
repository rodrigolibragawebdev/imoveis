import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, fileURLToPath(new URL('..', import.meta.url)), '')

  return {
    base: env.VITE_APP_BASE_PATH ?? '/',
    envDir: '..',
    plugins: [vue()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
      extensions: ['.ts', '.mts', '.mjs', '.js', '.json'],
    },
    server: {
      host: '0.0.0.0',
      port: Number(env.FRONTEND_PORT ?? 5176),
      strictPort: true,
    },
  }
})
