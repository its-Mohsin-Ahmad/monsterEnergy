import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // base removed for Vercel root deployment
  // GitHub Pages deployment uses gh-pages which handles base path separately
})
