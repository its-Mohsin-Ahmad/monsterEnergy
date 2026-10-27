import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDemoStore } from '../../store/demoStore'
import { useUIStore } from '../../store/uiStore'

export default function AdminProductEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const products = useDemoStore((s) => s.products)
  const addProduct = useDemoStore((s) => s.addProduct)
  const updateProduct = useDemoStore((s) => s.updateProduct)
  const showToast = useUIStore((s) => s.showToast)
  const existing = id ? products.find((p) => p.id === id) : null
  const [form, setForm] = useState<any>(existing || {
    name: '', slug: '', description: '', sku: '', price: 0, category: 'original', variant: '500ml Can',
    image: 'https://images.unsplash.com/photo-1622543925917-763a32d9c4e0?auto=format&fit=crop&w=600&q=80', stock: 0, status: 'draft',
  })
  useEffect(() => { if (existing) setForm(existing) }, [existing])

  const save = (status: string) => {
    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, '-')
    const payload = { ...form, slug, status: status as any, gallery: form.gallery || [], id: existing ? existing.id : 'p' + Date.now() } as any
    if (existing) updateProduct(existing.id, payload)
    else addProduct(payload)
    showToast('Product saved (demo)')
    navigate('/admin/products')
  }

  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="font-display text-2xl">{existing ? 'Edit Product' : 'New Product'}</h1>
      <div className="bg-card border border-border rounded-card p-6 space-y-4">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none" />
        <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Slug" className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none" />
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={3} className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none" />
        <input value={form.sku || form.id} onChange={(e) => setForm({ ...form, sku: e.target.value })} placeholder="SKU" className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none" />
        <div className="grid grid-cols-2 gap-2">
          <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })} placeholder="Price" className="bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none" />
          <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) })} placeholder="Stock" className="bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none" />
        </div>
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none">
          <option value="original">Original</option>
          <option value="ultra">Ultra</option>
          <option value="zero-sugar">Zero Sugar</option>
          <option value="juiced">Juiced</option>
          <option value="other">Other</option>
        </select>
        <input value={form.variant} onChange={(e) => setForm({ ...form, variant: e.target.value })} placeholder="Variant" className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none" />
        <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="Image URL" className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none" />
        <img src={form.image} alt="preview" className="w-24 h-24 object-contain drink-can" />
        <div className="flex gap-3">
          <button onClick={() => save('draft')} className="border border-border px-6 py-2.5 rounded-lg">Save Draft</button>
          <button onClick={() => save('published')} className="bg-neon text-black font-semibold px-6 py-2.5 rounded-lg">Publish</button>
          <button onClick={() => navigate('/admin/products')} className="text-text-2 px-6 py-2.5">Cancel</button>
        </div>
      </div>
    </div>
  )
}
