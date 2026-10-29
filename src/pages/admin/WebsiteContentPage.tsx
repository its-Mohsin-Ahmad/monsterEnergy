import { useState } from 'react'
import { Monitor, Star, Eye, CheckCircle2, Sliders, Image as ImageIcon } from 'lucide-react'
import { heroSlides } from '../../data/heroSlides'
import { useAdminStore } from '../../store/adminStore'

export default function AdminWebsiteContentPage() {
  const products = useAdminStore((s) => s.products)
  const updateProduct = useAdminStore((s) => s.updateProduct)
  const [slides, setSlides] = useState(heroSlides)
  const [activeSlideIdx, setActiveSlideIdx] = useState(0)

  const toggleFeatured = (id: string, current: boolean) => {
    updateProduct(id, { isFeatured: !current })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
          Website Content Management
        </h1>
        <p className="text-xs sm:text-sm text-white/50 mt-1">
          Control homepage hero carousel slides, featured product carousels, and storefront marketing accents.
        </p>
      </div>

      {/* ── HOMEPAGE HERO CAROUSEL MANAGER ──────────────────────── */}
      <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h2 className="font-display text-xl text-white">HOMEPAGE HERO CAROUSEL</h2>
            <div className="text-xs text-white/50">Curated high-impact Monster Energy slides</div>
          </div>
          <span className="text-xs text-[#B7FF00] font-semibold bg-[#B7FF00]/10 px-3 py-1 rounded-full">
            {slides.length} Active Slides
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {slides.map((s, idx) => (
            <div
              key={s.id}
              onClick={() => setActiveSlideIdx(idx)}
              className={`p-4 rounded-xl border cursor-pointer transition flex items-center gap-3.5 ${
                activeSlideIdx === idx
                  ? 'bg-white/[0.04] border-[#B7FF00] shadow-[0_0_15px_rgba(183,255,0,0.15)]'
                  : 'bg-white/[0.01] border-white/5 hover:border-white/20'
              }`}
            >
              <div className="w-12 h-14 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center p-1 shrink-0">
                <img src={s.image} alt={s.flavorName} className="w-full h-full object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] uppercase font-bold text-white/40">Slide {idx + 1}</div>
                <div className="text-sm font-display text-white truncate">{s.flavorName}</div>
                <div className="text-[10px] text-white/60 truncate">{s.subtitle}</div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.accentColor }} />
                  <span className="text-[10px] font-mono text-white/50">{s.accentColor}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── STOREFRONT FEATURED CAN PICKER ─────────────────────── */}
      <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-6 space-y-4">
        <div>
          <h2 className="font-display text-xl text-white">HOMEPAGE FEATURED PICKS</h2>
          <div className="text-xs text-white/50">
            Toggle which Monster Energy drinks appear in the "Featured Picks" section of the main storefront.
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {products.slice(0, 12).map((p) => (
            <div
              key={p.id}
              onClick={() => toggleFeatured(p.id, !!p.isFeatured)}
              className={`p-3 rounded-xl border cursor-pointer text-center transition flex flex-col items-center justify-between ${
                p.isFeatured
                  ? 'bg-[#B7FF00]/10 border-[#B7FF00] shadow-[0_0_12px_rgba(183,255,0,0.2)]'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/25 opacity-70'
              }`}
            >
              <div className="h-20 flex items-center justify-center">
                <img src={p.image} alt={p.name} className="h-16 w-auto object-contain" />
              </div>
              <div className="text-xs font-semibold text-white mt-2 truncate w-full">{p.name}</div>
              <span
                className={`mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  p.isFeatured
                    ? 'bg-[#B7FF00] text-black'
                    : 'bg-white/10 text-white/50'
                }`}
              >
                {p.isFeatured ? 'Featured' : 'Hidden'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

