import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Customer, Profile, Product } from '../types'
import { products as seedProducts } from '../data/products'
import { customers as seedCustomers } from '../data/customers'

interface DemoState {
  products: Product[]
  customers: Customer[]
  profile: Profile
  reset: () => void
  setProducts: (p: Product[]) => void
  addProduct: (p: Product) => void
  updateProduct: (id: string, patch: Partial<Product>) => void
  deleteProduct: (id: string) => void
  updateCustomer: (id: string, patch: Partial<Customer>) => void
  setProfile: (p: Partial<Profile>) => void
}

const defaultProfile: Profile = {
  name: 'Demo User',
  email: 'demo@example.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  phone: '',
  address: '',
  city: '',
  region: '',
  postal: '',
  country: '',
}

// Helper to guarantee valid live asset URLs for all products
function syncProductImages(products: Product[]): Product[] {
  return products.map((p) => {
    const seed = seedProducts.find((s) => s.id === p.id)
    if (seed) {
      return {
        ...p,
        image: seed.image,
        gallery: seed.gallery && seed.gallery.length ? seed.gallery : [seed.image],
      }
    }
    return p
  })
}

export const useDemoStore = create<DemoState>()(
  persist(
    (set) => ({
      products: seedProducts,
      customers: seedCustomers,
      profile: defaultProfile,
      reset: () => set({ products: seedProducts, customers: seedCustomers, profile: defaultProfile }),
      setProducts: (p) => set({ products: syncProductImages(p) }),
      addProduct: (p) => set((s) => ({ products: [p, ...s.products] })),
      updateProduct: (id, patch) => set((s) => ({ products: s.products.map((x) => x.id === id ? { ...x, ...patch } : x) })),
      deleteProduct: (id) => set((s) => ({ products: s.products.filter((x) => x.id !== id) })),
      updateCustomer: (id, patch) => set((s) => ({ customers: s.customers.map((x) => x.id === id ? { ...x, ...patch } : x) })),
      setProfile: (p) => set((s) => ({ profile: { ...s.profile, ...p } })),
    }),
    {
      name: 'monsterEnergy-store-v2',
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.products)) {
          state.products = syncProductImages(state.products)
        }
      },
    }
  )
)
