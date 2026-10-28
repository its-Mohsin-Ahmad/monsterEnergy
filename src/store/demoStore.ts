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

export const useDemoStore = create<DemoState>()(
  persist(
    (set) => ({
      products: seedProducts,
      customers: seedCustomers,
      profile: defaultProfile,
      reset: () => set({ products: seedProducts, customers: seedCustomers, profile: defaultProfile }),
      setProducts: (p) => set({ products: p }),
      addProduct: (p) => set((s) => ({ products: [p, ...s.products] })),
      updateProduct: (id, patch) => set((s) => ({ products: s.products.map((x) => x.id === id ? { ...x, ...patch } : x) })),
      deleteProduct: (id) => set((s) => ({ products: s.products.filter((x) => x.id !== id) })),
      updateCustomer: (id, patch) => set((s) => ({ customers: s.customers.map((x) => x.id === id ? { ...x, ...patch } : x) })),
      setProfile: (p) => set((s) => ({ profile: { ...s.profile, ...p } })),
    }),
    { name: 'monster-demo' }
  )
)
