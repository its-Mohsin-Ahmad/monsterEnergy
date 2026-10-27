import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Product } from '../../types'

export function ProductCarousel({ products }: { products: Product[] }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (paused || products.length === 0) return
    const t = setInterval(() => setI((x) => (x + 1) % products.length), 4000)
    return () => clearInterval(t)
  }, [paused, products.length])
  if (products.length === 0) return null
  const prev = products[(i - 1 + products.length) % products.length]
  const cur = products[i]
  const next = products[(i + 1) % products.length]
  return (
    <div className="relative py-8" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="flex items-center justify-center gap-6 md:gap-12">
        <button onClick={() => setI((x) => (x - 1 + products.length) % products.length)} className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center hover:border-neon text-text z-10">
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center justify-center gap-4 md:gap-8">
          <div className="opacity-40 scale-75 hidden md:block cursor-pointer" onClick={() => setI((x) => (x - 1 + products.length) % products.length)}>
            <img src={prev.image} alt={prev.name} className="drink-can h-32 object-contain" />
          </div>
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-neon/20 blur-3xl rounded-full" />
              <img src={cur.image} alt={cur.name} onClick={() => navigate(`/product/${cur.slug}`)} className="drink-can relative h-56 md:h-72 object-contain cursor-pointer drop-shadow-[0_0_30px_rgba(183,255,0,0.3)]" />
            </div>
            <div className="mt-4 text-center">
              <div className="font-display text-xl">{cur.name}</div>
              <div className="text-sm text-text-2">{cur.variant}</div>
            </div>
          </div>
          <div className="opacity-40 scale-75 hidden md:block cursor-pointer" onClick={() => setI((x) => (x + 1) % products.length)}>
            <img src={next.image} alt={next.name} className="drink-can h-32 object-contain" />
          </div>
        </div>
        <button onClick={() => setI((x) => (x + 1) % products.length)} className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center hover:border-neon text-text z-10">
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {products.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)} className={`w-2 h-2 rounded-full transition ${idx === i ? 'bg-neon w-5' : 'bg-text-2/40'}`} />
        ))}
      </div>
    </div>
  )
}
