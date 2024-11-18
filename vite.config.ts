import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts(),
    Components({
      resolvers: [PrimeVueResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DarklordStudiosVue',
      fileName: (format) => `darklord-studios-vue.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'pinia', 'primevue'],
      output: {
        exports: "named",
        globals: {
          vue: 'Vue',
          pinia: 'Pinia',
          primevue: 'PrimeVue',
        },
      },
    },
  },
})
