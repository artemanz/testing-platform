import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from "path"

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL,
        changeOrigin: true
      }
    }
  },
  build: {
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
})
