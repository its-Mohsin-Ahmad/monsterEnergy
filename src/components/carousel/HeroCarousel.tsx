import { useEffect, useRef, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowRight, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { heroSlides } from '../../data/heroSlides'

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const total = heroSlides.length
  const activeSlide = heroSlides[current]
  const prevIndex = (current - 1 + total) % total
  const nextIndex = (current + 1) % total
  const prevSlide = heroSlides[prevIndex]
  const nextSlide = heroSlides[nextIndex]

  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const goTo = useCallback(
    (idx: number) => {
      setIsTransitioning(true)
      setCurrent(((idx % total) + total) % total)
      setTimeout(() => setIsTransitioning(false), 450)
    },
    [total],
  )

  const handlePrev = useCallback(() => {
    goTo(current - 1)
  }, [current, goTo])

  const handleNext = useCallback(() => {
    goTo(current + 1)
  }, [current, goTo])

  // Autoplay timer
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      handleNext()
    }, 5500)
  }, [handleNext])

  useEffect(() => {
    if (paused || prefersReduced) return
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [paused, prefersReduced, startTimer])

  // Visibility change handling
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext])

  // Mobile Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const diff = touchStartX.current - touchEndX.current
    if (diff > 50) handleNext()
    else if (diff < -50) handlePrev()
    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <section
      className="relative w-full max-w-full h-[75vh] min-h-[580px] max-h-[780px] flex flex-col items-center overflow-hidden overflow-x-hidden select-none bg-[#020402]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      aria-label="Monster Energy Hero Product Showcase"
    >
      {/* ── ATMOSPHERIC VOLUMETRIC GLOW ─────────────── */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-1000 ease-out z-0"
        style={{
          background: `radial-gradient(ellipse 65% 55% at 50% 46%, ${activeSlide.glowColor} 0%, rgba(10, 40, 15, 0.25) 35%, rgba(2, 5, 2, 0.8) 70%, #020402 100%)`,
        }}
      />

      {/* Volumetric mist texture overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-35 mix-blend-screen bg-[radial-gradient(circle_at_50%_40%,rgba(183,255,0,0.15)_0%,transparent_60%)] filter blur-3xl animate-pulse duration-[4000ms] z-0" />

      {/* Ambient side flares — desktop/tablet only */}
      <div className="hidden sm:block pointer-events-none absolute -left-20 top-1/4 w-80 h-80 bg-[#B7FF00]/10 rounded-full blur-[110px] z-0" />
      <div className="hidden sm:block pointer-events-none absolute -right-20 top-1/4 w-80 h-80 bg-[#00D2FF]/10 rounded-full blur-[110px] z-0" />

      {/* Top spacer — must clear the 64px floating StoreTopbar */}
      <div className="h-16 sm:h-18 w-full flex-shrink-0 z-10" />

      {/* ── MAIN PRODUCT SHOWCASE STAGE (100% VISIBLE & CENTERED) ── */}
      <div className="relative w-full max-w-6xl flex-1 min-h-[240px] sm:min-h-[280px] flex items-center justify-center px-2 sm:px-4 md:px-8 z-20">
        {/* LEFT CIRCULAR ARROW */}
        <button
          onClick={handlePrev}
          aria-label="Previous Monster drink"
          className="group relative z-40 flex-shrink-0 w-9 h-9 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 border-[#B7FF00] bg-black/60 hover:bg-black/90 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_20px_rgba(183,255,0,0.4)] hover:shadow-[0_0_30px_rgba(183,255,0,0.75)] hover:border-[#D1FF4D] hover:scale-105 active:scale-95 transition-all duration-300 mr-1 sm:mr-4 md:mr-6"
        >
          <ChevronLeft
            className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2] group-hover:-translate-x-1 transition-transform duration-200 text-white"
          />
        </button>

        {/* 3-CAN SHOWCASE COMPOSITION */}
        <div className="relative flex-1 flex items-end justify-center min-h-[220px] sm:min-h-[240px] max-w-4xl lg:max-w-[960px] mx-auto">
          {/* ── LEFT PREVIEW CAN (Clickable to switch, shown on tablets and desktop) ── */}
          <div
            onClick={handlePrev}
            className="hidden sm:flex absolute -left-1 sm:left-2 md:left-4 lg:left-8 bottom-2 sm:bottom-4 z-20 cursor-pointer transition-all duration-500 ease-out flex-col items-center group/left"
            style={{
              transform: isTransitioning
                ? 'scale(0.72) translateX(-45px)'
                : 'scale(0.80) translateX(-25px)',
              opacity: isTransitioning ? 0.6 : 0.92,
              filter: isTransitioning ? 'brightness(0.9) contrast(1)' : 'brightness(1) contrast(1.05)',
            }}
            title={`Switch to ${prevSlide.flavorName}`}
          >
            {/* Ambient backlight glow behind left unselected can */}
            <div
              className="pointer-events-none absolute w-32 sm:w-44 h-32 sm:h-44 rounded-full blur-[35px] -z-10 opacity-70 transition-colors duration-500"
              style={{ background: prevSlide.glowColor }}
            />
            <div className="relative flex flex-col items-center justify-end">
              <img
                src={prevSlide.image}
                alt={prevSlide.alt}
                draggable={false}
                className="h-[180px] sm:h-[220px] md:h-[260px] lg:h-[290px] w-auto object-contain select-none origin-bottom transition-all duration-300 group-hover/left:scale-105 group-hover/left:brightness-115"
                style={{
                  filter: `drop-shadow(0 12px 24px rgba(0,0,0,0.9)) drop-shadow(0 0 16px ${prevSlide.glowColor})`,
                }}
              />
              {/* Ground Contact Shadow */}
              <div className="w-24 sm:w-32 h-2.5 -mt-2 rounded-[50%] bg-black/95 blur-[2px] pointer-events-none" />
              <div className="w-32 sm:w-40 h-3.5 -mt-1.5 rounded-[50%] bg-black/60 blur-sm pointer-events-none" />
            </div>
          </div>

          {/* ── CENTER ACTIVE CAN (SELECTED ITEM — FULLY VISIBLE, 10° HOVER) ── */}
          <div className="relative z-30 flex flex-col items-center justify-end h-full pt-4">
            {/* Dynamic Spotlight Aura directly behind center can */}
            <div
              className="pointer-events-none absolute w-[260px] sm:w-[340px] md:w-[400px] h-[260px] sm:h-[340px] md:h-[400px] rounded-full blur-[60px] -z-10 opacity-75 transition-colors duration-1000"
              style={{
                background: `radial-gradient(circle, ${activeSlide.glowColor} 0%, rgba(183,255,0,0.18) 45%, transparent 75%)`,
              }}
            />

            {/* Center Product Link with dedicated hover group */}
            <Link
              to={`/product/${activeSlide.productSlug}`}
              className="group/can relative flex flex-col items-center cursor-pointer pointer-events-auto"
              title={`View ${activeSlide.brandName} ${activeSlide.flavorName} — Click to Shop`}
            >
              {/* Floating Tooltip Pill on Hover */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-40 opacity-0 group-hover/can:opacity-100 group-hover/can:-translate-y-1 transition-all duration-300 pointer-events-none whitespace-nowrap">
                <span
                  className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md shadow-lg flex items-center gap-1.5"
                  style={{
                    backgroundColor: 'rgba(5, 7, 5, 0.9)',
                    borderColor: activeSlide.accentColor,
                    color: activeSlide.accentColor,
                    boxShadow: `0 0 16px ${activeSlide.accentColor}77`,
                  }}
                >
                  <Zap size={10} className="fill-current animate-pulse" />
                  VIEW {activeSlide.flavorName}
                </span>
              </div>

              {/* The Can Image — fixed box so ALL cans render the same size */}
              <div className="relative z-20 flex flex-col items-center">
                <div className="w-[190px] sm:w-[230px] md:w-[260px] lg:w-[290px] h-[280px] sm:h-[340px] md:h-[390px] lg:h-[430px] flex items-end justify-center">
                  <img
                    src={activeSlide.image}
                    alt={activeSlide.alt}
                    draggable={false}
                    className="w-full h-full object-contain select-none origin-bottom transition-all duration-300 ease-out group-hover/can:scale-110 group-hover/can:rotate-[10deg]"
                    style={{
                      filter: `drop-shadow(0 0 26px ${activeSlide.glowColor}) drop-shadow(0 16px 32px rgba(0,0,0,0.95))`,
                    }}
                  />
                </div>

                {/* Direct Base Contact Shadow (Anchored to Ground) */}
                <div className="w-32 sm:w-44 md:w-52 h-3.5 -mt-3 rounded-[50%] bg-black/95 blur-[2.5px] z-20 pointer-events-none transition-all duration-300 group-hover/can:scale-105" />
                <div className="w-44 sm:w-56 md:w-64 h-5 -mt-2 rounded-[50%] bg-black/80 blur-md z-10 pointer-events-none" />
              </div>

              {/* RUGGED ROCK PEDESTAL & GROUND UNDERGLOW */}
              <div className="relative -mt-4 sm:-mt-6 z-10 w-[240px] sm:w-[310px] md:w-[370px] flex flex-col items-center pointer-events-none">
                {/* Intense Neon Light Source hidden under can base */}
                <div
                  className="w-36 sm:w-52 h-3 rounded-full blur-md transition-all duration-300 group-hover/can:scale-125"
                  style={{
                    background: activeSlide.accentColor,
                    boxShadow: `0 0 24px 6px ${activeSlide.accentColor}, 0 0 45px 14px ${activeSlide.glowColor}`,
                  }}
                />

                {/* Jagged Dark Rocks Silhouette / SVG Pedestal */}
                <svg
                  viewBox="0 0 400 90"
                  className="w-full h-auto filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.95)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="rockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#18241a" />
                      <stop offset="40%" stopColor="#0a120a" />
                      <stop offset="100%" stopColor="#040604" />
                    </linearGradient>
                    <linearGradient id="rockHighlight" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stopColor={activeSlide.accentColor} stopOpacity="0.65" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Main jagged rock bed */}
                  <polygon
                    points="30,85 70,60 120,70 160,45 200,55 240,40 290,65 340,55 375,85"
                    fill="url(#rockGrad)"
                  />
                  {/* Rock facet highlights */}
                  <polygon
                    points="140,50 160,45 200,55 185,75 130,70"
                    fill="#1e2c1e"
                    opacity="0.8"
                  />
                  <polygon
                    points="200,55 240,40 270,60 235,75"
                    fill="#152015"
                    opacity="0.9"
                  />
                  <polygon
                    points="70,60 120,70 100,82 55,78"
                    fill="#101810"
                    opacity="0.85"
                  />
                  {/* Top neon edge highlight */}
                  <polyline
                    points="120,70 160,45 200,55 240,40 290,65"
                    stroke="url(#rockHighlight)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Wet reflective ground sheen */}
                <div
                  className="w-[260px] sm:w-[330px] h-4 -mt-2 rounded-full blur-md opacity-75"
                  style={{
                    background: `radial-gradient(ellipse at 50% 50%, ${activeSlide.glowColor} 0%, rgba(0,0,0,0.8) 70%, transparent 100%)`,
                  }}
                />
              </div>
            </Link>
          </div>

          {/* ── RIGHT PREVIEW CAN (Clickable to switch) ── */}
          <div
            onClick={handleNext}
            className="hidden sm:flex absolute -right-1 sm:right-2 md:right-4 lg:right-8 bottom-2 sm:bottom-4 z-20 cursor-pointer transition-all duration-500 ease-out flex-col items-center group/right"
            style={{
              transform: isTransitioning
                ? 'scale(0.72) translateX(45px)'
                : 'scale(0.80) translateX(25px)',
              opacity: isTransitioning ? 0.6 : 0.92,
              filter: isTransitioning ? 'brightness(0.9) contrast(1)' : 'brightness(1) contrast(1.05)',
            }}
            title={`Switch to ${nextSlide.flavorName}`}
          >
            {/* Ambient backlight glow behind right unselected can */}
            <div
              className="pointer-events-none absolute w-32 sm:w-44 h-32 sm:h-44 rounded-full blur-[35px] -z-10 opacity-70 transition-colors duration-500"
              style={{ background: nextSlide.glowColor }}
            />
            <div className="relative flex flex-col items-center justify-end">
              <img
                src={nextSlide.image}
                alt={nextSlide.alt}
                draggable={false}
                className="h-[180px] sm:h-[220px] md:h-[260px] lg:h-[290px] w-auto object-contain select-none origin-bottom transition-all duration-300 group-hover/right:scale-105 group-hover/right:brightness-115"
                style={{
                  filter: `drop-shadow(0 12px 24px rgba(0,0,0,0.9)) drop-shadow(0 0 16px ${nextSlide.glowColor})`,
                }}
              />
              {/* Ground Contact Shadow */}
              <div className="w-24 sm:w-32 h-2.5 -mt-2 rounded-[50%] bg-black/95 blur-[2px] pointer-events-none" />
              <div className="w-32 sm:w-40 h-3.5 -mt-1.5 rounded-[50%] bg-black/60 blur-sm pointer-events-none" />
            </div>
          </div>
        </div>

        {/* RIGHT CIRCULAR ARROW */}
        <button
          onClick={handleNext}
          aria-label="Next Monster drink"
          className="group relative z-40 flex-shrink-0 w-9 h-9 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 border-[#B7FF00] bg-black/60 hover:bg-black/90 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_20px_rgba(183,255,0,0.4)] hover:shadow-[0_0_30px_rgba(183,255,0,0.75)] hover:border-[#D1FF4D] hover:scale-105 active:scale-95 transition-all duration-300 ml-1 sm:ml-4 md:ml-6"
        >
          <ChevronRight
            className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2] group-hover:translate-x-1 transition-transform duration-200 text-white"
          />
        </button>
      </div>

      {/* ── PRODUCT DETAILS, CAN-SPECIFIC TEXT & SHOP BUTTON (ABSOLUTE OVERLAY AT BOTTOM) ────── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 w-full flex flex-col items-center justify-end pb-4 md:pb-6 px-4 text-center"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(2,4,2,0.88) 28%, rgba(2,4,2,0.97) 60%, #020402 100%)' }}
      >
        {/* Horizontal Neon Accent Line */}
        <div
          className="w-10 h-1 rounded-full mb-1.5 shadow-md transition-all duration-500"
          style={{
            background: activeSlide.accentColor,
            boxShadow: `0 0 10px ${activeSlide.accentColor}`,
          }}
        />

        {/* Product Heading: MONSTER ENERGY [FLAVOR] */}
        <h1 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-wider text-white leading-tight">
          {activeSlide.brandName}{' '}
          <span
            className="transition-colors duration-500"
            style={{ color: activeSlide.accentColor }}
          >
            {activeSlide.flavorName}
          </span>
        </h1>

        {/* Subtitle / Catchphrase */}
        <p className="text-[11px] sm:text-sm text-gray-300 font-medium tracking-wide mt-0.5 max-w-lg transition-opacity duration-300 line-clamp-1">
          {activeSlide.subtitle}
        </p>

        {/* Can-Specific Badges */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 mt-1 sm:mt-1.5">
          <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white border border-white/15">
            {activeSlide.volume}
          </span>
          <span
            className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border"
            style={{
              borderColor: `${activeSlide.accentColor}66`,
              color: activeSlide.accentColor,
              backgroundColor: `${activeSlide.accentColor}15`,
            }}
          >
            <Zap size={10} className="fill-current" />
            {activeSlide.caffeine}
          </span>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-text-2 bg-black/50 border border-white/10">
            {activeSlide.flavorNotes}
          </span>
        </div>

        {/* Can Tagline — clean on mobile */}
        <p className="hidden sm:block text-xs text-text-2 mt-1 max-w-lg mx-auto leading-relaxed px-2 line-clamp-1 sm:line-clamp-2">
          {activeSlide.tagline}
        </p>

        {/* ── SHOP BUTTON & QUICK ACTIONS ──────────────────────── */}
        <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-2.5">
          <Link
            to={`/product/${activeSlide.productSlug}`}
            className="group/btn relative inline-flex items-center gap-1.5 sm:gap-2 font-bold uppercase tracking-wider text-[11px] sm:text-xs px-4 sm:px-6 py-1.5 sm:py-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shimmer-hover"
            style={{
              backgroundColor: activeSlide.accentColor,
              color: activeSlide.accentColor === '#E2E8F0' ? '#000000' : '#050705',
              boxShadow: `0 0 18px ${activeSlide.accentColor}66`,
            }}
          >
            <ShoppingBag size={13} />
            <span>SHOP {activeSlide.flavorName}</span>
            <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border border-white/20 text-white hover:border-white/50 hover:bg-white/10 transition-all active:scale-95"
          >
            <span>All Flavors</span>
          </Link>
        </div>

        {/* PAGINATION DOTS */}
        <div
          className="flex items-center gap-2 sm:gap-3 mt-3"
          role="tablist"
          aria-label="Carousel pagination"
        >
          {heroSlides.map((slide, idx) => {
            const isActive = idx === current
            return (
              <button
                key={slide.id}
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to ${slide.flavorName}`}
                onClick={() => goTo(idx)}
                className="group relative flex items-center justify-center p-1 cursor-pointer focus:outline-none"
              >
                {isActive ? (
                  // Active: Outlined Neon Ring with inner dot
                  <span
                    className="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                    style={{
                      borderColor: activeSlide.accentColor,
                      boxShadow: `0 0 8px ${activeSlide.accentColor}, inset 0 0 4px ${activeSlide.accentColor}`,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: activeSlide.accentColor }}
                    />
                  </span>
                ) : (
                  // Inactive: Subtle muted dot
                  <span className="w-2 h-2 rounded-full bg-white/25 group-hover:bg-white/60 transition-all duration-200" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
