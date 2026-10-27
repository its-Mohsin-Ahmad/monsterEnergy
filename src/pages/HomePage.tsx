import { Link } from 'react-router-dom'
import { ArrowRight, Zap, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { HeroCarousel } from '../components/carousel/HeroCarousel'
import { ProductCard } from '../components/products/ProductCard'
import { EnergyMarquee } from '../components/ui/EnergyMarquee'
import { useDemoStore } from '../store/demoStore'

// Home page lifestyle/section images
import lifestyleImg from '../images/home page/Lifestyle Banner/Monster Energy Lifestyle Collage.png'

// One shop banner to reuse as section accent
import bannerBreak from '../images/shop hero section images/Monster Energy_ Break the Ordinary.png'
import bannerNeon from '../images/shop hero section images/Neon Monster Energy Flavor Showcase.png'

// Hero can images for flavor cards
import imgOriginal from '../images/home page/home page hero section carousal images/Monster-removebg-preview.png'
import imgWhite from '../images/home page/home page hero section carousal images/White_monster-removebg-preview.png'
import imgDragon from '../images/home page/home page hero section carousal images/Monster_Energy_Dragon_Tea_Yerba_Mate-removebg-preview.png'
import imgMango from '../images/shop hero section images/drinks images/Drink_-_Mango_Matic_Maxx__monsterenergy_-removebg-preview.png'
import imgBuy from '../images/home page/home page hero section carousal images/Buy_Unique_Drinks_Online-removebg-preview.png'

const FLAVOR_CATS = [
  {
    slug: 'original',
    name: 'Original',
    sub: 'The iconic classic.',
    img: imgOriginal,
    accent: '#B7FF00',
  },
  {
    slug: 'ultra',
    name: 'Ultra',
    sub: 'Zero sugar. Bold taste.',
    img: imgWhite,
    accent: '#A0C8FF',
  },
  {
    slug: 'tea',
    name: 'Dragon Tea',
    sub: 'Smooth. Natural lift.',
    img: imgDragon,
    accent: '#00FF88',
  },
  {
    slug: 'juiced',
    name: 'Juice',
    sub: 'Real fruit. Real energy.',
    img: imgMango,
    accent: '#FFD700',
  },
  {
    slug: 'java',
    name: 'Java',
    sub: 'Coffee meets Monster.',
    img: imgBuy,
    accent: '#FF6B00',
  },
]

const BRAND_STATS = [
  { value: '40+', label: 'Flavors Worldwide' },
  { value: '175+', label: 'Countries' },
  { value: '2002', label: 'Founded' },
  { value: '#1', label: 'Energy Brand' },
]

export default function HomePage() {
  const products = useDemoStore((s) => s.products)
  const featured = products.filter((p) => p.isFeatured).slice(0, 4)
  const latestProducts = products.slice(0, 6)

  return (
    <div className="home-page">
      {/* ── FULL-SCREEN HERO CAROUSEL ─────────────────── */}
      <section className="w-full relative">
        <HeroCarousel />
      </section>

      {/* ── HIGH-SPEED CONTINUOUS ENERGY TICKER ───────── */}
      <EnergyMarquee speed="normal" accent="#B7FF00" />

      {/* ── BRAND STATS BAR ─────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        className="px-4 md:px-8 py-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-card overflow-hidden border border-border">
          {BRAND_STATS.map((stat) => (
            <div key={stat.label} className="bg-card p-6 text-center group hover:bg-[#111A14] transition-colors duration-200">
              <div className="font-display text-3xl md:text-4xl text-neon group-hover:scale-105 transition-transform duration-200">{stat.value}</div>
              <div className="text-xs text-muted mt-1 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── FIND YOUR FLAVOR ────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="px-4 md:px-8 py-10"
      >
        <div className="section-header">
          <div>
            <div className="section-eyebrow">COLLECTIONS</div>
            <h2 className="section-heading">FIND YOUR FLAVOR</h2>
            <p className="section-sub">Browse by collection and discover what moves you.</p>
          </div>
          <Link to="/shop" className="see-all-link hidden md:flex group">
            View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {FLAVOR_CATS.map((cat, idx) => (
            <Link
              key={cat.slug}
              to={`/shop?category=${cat.slug}`}
              className="h-[260px] flex flex-col justify-between p-4 bg-card border border-border rounded-card hover:border-neon/50 hover:shadow-[0_8px_28px_rgba(183,255,0,0.18)] transition-all duration-300 hover:-translate-y-2 group"
              style={{ '--accent': cat.accent } as React.CSSProperties}
            >
              <div className="h-36 w-full flex items-center justify-center p-2 rounded-lg bg-gradient-to-b from-white/[0.02] to-transparent">
                <img
                  src={cat.img}
                  alt={`${cat.name} collection`}
                  className={`drink-can h-28 max-h-28 w-auto object-contain select-none transition-transform duration-300 group-hover:scale-120 group-hover:rotate-6 filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.6)] ${
                    idx % 2 === 0 ? 'animate-float-can' : 'animate-float-can-alt'
                  }`}
                  style={{ animationDelay: `${idx * 0.35}s` }}
                />
              </div>
              <div className="mt-auto text-center w-full">
                <div className="font-display text-lg tracking-wider font-bold" style={{ color: cat.accent }}>
                  {cat.name}
                </div>
                <div className="text-xs text-muted truncate mt-0.5">{cat.sub}</div>
                <div className="text-xs font-semibold mt-2 uppercase tracking-wider group-hover:translate-x-0.5 transition-transform" style={{ color: cat.accent }}>
                  Shop Collection →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* ── FEATURED PRODUCTS ─────────────────────── */}
      <section className="px-4 md:px-8 py-10">
        <div className="section-header">
          <div>
            <div className="section-eyebrow">POPULAR RIGHT NOW</div>
            <h2 className="section-heading">FEATURED PICKS</h2>
          </div>
          <Link to="/shop" className="see-all-link hidden md:flex">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── LIFESTYLE BANNER ────────────────────────── */}
      <section className="px-4 md:px-8 py-4">
        <div className="lifestyle-banner group rounded-card overflow-hidden border border-border relative h-[50vh] min-h-[340px] max-h-[520px]">
          <img
            src={lifestyleImg}
            alt="Monster Energy lifestyle collage — motorsport, gaming, extreme sports"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-5 sm:px-8 md:px-16 z-10">
            <div className="text-[11px] sm:text-xs text-neon tracking-[0.3em] uppercase mb-2 sm:mb-3">
              The Monster Lifestyle
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl leading-none mb-3 sm:mb-4">
              BUILT FOR THOSE<br />WHO PUSH FURTHER.
            </h2>
            <p className="text-text-2 text-xs sm:text-base max-w-md mb-5 sm:mb-8 leading-relaxed line-clamp-3 sm:line-clamp-none">
              Motorsport. Gaming. Action sports. Music. The world of Monster is built for those who refuse to slow down.
            </p>
            <div className="flex flex-wrap gap-2.5 sm:gap-4">
              <Link
                to="/energy"
                className="inline-flex items-center gap-1.5 sm:gap-2 bg-neon text-black font-bold uppercase tracking-wider text-xs sm:text-sm px-4 sm:px-7 py-2.5 sm:py-3 rounded-lg hover:bg-neon-bright transition active:scale-95"
              >
                <Zap size={14} />
                EXPLORE ENERGY
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 sm:gap-2 border border-white/30 text-white font-semibold uppercase tracking-wider text-xs sm:text-sm px-4 sm:px-7 py-2.5 sm:py-3 rounded-lg hover:border-neon hover:text-neon transition active:scale-95"
              >
                <ShoppingBag size={14} />
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BREAK THE ORDINARY PROMO BANNER ───── */}
      <section className="px-4 md:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Left — Break the Ordinary */}
          <Link to="/shop" className="promo-banner-card relative rounded-card overflow-hidden border border-border h-60 group block">
            <img
              src={bannerBreak}
              alt="Monster Energy: Break the Ordinary — shop all drinks"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 z-10">
              <div className="text-xs text-neon uppercase tracking-widest mb-1">New Arrivals</div>
              <div className="font-display text-2xl">BREAK THE ORDINARY</div>
            </div>
          </Link>

          {/* Right — Neon Flavor Showcase */}
          <Link to="/shop?category=ultra" className="promo-banner-card relative rounded-card overflow-hidden border border-border h-60 group block">
            <img
              src={bannerNeon}
              alt="Neon Monster Energy Flavor Showcase — explore the Ultra collection"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 z-10">
              <div className="text-xs text-neon uppercase tracking-widest mb-1">Ultra Collection</div>
              <div className="font-display text-2xl">NEON FLAVOR SHOWCASE</div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── HIGH-SPEED REVERSE ACCENT MARQUEE ───────── */}
      <EnergyMarquee speed="fast" reverse accent="#00E5FF" className="my-4 border-[#142318] bg-[#020503]" />

      {/* ── BRAND STATEMENT ────────────────────────── */}
      <section className="px-4 md:px-8 py-14">
        <div className="editorial-statement text-center max-w-4xl mx-auto">
          <div className="h-px w-24 bg-neon mx-auto mb-8" />
          <h2 className="font-display text-5xl md:text-7xl leading-none tracking-tight text-white mb-6">
            MORE THAN AN<br />ENERGY DRINK.
          </h2>
          <p className="text-text-2 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Monster is a culture. A mindset. An attitude. From MotoGP to the gaming arena,
            from action sports to the music stage — Monster fuels the people who live life at full throttle.
          </p>
          <div className="h-px w-24 bg-neon mx-auto" />
        </div>
      </section>

      {/* ── MORE PRODUCTS ───────────────────────────── */}
      <section className="px-4 md:px-8 pb-10">
        <div className="section-header mb-6">
          <div>
            <div className="section-eyebrow">EXPLORE MORE</div>
            <h2 className="section-heading">THE COLLECTION</h2>
          </div>
          <Link to="/shop" className="see-all-link flex">
            Shop All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {latestProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER / STAY IN LOOP ──────────────── */}
      <section className="mx-4 md:mx-8 mb-16 p-8 md:p-12 bg-card border border-border rounded-card text-center relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-neon/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-neon/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="text-neon text-xs tracking-[0.35em] uppercase mb-3">Stay Updated</div>
          <h2 className="font-display text-3xl md:text-4xl mb-2">STAY IN THE LOOP</h2>
          <p className="text-muted text-sm mb-6 max-w-sm mx-auto">
            Get updates on new flavors and launches (demo only — no data stored).
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="w-full flex-1 min-w-0 bg-bg border border-border rounded-lg px-4 py-3 text-sm focus:border-neon focus:shadow-[0_0_0_2px_rgba(183,255,0,0.1)] outline-none transition"
            />
            <button
              type="submit"
              className="bg-neon text-black font-bold px-6 py-3 rounded-lg hover:bg-neon-bright transition"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-muted mt-3">Frontend demonstration. No real subscription.</p>
        </div>
      </section>
    </div>
  )
}
