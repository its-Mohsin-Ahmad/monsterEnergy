import { useEffect, useRef, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { shopCarouselSlides } from '../../data/carouselSlides'

/**
 * ShopBannerCarousel
 * ──────────────────
 * Displays the five official Monster Energy banner images in sequence.
 * • Auto-advances every 5 s (pauses on hover / page hidden / reduced-motion).
 * • Smooth CSS fade/slide transition between slides.
 * • Previous / Next arrows + dot pagination.
 * • Wraps correctly: prev from 0 → last; next from last → 0.
 * • Timers cleaned up on unmount.
 * • Accessible: keyboard-navigable buttons, meaningful alt text.
 */
export function ShopBannerCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total = shopCarouselSlides.length

  // Detect prefers-reduced-motion
  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  // Auto-advance (3 seconds)
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total)
    }, 3000)
  }, [total])

  const goTo = useCallback(
    (idx: number) => {
      if (isTransitioning && !prefersReduced) return
      setIsTransitioning(true)
      setCurrent(((idx % total) + total) % total)
      setTimeout(() => setIsTransitioning(false), prefersReduced ? 0 : 600)
      if (!paused && !prefersReduced) {
        startTimer()
      }
    },
    [isTransitioning, total, prefersReduced, paused, startTimer],
  )

  const prev = () => goTo(current - 1)
  const next = () => goTo(current + 1)

  useEffect(() => {
    if (paused || prefersReduced) return
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [paused, prefersReduced, startTimer])

  // Pause when tab not visible
  useEffect(() => {
    const handleVis = () => {
      if (document.hidden) {
        if (timerRef.current) clearInterval(timerRef.current)
      } else if (!paused && !prefersReduced) {
        startTimer()
      }
    }
    document.addEventListener('visibilitychange', handleVis)
    return () => document.removeEventListener('visibilitychange', handleVis)
  }, [paused, prefersReduced, startTimer])

  // Cleanup on unmount
  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
    touchEndX.current = null
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 40) {
      if (diff > 0) next()
      else prev()
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  const slide = shopCarouselSlides[current]

  return (
    <div
      className="relative w-full h-[220px] xs:h-[260px] sm:h-[350px] md:h-[440px] lg:h-[500px] xl:h-[540px] overflow-hidden rounded-xl sm:rounded-card border border-border bg-[#050705] select-none shadow-2xl"
      aria-label="Monster Energy product collection banner carousel"
      aria-roledescription="carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {shopCarouselSlides.map((s, idx) => (
        <div
          key={s.id}
          aria-roledescription="slide"
          aria-label={`Slide ${idx + 1} of ${total}: ${s.alt}`}
          aria-hidden={idx !== current}
          className="absolute inset-0 transition-opacity"
          style={{
            opacity: idx === current ? 1 : 0,
            transitionDuration: prefersReduced ? '0ms' : '700ms',
            transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',
            pointerEvents: idx === current ? 'auto' : 'none',
          }}
        >
          <img
            src={s.src}
            alt={s.alt}
            className="w-full h-full object-cover object-center"
            draggable={false}
            loading={idx === 0 ? 'eager' : 'lazy'}
          />
          {/* Subtle dark vignette so controls remain visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />
        </div>
      ))}

      {/* Prev arrow */}
      <button
        onClick={prev}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="Previous slide"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/65 hover:bg-neon hover:text-black text-white/90 border border-white/15 hover:border-neon flex items-center justify-center backdrop-blur-md transition-all shadow-lg active:scale-95"
      >
        <ChevronLeft size={18} className="sm:hidden" />
        <ChevronLeft size={22} className="hidden sm:block" />
      </button>

      {/* Next arrow */}
      <button
        onClick={next}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="Next slide"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/65 hover:bg-neon hover:text-black text-white/90 border border-white/15 hover:border-neon flex items-center justify-center backdrop-blur-md transition-all shadow-lg active:scale-95"
      >
        <ChevronRight size={18} className="sm:hidden" />
        <ChevronRight size={22} className="hidden sm:block" />
      </button>

      {/* Dots */}
      <div
        className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-30 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10"
        role="tablist"
        aria-label="Slides"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {shopCarouselSlides.map((s, idx) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={idx === current}
            aria-label={`Go to slide ${idx + 1}: ${s.label}`}
            onClick={() => goTo(idx)}
            className="h-1.5 sm:h-2 rounded-full transition-all duration-300"
            style={{
              width: idx === current ? '22px' : '6px',
              background: idx === current ? '#B7FF00' : 'rgba(255,255,255,0.4)',
            }}
          />
        ))}
      </div>

      {/* Slide label & CTA (bottom-left overlay) */}
      <div className="absolute bottom-2.5 left-2.5 sm:bottom-4 sm:left-4 z-20 max-w-[60%] sm:max-w-none">
        <Link
          to={slide.shopLink}
          className="inline-flex items-center gap-1.5 sm:gap-2 bg-black/75 hover:bg-neon hover:text-black text-neon text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 sm:px-4 sm:py-2 rounded-lg transition-all border border-neon/40 backdrop-blur-md shadow-glow truncate"
        >
          <span className="truncate">{slide.label}</span>
          <span className="text-[11px] font-mono">→</span>
        </Link>
      </div>

      {/* Slide counter */}
      <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-30 text-[10px] sm:text-xs text-white/80 font-mono select-none bg-black/70 border border-white/15 backdrop-blur-md px-2 sm:px-2.5 py-0.5 rounded-full shadow-md">
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </div>
  )
}
