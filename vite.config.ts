import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative base so the built bundle runs from any path -
// opened locally, served on the training-room LAN, or deployed to a public URL.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // expose on the LAN so participants can join from their phones
  },
})
