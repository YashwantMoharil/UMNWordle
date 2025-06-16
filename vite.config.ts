import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // 👈 Crucial for correct relative paths on Vercel
  build: {
    outDir: 'dist', // 👈 Ensures Vercel picks the right folder
  },
  plugins: [react()],
})
