import { Link } from 'react-router-dom'
import { ArrowRight, Zap, ShoppingBag } from 'lucide-react'
import { ProductCard } from '../components/products/ProductCard'
import { EnergyMarquee } from '../components/ui/EnergyMarquee'
import { useDemoStore } from '../store/demoStore'

// Energy section specific images
import heroImg from '../images/energy section/hero image/Monster Energy Unleashed_ Adventure and Performance.png'
import lifestyleBanner from '../images/energy section/lifestyle banner/Neon Monster Energy Lifestyle Collage.png'

// Energy square box images (lifestyle categories)
import squareImg1 from '../images/energy section/square boxes images/995365955151762643.jpg'
import squareImg2 from '../images/energy section/square boxes images/MONSTER ULTRA ⚡.jpg'
import squareImg3 from '../images/energy section/square boxes images/Monster (1).jpg'
import squareImg4 from '../images/energy section/square boxes images/Monster Energy And Axell Hodges - Thiago Moreira Rodrigues.jpg'
import squareImg5 from '../images/energy section/square boxes images/monster (2).jpg'

// Energy drink images
import energyDrink1 from '../images/energy section/drinks/Drink_-__monsterenergy-removebg-preview.png'
import energyDrink2 from '../images/energy section/drinks/download__12_-removebg-preview.png'
import energyDrink3 from '../images/energy section/drinks/download__13_-removebg-preview.png'
import energyDrink4 from '../images/energy section/drinks/download__8_-removebg-preview.png'
import energyDrink5 from '../images/energy section/drinks/download__9_-removebg-preview.png'
import energyDrink6 from '../images/shop hero section images/drinks images/Drink_-_Mango_Matic_Maxx__monsterenergy_-removebg-preview.png'

// One of the uploaded banners for CTA at the bottom
import bannerCoffee from '../images/shop hero section images/Coffee-Fueled Racing Energy.png'
import bannerTropical from '../images/shop hero section images/Own the Night_ Tropical Energy Trio.png'

const LIFESTYLE_CARDS = [
  {
    title: 'MOTORSPORTS',
    desc: 'From MotoGP to F1 — Monster powers champions on the track.',
    img: squareImg4,
    accent: '#FF4400',
  },
  {
    title: 'GAMING',
    desc: 'Level up your focus. Monster fuels esports legends worldwide.',
    img: squareImg2,
    accent: '#B7FF00',
  },
  {
    title: 'ACTION SPORTS',
    desc: 'Skate. Surf. BMX. Snow. Monster athletes push the limits every day.',
    img: squareImg1,
    accent: '#00BFFF',
  },
  {
    title: 'MUSIC',
    desc: 'Backstage and on stage — Monster is the beat behind the artists.',
    img: squareImg3,
    accent: '#FF00FF',
  },
  {
    title: 'LIFESTYLE',
    desc: 'Live bold. Live loud. Live Monster.',
    img: squareImg5,
    accent: '#FFD700',
  },
]

const FLAVOR_COLLECTIONS = [
  {
    name: 'Original',
    slug: 'original',
    tagline: 'The one that started it all.',
    accent: '#B7FF00',
    img: energyDrink1,
  },
  {
    name: 'Ultra',
    slug: 'ultra',
    tagline: 'Zero sugar. Maximum flavor.',
    accent: '#A0C8FF',
    img: energyDrink2,
  },
  {
    name: 'Juice',
    slug: 'juiced',
    tagline: 'Real fruit. Real energy.',
    accent: '#FFD700',
    img: energyDrink6,
  },
  {
    name: 'Java',
    slug: 'java',
    tagline: 'Coffee meets Monster.',
    accent: '#FF6B00',
    img: energyDrink3,
  },
  {
    name: 'Dragon Tea',
    slug: 'tea',
    tagline: 'Natural lift. Bold finish.',
    accent: '#00FF88',
    img: energyDrink4,
  },
  {
    name: 'Protein',
    slug: 'protein',
    tagline: 'Energy + 25g protein.',
    accent: '#FF4488',
    img: energyDrink5,
  },
]

export default function EnergyPage() {
  const products = useDemoStore((s) => s.products)
  const featured = products.filter((p) => p.isFeatured).slice(0, 5)

  return (
    <div className="energy-page">
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border h-screen flex items-center justify-center">
        <img
          src={heroImg}
          alt="Monster Energy Unleashed — adventure and high-performance sports"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 px-5 sm:px-8 md:px-16 w-full">
          <div className="text-neon text-[11px] sm:text-xs tracking-[0.3em] uppercase mb-3 sm:mb-4">
            Monster Energy™ — The World of Energy
          </div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl leading-none mb-4 sm:mb-5 text-white">
            ENERGY WITHOUT<br />
            <span className="text-neon">COMPROMISE.</span>
          </h1>
          <div className="h-0.5 w-16 sm:w-20 bg-neon mb-4 sm:mb-5" />
          <p className="text-text-2 text-sm sm:text-lg md:text-xl max-w-xl leading-relaxed mb-6 sm:mb-8 line-clamp-3 sm:line-clamp-none">
            More than a drink. Monster is the fuel for those who push further — on the track,
            in the arena, on the mountain, and at the decks.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-neon text-black font-bold uppercase tracking-wider text-sm px-8 py-3.5 rounded-lg hover:bg-neon-bright shimmer-hover active:scale-95 transition"
            >
              <ShoppingBag size={16} />
              SHOP THE RANGE
            </Link>
            <button
              onClick={() => document.getElementById('lifestyle')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold uppercase tracking-wider text-sm px-8 py-3.5 rounded-lg hover:border-neon hover:text-neon hover:scale-105 active:scale-95 transition"
            >
              <Zap size={16} />
              EXPLORE LIFESTYLE
            </button>
          </div>
        </div>
      </section>

      {/* ── HIGH-SPEED ENERGY TICKER ──────────────────── */}
      <EnergyMarquee speed="normal" accent="#B7FF00" />

      {/* ── BRAND STORY ─────────────────────────────────── */}
      <section className="px-4 md:px-16 py-16 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-neon text-xs tracking-[0.35em] uppercase mb-4">Our Story</div>
            <h2 className="font-display text-4xl md:text-6xl leading-none mb-6">
              MORE THAN<br />A CAN.
            </h2>
            <div className="h-0.5 w-16 bg-neon mb-6" />
            <p className="text-text-2 leading-relaxed mb-4">
              Since 2002, Monster Energy has been more than just an energy drink — it\'s a culture,
              an attitude, a way of life. From humble beginnings to becoming the world's leading
              energy brand, Monster has stayed true to one principle: support the culture.
            </p>
            <p className="text-text-2 leading-relaxed mb-8">
              Monster sponsors hundreds of athletes across motorsports, action sports, gaming,
              and music — not just for exposure, but because we genuinely believe in the people
              who push the limits of what's possible.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-neon font-semibold hover:underline"
            >
              Explore the collection <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[squareImg1, squareImg4, squareImg2, squareImg5].map((img, i) => (
              <div key={i} className="aspect-square rounded-card overflow-hidden border border-border">
                <img
                  src={img}
                  alt={`Monster Energy lifestyle image ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIFESTYLE GRID ──────────────────────────────── */}
      <section id="lifestyle" className="px-4 md:px-8 py-12">
        <div className="text-center mb-10">
          <div className="text-neon text-xs tracking-[0.35em] uppercase mb-3">The World of Monster</div>
          <h2 className="font-display text-4xl md:text-6xl leading-none">LIFESTYLE</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {LIFESTYLE_CARDS.map((card) => (
            <div
              key={card.title}
              className="group relative rounded-card overflow-hidden border border-border aspect-square cursor-pointer"
            >
              <img
                src={card.img}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300" />
              <div className="absolute inset-0 border-2 rounded-card border-transparent group-hover:border-neon/60 transition-all duration-300" />
              <div className="absolute bottom-0 p-4">
                <div
                  className="font-display text-lg leading-tight group-hover:text-neon transition-colors duration-200"
                  style={{ color: card.accent }}
                >
                  {card.title}
                </div>
                <div className="text-xs text-text-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-snug">
                  {card.desc}
                </div>
              </div>
              <ArrowRight
                size={16}
                className="absolute top-3 right-3 text-transparent group-hover:text-neon transition-colors duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── FLAVOR COLLECTIONS ──────────────────────────── */}
      <section className="px-4 md:px-8 py-12 bg-bg-2 border-y border-border">
        <div className="text-center mb-10">
          <div className="text-neon text-xs tracking-[0.35em] uppercase mb-3">Our Range</div>
          <h2 className="font-display text-4xl md:text-6xl leading-none">FLAVOR COLLECTIONS</h2>
          <p className="text-text-2 mt-4 max-w-xl mx-auto">
            Six distinct collections, each with their own character. Find the one that matches yours.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {FLAVOR_COLLECTIONS.map((col, idx) => (
            <Link
              key={col.slug}
              to={`/shop?category=${col.slug}`}
              className="h-[260px] flex flex-col justify-between items-center text-center p-4 bg-card border border-border rounded-card hover:border-neon/50 hover:shadow-[0_8px_28px_rgba(183,255,0,0.18)] transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="h-36 w-full flex items-center justify-center p-2 rounded-lg bg-gradient-to-b from-white/[0.02] to-transparent">
                <img
                  src={col.img}
                  alt={`${col.name} collection — Monster Energy`}
                  className={`drink-can h-28 max-h-28 w-auto object-contain select-none transition-transform duration-300 group-hover:scale-120 group-hover:rotate-6 filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.6)] ${
                    idx % 2 === 0 ? 'animate-float-can' : 'animate-float-can-alt'
                  }`}
                  style={{ animationDelay: `${idx * 0.3}s` }}
                />
              </div>
              <div className="mt-auto flex flex-col items-center w-full">
                <div
                  className="font-display text-lg leading-tight mb-1 font-bold tracking-wider"
                  style={{ color: col.accent }}
                >
                  {col.name}
                </div>
                <div className="text-xs text-text-2 leading-snug line-clamp-1 mb-2">{col.tagline}</div>
                <div className="text-xs uppercase tracking-wider text-neon font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Shop →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────── */}
      <section className="px-4 md:px-8 py-12">
        <div className="section-header mb-8">
          <div>
            <div className="section-eyebrow">ICONIC FLAVORS</div>
            <h2 className="section-heading">BOLD CHOICES</h2>
          </div>
          <Link to="/shop" className="see-all-link">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── IMMERSIVE LIFESTYLE BANNER ─────────────── */}
      <section className="px-4 md:px-8 py-8">
        <div className="relative rounded-card overflow-hidden border border-border h-[50vh] min-h-[340px] max-h-[520px]">
          <img
            src={lifestyleBanner}
            alt="Neon Monster Energy lifestyle collage — high-energy brand imagery"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="relative z-10 absolute inset-0 flex flex-col justify-center px-8 md:px-16">
            <div className="text-neon text-xs tracking-[0.35em] uppercase mb-4">Limited Edition</div>
            <h2 className="font-display text-4xl md:text-7xl leading-none mb-6">
              UNLEASH YOUR<br />
              <span className="text-neon">ENERGY.</span>
            </h2>
            <p className="text-text-2 max-w-md mb-8 leading-relaxed">
              Discover the culture behind the can. Connect with the Monster community across
              motorsport, gaming, music, and extreme sports.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border border-neon text-neon font-bold uppercase tracking-wider text-sm px-8 py-3 rounded-lg hover:bg-neon hover:text-black transition w-fit"
            >
              SHOP NOW <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── DUAL BANNER CTA ───────────────────────────── */}
      <section className="px-4 md:px-8 py-6 pb-16">
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            to="/shop?category=java"
            className="relative rounded-card overflow-hidden border border-border h-52 group block"
          >
            <img
              src={bannerCoffee}
              alt="Coffee-Fueled Racing Energy — Java collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 z-10">
              <div className="text-xs text-warn uppercase tracking-widest mb-1">Java Collection</div>
              <div className="font-display text-xl">COFFEE-FUELED RACING</div>
              <div className="text-text-2 text-xs mt-1">Shop Java → </div>
            </div>
          </Link>
          <Link
            to="/shop?category=juiced"
            className="relative rounded-card overflow-hidden border border-border h-52 group block"
          >
            <img
              src={bannerTropical}
              alt="Own the Night: Tropical Energy Trio — juice collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 z-10">
              <div className="text-xs text-neon uppercase tracking-widest mb-1">Juice Collection</div>
              <div className="font-display text-xl">OWN THE NIGHT</div>
              <div className="text-text-2 text-xs mt-1">Shop Juice → </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}
