import { useState } from 'react'
import {
  Plus,
  Search,
  Filter,
  Star,
  Edit2,
  Archive,
  Trash2,
  CheckCircle2,
  X,
  Package,
} from 'lucide-react'
import { useAdminStore } from '../../store/adminStore'
import { formatCurrency } from '../../utils/formatCurrency'
import type { Product } from '../../types'

export default function AdminProductsPage() {
  const products = useAdminStore((s) => s.products)
  const addProduct = useAdminStore((s) => s.addProduct)
  const updateProduct = useAdminStore((s) => s.updateProduct)
  const archiveProduct = useAdminStore((s) => s.archiveProduct)
  const deleteProduct = useAdminStore((s) => s.deleteProduct)

  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sku: '',
    category: 'original',
    price: 2.99,
    costPrice: 1.35,
    stock: 50,
    minStock: 15,
    description: '',
    variant: '500ml Can',
    isFeatured: false,
    status: 'published' as Product['status'],
  })

  const openAddModal = () => {
    setEditingProduct(null)
    setFormData({
      name: '',
      slug: '',
      sku: `MNST-${Date.now().toString().slice(-4)}`,
      category: 'original',
      price: 2.99,
      costPrice: 1.35,
      stock: 50,
      minStock: 15,
      description: 'Iconic Monster Energy flavor crafted for maximum sustained energy.',
      variant: '500ml Can',
      isFeatured: false,
      status: 'published',
    })
    setModalOpen(true)
  }

  const openEditModal = (p: Product) => {
    setEditingProduct(p)
    setFormData({
      name: p.name,
      slug: p.slug,
      sku: p.sku || '',
      category: p.category,
      price: p.price,
      costPrice: p.costPrice || +(p.price * 0.45).toFixed(2),
      stock: p.stock,
      minStock: p.minStock || 15,
      description: p.description,
      variant: p.variant,
      isFeatured: !!p.isFeatured,
      status: p.status,
    })
    setModalOpen(true)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) return

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...formData,
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      })
      get().logAction('Edit Product', 'Product', `Edited product: ${editingProduct.name}`)
    } else {
      addProduct({
        ...formData,
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        image: products[0]?.image || '',
        gallery: [products[0]?.image || ''],
      })
      get().logAction('Create Product', 'Product', `Created new product: ${formData.name}`)
    }
    setModalOpen(false)
  }

  const categories = ['all', 'original', 'ultra', 'tea', 'juiced', 'coffee', 'other']

  const filtered = products.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(query.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus
    return matchesQuery && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* ── HEADER ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
            Products & Categories
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-1">
            Manage your public Monster Energy catalog, pricing, SKU details, and availability.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[#B7FF00] hover:bg-[#c6ff24] text-black font-bold uppercase tracking-wider text-xs px-4 py-2.5 rounded-xl transition shadow-[0_0_15px_rgba(183,255,0,0.3)] active:scale-95 w-fit"
        >
          <Plus size={16} />
          <span>Add New Drink</span>
        </button>
      </div>

      {/* ── FILTERS & SEARCH BAR ──────────────────────────────── */}
      <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by flavor name or SKU..."
            className="w-full bg-[#0D140E] border border-[#1C2C1D] focus:border-[#B7FF00] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 outline-none transition"
          />
        </div>

        {/* Filter dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <Filter size={13} />
            <span>Category:</span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#0D140E] border border-[#1C2C1D] text-white/80 rounded-xl px-3 py-1.5 text-xs outline-none capitalize"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-[#0B100C]">
                {c === 'all' ? 'All Categories' : c.toUpperCase()}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#0D140E] border border-[#1C2C1D] text-white/80 rounded-xl px-3 py-1.5 text-xs outline-none"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* ── PRODUCTS TABLE ────────────────────────────────────── */}
      <div className="bg-[#0B100C] border border-[#182619] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-[11px] bg-white/[0.01]">
                <th className="py-3 px-4 font-semibold">Product</th>
                <th className="py-3 px-4 font-semibold">SKU</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Price</th>
                <th className="py-3 px-4 font-semibold">Cost</th>
                <th className="py-3 px-4 font-semibold">Physical Stock</th>
                <th className="py-3 px-4 font-semibold">Available</th>
                <th className="py-3 px-4 font-semibold">Featured</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((p) => {
                const isOutOfStock = p.stock <= 0
                const isLowStock = !isOutOfStock && p.stock <= (p.minStock || 15)

                return (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition">
                    {/* Product Name & Can Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center p-1 shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-white truncate max-w-[180px]">{p.name}</div>
                          <div className="text-[10px] text-white/40">{p.variant || '500ml Can'}</div>
                        </div>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="py-3 px-4 font-mono text-white/60 text-[11px]">{p.sku || '—'}</td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="capitalize px-2 py-0.5 rounded-md bg-white/5 text-white/70 text-[11px]">
                        {p.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-bold text-[#B7FF00]">{formatCurrency(p.price)}</td>

                    {/* Cost Price */}
                    <td className="py-3 px-4 text-white/50">{formatCurrency(p.costPrice || p.price * 0.45)}</td>

                    {/* Physical Stock */}
                    <td className="py-3 px-4">
                      <span className="font-semibold text-white">{p.stock}</span>
                      <span className="text-[10px] text-white/40 ml-1">units</span>
                    </td>

                    {/* Available Stock */}
                    <td className="py-3 px-4">
                      <span
                        className={`font-semibold px-2 py-0.5 rounded-full text-[10px] ${
                          isOutOfStock
                            ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                            : isLowStock
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : 'bg-emerald-500/15 text-emerald-400'
                        }`}
                      >
                        {p.availableStock !== undefined ? p.availableStock : p.stock} available
                      </span>
                    </td>

                    {/* Featured toggle */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => updateProduct(p.id, { isFeatured: !p.isFeatured })}
                        className={`p-1.5 rounded-lg transition ${
                          p.isFeatured ? 'text-[#B7FF00] bg-[#B7FF00]/10' : 'text-white/20 hover:text-white/60'
                        }`}
                        title={p.isFeatured ? 'Featured on storefront' : 'Not featured'}
                      >
                        <Star size={16} fill={p.isFeatured ? '#B7FF00' : 'none'} />
                      </button>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                          p.status === 'published'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : p.status === 'draft'
                            ? 'bg-yellow-500/15 text-yellow-400'
                            : 'bg-white/10 text-white/50'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition"
                          title="Edit Details"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => archiveProduct(p.id)}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-amber-400 transition"
                          title="Archive Product"
                        >
                          <Archive size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                              deleteProduct(p.id)
                            }
                          }}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition"
                          title="Delete Product"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="p-12 text-center text-white/40 text-xs">
            <Package size={32} className="mx-auto mb-2 text-white/20" />
            No products matched your search or filters.
          </div>
        )}
      </div>

      {/* ── CREATE / EDIT MODAL ───────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-[#090E0A] border border-[#1E2E1F] rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.95)] p-6 z-10 max-h-[90vh] overflow-y-auto scrollbar-thin">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h2 className="font-display text-xl text-white">
                {editingProduct ? 'EDIT PRODUCT' : 'ADD NEW MONSTER DRINK'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-white/40 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block text-white/70 font-semibold mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Monster Energy Original"
                  className="w-full bg-[#0D140E] border border-[#1C2C1D] focus:border-[#B7FF00] rounded-xl px-3.5 py-2.5 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 font-semibold mb-1">SKU</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full bg-[#0D140E] border border-[#1C2C1D] focus:border-[#B7FF00] rounded-xl px-3.5 py-2.5 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#0D140E] border border-[#1C2C1D] text-white rounded-xl px-3.5 py-2.5 outline-none capitalize"
                  >
                    {categories.filter((c) => c !== 'all').map((c) => (
                      <option key={c} value={c}>
                        {c.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Selling Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#0D140E] border border-[#1C2C1D] focus:border-[#B7FF00] rounded-xl px-3.5 py-2.5 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Cost Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.costPrice}
                    onChange={(e) => setFormData({ ...formData, costPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#0D140E] border border-[#1C2C1D] focus:border-[#B7FF00] rounded-xl px-3.5 py-2.5 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Physical Stock Units</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#0D140E] border border-[#1C2C1D] focus:border-[#B7FF00] rounded-xl px-3.5 py-2.5 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Low-Stock Alert Level</label>
                  <input
                    type="number"
                    value={formData.minStock}
                    onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#0D140E] border border-[#1C2C1D] focus:border-[#B7FF00] rounded-xl px-3.5 py-2.5 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#0D140E] border border-[#1C2C1D] focus:border-[#B7FF00] rounded-xl px-3.5 py-2 text-white outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-white/80">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="accent-[#B7FF00] w-4 h-4"
                  />
                  <span>Feature on Storefront Homepage</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/20 text-white/70 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#B7FF00] text-black font-bold uppercase tracking-wider transition shadow-[0_0_15px_rgba(183,255,0,0.3)] hover:bg-[#c6ff24]"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
