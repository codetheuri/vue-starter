import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: true, // Enable the server to be accessed from the network
    proxy: {
      // Proxy configuration for the first API
      '/v1': {
        target: 'http://localhost/projects1/libraryweb/',
        changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''), 
        // rewrite: (path) => path.replace(/^\/api/, '/   v1'),
      },
    },
    cors: false, // Ensure CORS is disabled if necessary
  },
})
