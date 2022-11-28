import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      include: resolve(
        dirname(fileURLToPath(import.meta.url)),
        './src/locales/**'
      ),
    }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      includeAssets: [
        'favicon.ico',
        'icons/apple-touch-icon.png',
        'icons/safari-pinned-tab.svg',
        'icons/favicon-32x32.png',
        'icons/favicon-16x16.png',
      ],
      manifest: {
        name: 'Werewolf',
        description:
          'Play a custom version of the werewolf game without the need of cards',
        short_name: 'Werewolf',
        icons: [
          {
            src: '/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/android-chrome-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/icons/android-chrome-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/icons/safari-pinned-tab.svg',
            sizes: 'any',
            type: 'image/svg',
            purpose: 'monochrome',
          },
        ],
        background_color: '#fff',
        display: 'standalone',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(dirname(fileURLToPath(import.meta.url)), './src'),
    },
  },
})
