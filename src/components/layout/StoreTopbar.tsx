import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react'
import { useUIStore } from '../../store/uiStore'
import { useCartStore } from '../../store/cartStore'
import { useDemoStore } from '../../store/demoStore'
import { filterProducts } from '../../utils/filterProducts'
import logoImg from '../../images/logo/Monster_Energy_ragged_M_text_logo-removebg-preview.png'

export function StoreTopbar() {
  const navigate = useNavigate()
  const openMobile = useUIStore((s) => s.openMobileNav)
  const openCart = useUIStore((s) => s.openCart)
  const cartCount = useCartStore((s) => s.totalQty())
  const products = useDemoStore((s) => s.products)

  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const searchResults = query.trim()
    ? filterProducts(products, { search: query }).slice(0, 6)
    : []

  // Focus input on search modal open
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
    }
  }, [searchOpen])

  // ESC shortcut to close search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false)
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchOpen])

  return (
    <>
      {/* ── TOP UTILITY BAR (FLOATING / MINIMAL) ──────────────────── */}
      <header className="sticky top-0 z-40 w-full pointer-events-none">
        <div className="w-full flex items-center justify-between px-4 md:px-8 py-4">
          {/* Mobile-only menu toggle & brand */}
          <div className="md:hidden flex items-center gap-3 pointer-events-auto bg-[#080c08]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
            <button
              onClick={openMobile}
              aria-label="Open mobile menu"
              className="text-white/80 hover:text-white transition p-1"
            >
              <Menu size={22} />
            </button>
            <img src={logoImg} alt="Monster Energy" className="w-6 h-6 object-contain" />
          </div>

          {/* Desktop spacer */}
          <div className="hidden md:block" />

          {/* Top-Right Utility Icons matching Reference Image */}
          <div className="flex items-center gap-3 pointer-events-auto ml-auto">
            {/* Search Icon Button */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              title="Search drinks (Ctrl+K)"
              className="group relative w-11 h-11 rounded-full flex items-center justify-center bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/15 hover:border-[#B7FF00] text-white/90 hover:text-white hover:shadow-[0_0_18px_rgba(183,255,0,0.5)] transition-all duration-300"
            >
              <Search size={19} className="stroke-[1.8] group-hover:scale-110 transition-transform" />
            </button>

            {/* Shopping Bag Icon Button with Neon Green Badge */}
            <button
              onClick={openCart}
              aria-label="Shopping bag"
              title="View shopping bag"
              className="group relative w-11 h-11 rounded-full flex items-center justify-center bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/15 hover:border-[#B7FF00] text-white/90 hover:text-white hover:shadow-[0_0_18px_rgba(183,255,0,0.5)] transition-all duration-300"
            >
              <ShoppingBag size={19} className="stroke-[1.8] group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B7FF00] text-black text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-[0_0_10px_#B7FF00] animate-pulse">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── SEARCH OVERLAY MODAL ─────────────────────────────────── */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setSearchOpen(false)}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-2xl bg-[#0a0f0a] border border-[#1e2e1e] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1c2e1c]">
              <Search size={22} className="text-[#B7FF00] flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search flavors, zero sugar, coffee, tea, punch..."
                className="w-full bg-transparent text-white placeholder-white/40 text-base md:text-lg outline-none font-medium"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="text-white/40 hover:text-white transition p-1"
                >
                  <X size={18} />
                </button>
              )}
              <button
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="text-xs text-white/50 hover:text-white px-2 py-1 rounded border border-white/20 transition"
              >
                ESC
              </button>
            </div>

            {/* Results / Suggestions */}
            <div className="max-h-[60vh] overflow-y-auto p-3">
              {query.trim() === '' ? (
                <div className="p-6 text-center text-white/50 text-sm">
                  <div className="text-[#B7FF00] font-semibold text-xs tracking-widest uppercase mb-2">
                    Popular Quick Searches
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {['Original', 'Ultra White', 'Ultra Blue', 'Dragon Tea', 'Mango Loco', 'Java Coffee'].map(
                      (tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#B7FF00]/10 hover:text-[#B7FF00] border border-white/10 text-xs transition"
                        >
                          {tag}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-1">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        navigate(`/product/${product.slug}`)
                        setSearchOpen(false)
                      }}
                      className="group w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition text-left"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(183,255,0,0.3)] group-hover:scale-110 transition-transform"
                        />
                        <div>
                          <div className="text-white font-medium group-hover:text-[#B7FF00] transition">
                            {product.name}
                          </div>
                          <div className="text-xs text-white/50">{product.variant} • {product.category.toUpperCase()}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-[#B7FF00] font-bold text-sm">
                          ${product.price.toFixed(2)}
                        </div>
                        <ArrowRight size={16} className="text-white/40 group-hover:text-[#B7FF00] group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-white/50 text-sm">
                  No Monster energy drinks matched &ldquo;{query}&rdquo;.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
