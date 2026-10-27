import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistState {
  ids: string[]
  toggle: (id: string) => void
  has: (id: string) => boolean
  remove: (id: string) => void
  clear: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => set((s) => s.ids.includes(id) ? { ids: s.ids.filter((x) => x !== id) } : { ids: [...s.ids, id] }),
      has: (id) => get().ids.includes(id),
      remove: (id) => set((s) => ({ ids: s.ids.filter((x) => x !== id) })),
      clear: () => set({ ids: [] }),
    }),
    { name: 'monster-wishlist' }
  )
)
