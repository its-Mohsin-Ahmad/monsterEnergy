import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import { useDemoStore } from '../../store/demoStore'
import { DataTable } from '../../components/dashboard/DataTable'

export default function AdminProducts() {
  const products = useDemoStore((s) => s.products)
  const deleteProduct = useDemoStore((s) => s.deleteProduct)
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const filtered = products.filter((p) => (cat === 'all' || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase()))
  const rows = filtered.map((p) => ({
    thumb: <img src={p.image} alt={p.name} className="w-8 h-8 object-contain drink-can" />,
    name: p.name,
    sku: p.id.toUpperCase(),
    category: p.category,
    price: `$${p.price.toFixed(2)}`,
    stock: p.stock,
    status: p.status,
    actions: (
      <div className="flex gap-2 text-xs">
        <Link to={`/product/${p.slug}`} className="text-text-2 hover:text-neon">View</Link>
        <Link to={`/admin/products/${p.id}/edit`} className="text-neon hover:underline">Edit</Link>
        <button onClick={() => { if (confirm('Delete?')) deleteProduct(p.id) }} className="text-error">Delete</button>
      </div>
    ),
  }))
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl">Products</h1>
          <p className="text-xs text-muted">{products.length} total</p>
        </div>
        <Link to="/admin/products/new" className="bg-neon text-black font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2"><Plus size={14} /> Add Product</Link>
      </div>
      <div className="flex gap-3">
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 h-9 flex-1">
          <Search size={14} className="text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="bg-transparent outline-none text-sm flex-1" />
        </div>
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="bg-card border border-border rounded-lg px-3 text-sm">
          <option value="all">All</option>
          <option value="original">Original</option>
          <option value="ultra">Ultra</option>
          <option value="zero-sugar">Zero Sugar</option>
          <option value="juiced">Juiced</option>
          <option value="other">Other</option>
        </select>
      </div>
      <DataTable columns={[
        { key: 'thumb', label: '' }, { key: 'name', label: 'Name' }, { key: 'sku', label: 'SKU' },
        { key: 'category', label: 'Category' }, { key: 'price', label: 'Price' }, { key: 'stock', label: 'Stock' },
        { key: 'status', label: 'Status' }, { key: 'actions', label: 'Actions' },
      ]} rows={rows} />
    </div>
  )
}
