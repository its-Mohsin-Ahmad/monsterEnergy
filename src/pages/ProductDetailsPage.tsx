import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Heart, ShoppingCart, Minus, Plus } from 'lucide-react'
import { useDemoStore } from '../store/demoStore'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'
import { useUIStore } from '../store/uiStore'
import { formatCurrency } from '../utils/formatCurrency'
import { ProductGrid } from '../components/products/ProductGrid'

export default function ProductDetailsPage() {
  const { slug } = useParams()
  const products = useDemoStore((s) => s.products)
  const product = products.find((p) => p.slug === slug)
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('overview')
  const [imgIdx, setImgIdx] = useState(0)
  const add = useCartStore((s) => s.add)
  const wl = useWishlistStore()
  const showToast = useUIStore((s) => s.showToast)

  if (!product) return <div className="px-8 py-12">Product not found.</div>

  const gallery = product.gallery.length ? product.gallery : [product.image]
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="px-4 md:px-8 py-6 space-y-10">
      <div className="text-xs text-muted">Home / Shop / {product.category} / {product.name}</div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card border border-border rounded-card p-6 flex flex-col items-center relative overflow-hidden">
          {/* Volumetric Underglow */}
          <div className="pointer-events-none absolute w-56 h-56 rounded-full blur-3xl bg-neon/15 animate-neon-pulse -z-0" />
          
          <div className="relative z-10 py-6 flex items-end justify-center">
            <div className="can-grounded-wrapper">
              <img
                src={gallery[imgIdx]}
                alt={product.name}
                className="can-img h-72 object-contain"
              />
              {/* Elliptical ground shadow */}
              <div className="can-shadow" />
            </div>
          </div>
          <div className="flex gap-2 mt-4 relative z-10">
            {gallery.map((g, i) => (
              <button key={i} onClick={() => setImgIdx(i)} className={`w-16 h-16 rounded-lg border overflow-hidden hover:scale-105 transition-all ${i === imgIdx ? 'border-neon ring-1 ring-neon/50' : 'border-border'}`}>
                <img src={g} alt="" className="w-full h-full object-contain p-1" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs text-muted uppercase">{product.variant}</div>
          <h1 className="font-display text-3xl md:text-4xl mt-1">{product.name}</h1>
          <div className="text-neon font-display text-2xl mt-3">{formatCurrency(product.price)}</div>
          <div className={`text-sm mt-2 ${product.stock > 0 ? 'text-success' : 'text-error'}`}>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</div>
          <p className="text-text-2 mt-4">{product.description}</p>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 mt-6">
            <div className="inline-flex items-center border border-border rounded-lg overflow-hidden shrink-0">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-card active:scale-95 transition-all"><Minus size={14} /></button>
              <span className="px-4 py-2 text-sm font-semibold">{qty}</span>
              <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="px-3 py-2 hover:bg-card active:scale-95 transition-all"><Plus size={14} /></button>
            </div>
            <button disabled={product.stock <= 0} onClick={() => { add(product.id, qty); showToast(`${product.name} added`) }}
              className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-neon text-black font-semibold py-2.5 px-4 rounded-lg hover:bg-neon-bright shimmer-hover active:scale-95 transition disabled:opacity-40">
              <ShoppingCart size={16} /> Add to Cart
            </button>
            <button onClick={() => wl.toggle(product.id)} className="p-2.5 border border-border rounded-lg hover:border-neon text-text-2 hover:text-neon hover:scale-105 active:scale-95 transition shrink-0">
              <Heart size={18} fill={wl.has(product.id) ? '#B7FF00' : 'none'} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-card">
        <div className="flex border-b border-border overflow-x-auto scrollbar-none">
          {['overview', 'details', 'ingredients', 'shipping'].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 sm:px-5 py-3 text-sm capitalize whitespace-nowrap shrink-0 ${tab === t ? 'text-neon border-b-2 border-neon' : 'text-text-2 hover:text-text'}`}>{t}</button>
          ))}
        </div>
        <div className="p-6 text-sm text-text-2">
          {tab === 'overview' && <p>{product.description}</p>}
          {tab === 'details' && <p>Category: {product.category}. Variant: {product.variant}. SKU: {product.id.toUpperCase()}.</p>}
          {tab === 'ingredients' && <p>Ingredient and nutrition information is not available in this demo catalog.</p>}
          {tab === 'shipping' && <p>Demo shipping estimate: $4.99. Estimated delivery 3-5 business days (simulated).</p>}
        </div>
      </div>

      <section>
        <h2 className="font-display text-2xl mb-4">RELATED PRODUCTS</h2>
        <ProductGrid products={related} />
      </section>
    </div>
  )
}
