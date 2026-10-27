import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '../types'
import { products } from '../data/products'

interface CartState {
  items: CartItem[]
  add: (productId: string, qty?: number) => void
  remove: (productId: string) => void
  setQty: (productId: string, qty: number) => void
  clear: () => void
  totalQty: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (productId, qty = 1) => {
        const p = products.find((x) => x.id === productId)
        if (!p || p.stock <= 0) return
        set((s) => {
          const existing = s.items.find((i) => i.productId === productId)
          if (existing) {
            return { items: s.items.map((i) => i.productId === productId ? { ...i, quantity: Math.min(i.quantity + qty, p.stock) } : i) }
          }
          return { items: [...s.items, { productId, quantity: Math.min(qty, p.stock) }] }
        })
      },
      remove: (productId) => set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
      setQty: (productId, qty) => set((s) => {
        const p = products.find((x) => x.id === productId)
        const max = p ? p.stock : 99
        const q = Math.max(1, Math.min(qty, max))
        return { items: s.items.map((i) => i.productId === productId ? { ...i, quantity: q } : i) }
      }),
      clear: () => set({ items: [] }),
      totalQty: () => get().items.reduce((a, b) => a + b.quantity, 0),
    }),
    { name: 'monster-cart' }
  )
)
