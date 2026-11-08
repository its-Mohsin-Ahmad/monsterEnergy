import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel deploys to root domain (/), while GitHub Pages deploys under repository subpath (/monsterEnergy/)
const isVercel = process.env.VERCEL === '1' || Boolean(process.env.VERCEL_ENV) || Boolean(process.env.VERCEL_URL)

export default defineConfig({
  plugins: [react()],
  base: isVercel ? '/' : (process.env.VITE_BASE || '/monsterEnergy/'),
})
