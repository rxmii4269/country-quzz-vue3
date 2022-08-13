import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({
    mode: 'development',
    base: '/',
    srcDir: 'src',
    filename: 'sw.ts',
    includeAssets: ['/favicon.ico'],
    strategies: "injectManifest",
    manifest: {
      name: "Country Quiz",
      short_name: "Cntry Quiz",
      theme_color: "#6066d0",
      start_url: "/",
      display: "standalone",
      background_color: "#6066d0",
      icons: [
        {
          src: "/icons/icon-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icons/icon-512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/icons/icon-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ]
    }
  })
  ]
})
