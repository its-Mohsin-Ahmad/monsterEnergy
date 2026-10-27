import { useState, useMemo, useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ShopBannerCarousel } from '../components/carousel/ShopBannerCarousel'
import { ProductGrid } from '../components/products/ProductGrid'
import { EmptyState } from '../components/ui/EmptyState'
import { SearchX, X, Filter, ChevronDown, Check, ArrowUpDown, Sparkles } from 'lucide-react'
import { useDemoStore } from '../store/demoStore'
import { filterProducts } from '../utils/filterProducts'

const CATS = [
  { slug: 'all', label: 'All Drinks' },
  { slug: 'original', label: 'Original' },
  { slug: 'ultra', label: 'Ultra' },
  { slug: 'zero-sugar', label: 'Zero Sugar' },
  { slug: 'juiced', label: 'Juiced' },
  { slug: 'java', label: 'Java / Coffee' },
  { slug: 'tea', label: 'Dragon Tea' },
  { slug: 'protein', label: 'Protein' },
  { slug: 'other', label: 'Other' },
]

const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'newest', label: 'Newest' },
]

export default function ShopPage() {
  const [params, setParams] = useSearchParams()
  const products = useDemoStore((s) => s.products)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('featured')
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const categoryDropdownRef = useRef<HTMLDivElement>(null)

  const category = params.get('category') || 'all'

  // Precompute product counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length }
    for (const p of products) {
      counts[p.category] = (counts[p.category] || 0) + 1
    }
    return counts
  }, [products])

  // Click outside and escape key listener for category dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target as Node)) {
        setCategoryDropdownOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCategoryDropdownOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const filtered = useMemo(
    () => filterProducts(products, { category, search, sort }),
    [products, category, search, sort],
  )

  const setCategory = (c: string) => {
    if (c === 'all') params.delete('category')
    else params.set('category', c)
    setParams(params)
  }

  const clearFilters = () => {
    setSearch('')
    setCategory('all')
  }

  const currentCategoryObj = CATS.find((c) => c.slug === category) || CATS[0]
  const hasFilters = search.trim() !== '' || category !== 'all'

  return (
    <div className="shop-page w-full max-w-full overflow-x-hidden">
      {/* ── Section: Official banner carousel at Top ───────── */}
      <section className="px-3 sm:px-6 md:px-8 pt-4 pb-4 sm:pb-6">
        <ShopBannerCarousel />
      </section>

      {/* ── Minimal Breadcrumb / Status Bar ────────────────── */}
      <div className="px-3 sm:px-6 md:px-8 pb-3 sm:pb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs text-muted tracking-wider uppercase font-mono flex items-center gap-2">
          <span>Home / Shop</span>
          <span className="text-white/20">•</span>
          <span className="text-neon font-semibold">
            {filtered.length} {filtered.length === 1 ? 'Drink' : 'Drinks'}
          </span>
        </div>
        {category !== 'all' && (
          <span className="text-xs text-text-2 bg-card border border-border px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <Sparkles size={12} className="text-neon" />
            Showing: <strong className="text-neon">{currentCategoryObj.label}</strong>
          </span>
        )}
      </div>

      {/* ── Section: Product discovery toolbar & filters ──────────────── */}
      <section className="px-3 sm:px-6 md:px-8 pb-6">
        {/* Main Controls Row: Search + Category Dropdown + Sort */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search bar */}
          <div className="flex items-center gap-2 bg-[#0D130F] border border-border rounded-lg px-3 h-10 focus-within:border-neon focus-within:shadow-[0_0_0_2px_rgba(183,255,0,0.15)] transition flex-1 min-w-[200px]">
            <SearchX size={15} className="text-muted flex-shrink-0" />
            <input
              id="shop-search"
              aria-label="Search drinks"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search drinks, flavors, series..."
              className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted text-white"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-muted hover:text-neon transition p-1"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter Dropdowns Container (Category + Sort) */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            {/* Category Dropdown */}
            <div className="relative flex-1 md:flex-initial min-w-[145px] sm:min-w-[190px]" ref={categoryDropdownRef}>
              <button
                type="button"
                id="category-filter-dropdown-btn"
                aria-haspopup="listbox"
                aria-expanded={categoryDropdownOpen}
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className={`w-full flex items-center justify-between gap-2 bg-[#0D130F] border rounded-lg px-3 sm:px-3.5 h-10 text-sm transition font-medium select-none cursor-pointer ${
                  category !== 'all'
                    ? 'border-neon text-neon shadow-[0_0_12px_rgba(183,255,0,0.18)]'
                    : 'border-border text-text hover:border-neon/60'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Filter size={14} className={category !== 'all' ? 'text-neon flex-shrink-0' : 'text-muted flex-shrink-0'} />
                  <span className="truncate">
                    {category === 'all' ? 'Category' : currentCategoryObj.label}
                  </span>
                  {category !== 'all' && (
                    <span className="text-[10px] bg-neon/20 text-neon px-1.5 py-0.5 rounded font-mono hidden xs:inline">
                      {categoryCounts[category] ?? 0}
                    </span>
                  )}
                </div>
                <ChevronDown
                  size={14}
                  className={`text-muted transition-transform duration-200 flex-shrink-0 ${
                    categoryDropdownOpen ? 'rotate-180 text-neon' : ''
                  }`}
                />
              </button>

              {/* Category Dropdown Menu */}
              {categoryDropdownOpen && (
                <div
                  role="listbox"
                  aria-label="Filter drinks by category"
                  className="absolute left-0 top-full mt-1.5 w-64 max-h-80 overflow-y-auto scrollbar-thin bg-[#090D0A] border border-[#1C2A20] rounded-xl shadow-[0_16px_36px_rgba(0,0,0,0.9)] py-1.5 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-3 py-1.5 text-[11px] font-mono tracking-wider uppercase text-muted border-b border-border/50 flex items-center justify-between">
                    <span>Category Filter</span>
                    <span className="text-neon">{products.length} Drinks</span>
                  </div>
                  {CATS.map((c) => {
                    const isSelected = category === c.slug
                    const count = categoryCounts[c.slug] ?? 0
                    return (
                      <button
                        key={c.slug}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          setCategory(c.slug)
                          setCategoryDropdownOpen(false)
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left transition hover:bg-neon/10 cursor-pointer ${
                          isSelected
                            ? 'bg-neon/15 text-neon font-semibold'
                            : 'text-text-2 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-2 h-2 rounded-full transition-all ${
                              isSelected
                                ? 'bg-neon shadow-[0_0_8px_#B7FF00]'
                                : 'bg-white/10'
                            }`}
                          />
                          <span>{c.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                              isSelected
                                ? 'bg-neon text-black font-bold'
                                : 'bg-white/5 text-muted'
                            }`}
                          >
                            {count}
                          </span>
                          {isSelected && <Check size={14} className="text-neon" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex-1 md:flex-initial min-w-[130px] sm:min-w-[170px]">
              <div className="relative flex items-center">
                <ArrowUpDown size={14} className="absolute left-3 text-muted pointer-events-none" />
                <select
                  id="shop-sort"
                  aria-label="Sort products"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full bg-[#0D130F] border border-border rounded-lg pl-8 pr-8 h-10 text-sm focus:border-neon outline-none text-text hover:border-neon/60 cursor-pointer appearance-none transition"
                >
                  {SORTS.map((s) => (
                    <option key={s.value} value={s.value} className="bg-[#090D0A] text-white">
                      {s.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 text-muted pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Quick-Select Category Pills (hidden on mobile, provides 1-click filtering on desktop) */}
        <div className="hidden lg:flex items-center gap-2 overflow-x-auto scrollbar-thin pt-3 pb-1">
          {CATS.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategory(c.slug)}
              className={`shop-pill ${category === c.slug ? 'shop-pill--active' : 'shop-pill--default'}`}
            >
              <span>{c.label}</span>
              <span className="ml-1.5 text-xs opacity-70">
                ({categoryCounts[c.slug] ?? 0})
              </span>
            </button>
          ))}
        </div>

        {/* Active Filter Chips & Clear All */}
        {hasFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-3 text-xs">
            <span className="text-muted font-medium">Active:</span>
            {category !== 'all' && (
              <span className="inline-flex items-center gap-1.5 bg-neon/15 text-neon border border-neon/30 px-2.5 py-1 rounded-full font-medium">
                <span>{currentCategoryObj.label}</span>
                <button
                  onClick={() => setCategory('all')}
                  className="hover:text-white transition cursor-pointer"
                  aria-label="Remove category filter"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {search.trim() && (
              <span className="inline-flex items-center gap-1.5 bg-card border border-border px-2.5 py-1 rounded-full text-text-2">
                <span>Search: "{search}"</span>
                <button
                  onClick={() => setSearch('')}
                  className="hover:text-neon transition cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-xs text-neon hover:underline font-semibold ml-auto flex items-center gap-1 cursor-pointer"
            >
              <X size={12} /> Clear All
            </button>
          </div>
        )}
      </section>

      {/* ── Section: Product grid ────────────────────────────── */}
      <section className="px-3 sm:px-6 md:px-8 pb-20">
        {filtered.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="NO DRINKS FOUND"
            description="Try adjusting your search or filters to discover more products."
            action={
              <button
                onClick={clearFilters}
                className="bg-neon text-black font-semibold px-6 py-2.5 rounded-lg hover:bg-neon-bright transition shadow-glow"
              >
                Clear Filters
              </button>
            }
          />
        ) : (
          <ProductGrid products={filtered} />
        )}
      </section>
    </div>
  )
}
