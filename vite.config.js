import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: false, // don't ship source maps publicly
    reportCompressedSize: true,
  },
  server: { port: 5173, open: false },
})
