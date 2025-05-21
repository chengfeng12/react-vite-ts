import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import { viteMockServe } from 'vite-plugin-mock'
import Unocss from 'unocss/vite'
// import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    react(),
    viteMockServe({ mockPath: './src/mock' }),
    Unocss({
      presets: [
        presetAttributify({
          prefix: 'un-',
          prefixedOnly: true
        })
      ]
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['lodash', 'axios']
        }
      }
    }
  }
})
