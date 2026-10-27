import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'
import { useUIStore } from '../../store/uiStore'
import { useDemoStore } from '../../store/demoStore'
import { formatCurrency } from '../../utils/formatCurrency'
import type { Product } from '../../types'

export function ProductCard({ product }: { product: Product }) {
  const add = useCartStore((s) => s.add)
  const wl = useWishlistStore()
  const showToast = useUIStore((s) => s.showToast)
  const wished = wl.has(product.id)
  const products = useDemoStore((s) => s.products)
  const p = products.find((x) => x.id === product.id) || product

  return (
    <div className="h-[390px] w-full max-w-full overflow-hidden bg-card border border-border rounded-card p-3 sm:p-4 flex flex-col justify-between group hover:border-neon/60 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(183,255,0,0.16)] transition-all duration-300">
      {/* ── UNIFORM CAN IMAGE CONTAINER ──────────────────────── */}
      <div className="relative h-44 w-full flex items-center justify-center rounded-lg bg-gradient-to-b from-white/[0.02] to-transparent overflow-visible">
        <button
          onClick={() => wl.toggle(product.id)}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-1 right-1 z-10 p-1.5 rounded-full text-text-2 hover:text-neon hover:bg-black/40 hover:scale-110 active:scale-95 transition-all"
        >
          <Heart size={18} fill={wished ? '#B7FF00' : 'none'} className={wished ? 'text-neon' : ''} />
        </button>

        {/* Standardized equal-sized can image across all cards with hover lift */}
        <Link to={`/product/${p.slug}`} className="flex items-center justify-center w-full h-full group/can">
          <img
            src={p.image}
            alt={p.name}
            className="drink-can h-36 max-h-36 w-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.65)] select-none transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-6"
          />
        </Link>
      </div>

      {/* ── CARD BODY (STABILIZED HEIGHT) ────────────────────── */}
      <div className="mt-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-semibold text-muted uppercase tracking-wider">
            {p.variant || '500ml Can'} • {p.category.toUpperCase()}
          </div>
          <div className="h-10 flex items-center mt-1">
            <Link
              to={`/product/${p.slug}`}
              className="font-semibold text-sm leading-snug text-white hover:text-neon line-clamp-2 transition-colors"
              title={p.name}
            >
              {p.name}
            </Link>
          </div>
        </div>

        {/* Price & Stock */}
        <div className="mt-2 flex items-center justify-between">
          <div className="font-display text-xl text-neon font-bold">
            {formatCurrency(p.price)}
          </div>
          <span className={`text-[11px] font-medium ${p.stock > 0 ? 'text-success' : 'text-error'}`}>
            {p.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>

      {/* ── ADD TO CART BUTTON (ALIGNED BOTTOM) ──────────────── */}
      <button
        disabled={p.stock <= 0}
        onClick={() => {
          add(p.id)
          showToast(`${p.name} added to cart`)
        }}
        className="mt-3 w-full flex items-center justify-center gap-2 bg-neon/10 border border-neon/70 text-neon hover:bg-neon hover:text-black rounded-lg py-2.5 text-xs uppercase font-bold tracking-wider transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(183,255,0,0.1)] hover:shadow-[0_0_15px_rgba(183,255,0,0.4)] shimmer-hover active:scale-95"
      >
        <ShoppingCart size={14} /> Add to Cart
      </button>
    </div>
  )
}
