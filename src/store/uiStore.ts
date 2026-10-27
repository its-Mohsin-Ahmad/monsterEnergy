import { create } from 'zustand'

interface UIState {
  cartOpen: boolean
  mobileNavOpen: boolean
  sidebarCollapsed: boolean
  searchQuery: string
  toast: { message: string; type: 'success' | 'error' | 'info' } | null
  hasAppLoaded: boolean
  setAppLoaded: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  openMobileNav: () => void
  closeMobileNav: () => void
  toggleSidebar: () => void
  setSearch: (q: string) => void
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void
  clearToast: () => void
}

export const useUIStore = create<UIState>((set) => ({
  cartOpen: false,
  mobileNavOpen: false,
  sidebarCollapsed: false,
  searchQuery: '',
  toast: null,
  hasAppLoaded: false,
  setAppLoaded: () => set({ hasAppLoaded: true }),
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  toggleCart: () => set((s) => ({ cartOpen: !s.cartOpen })),
  openMobileNav: () => set({ mobileNavOpen: true }),
  closeMobileNav: () => set({ mobileNavOpen: false }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSearch: (q) => set({ searchQuery: q }),
  showToast: (message, type = 'success') => set({ toast: { message, type } }),
  clearToast: () => set({ toast: null }),
}))
