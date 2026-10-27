import { Link } from 'react-router-dom'
import { ShoppingBag, Zap, Home, Package, ArrowRight, TrendingUp, Star } from 'lucide-react'
import { useDemoStore } from '../store/demoStore'
import { useCartStore } from '../store/cartStore'

// Dashboard banner — one of the official uploaded shop banners
import dashBanner from '../images/shop hero section images/Unleash Your Energy_ Neon Storm.png'
import breakBanner from '../images/shop hero section images/Monster Energy_ Break the Ordinary.png'

// A few product images for quick display
import imgOriginal from '../images/home page/home page hero section carousal images/Monster-removebg-preview.png'
import imgWhite from '../images/home page/home page hero section carousal images/White_monster-removebg-preview.png'
import imgMango from '../images/shop hero section images/drinks images/Drink_-_Mango_Matic_Maxx__monsterenergy_-removebg-preview.png'

function StatCard({
  label,
  value,
  sub,
  accent = '#B7FF00',
  icon: Icon,
}: {
  label: string
  value: string | number
  sub?: string
  accent?: string
  icon: React.ElementType
}) {
  return (
    <div className="bg-card border border-border rounded-card p-6 flex items-start gap-4 hover:border-neon/30 transition group">
      <div
        className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
        style={{ background: accent + '18', color: accent }}
      >
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-muted uppercase tracking-widest mb-1">{label}</div>
        <div className="font-display text-3xl leading-none" style={{ color: accent }}>
          {value}
        </div>
        {sub && <div className="text-xs text-muted mt-1">{sub}</div>}
      </div>
    </div>
  )
}

function QuickAction({
  to,
  label,
  icon: Icon,
  accent = '#B7FF00',
}: {
  to: string
  label: string
  icon: React.ElementType
  accent?: string
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-neon/50 hover:bg-card-elev transition-all group"
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: accent + '18', color: accent }}
      >
        <Icon size={17} />
      </div>
      <span className="text-sm font-medium text-text-2 group-hover:text-text transition-colors">
        {label}
      </span>
      <ArrowRight size={14} className="ml-auto text-muted group-hover:text-neon transition-colors" />
    </Link>
  )
}

export default function DashboardPage() {
  const products = useDemoStore((s) => s.products)
  const cartItems = useCartStore((s) => s.items)
  const cartQty = useCartStore((s) => s.totalQty())
  const featured = products.filter((p) => p.isFeatured)
  const totalProducts = products.length
  const categories = [...new Set(products.map((p) => p.category))].length
  const inStock = products.filter((p) => p.stock > 0).length

  // Quick featured picks for product overview
  const quickPicks = products.slice(0, 6)

  return (
    <div className="dashboard-page px-4 md:px-8 py-8 space-y-8">
      {/* ── PAGE HEADER ──────────────────────────── */}
      <div className="flex items-end justify-between">
        <div>
          <div className="text-neon text-xs tracking-[0.35em] uppercase mb-2">
            Monster Energy Dashboard
          </div>
          <h1 className="font-display text-4xl md:text-5xl leading-none">
            WELCOME BACK.
          </h1>
          <p className="text-text-2 mt-2 text-sm">
            Your personal Monster Energy hub — explore, shop, and track your collection.
          </p>
        </div>
        <div className="hidden md:block text-right text-xs text-muted font-mono">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>

      {/* ── STATS CARDS ──────────────────────────── */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Total Products"
            value={totalProducts}
            sub="in the demo catalog"
            icon={Package}
            accent="#B7FF00"
          />
          <StatCard
            label="Collections"
            value={categories}
            sub="flavor categories"
            icon={Star}
            accent="#A0C8FF"
          />
          <StatCard
            label="Featured Picks"
            value={featured.length}
            sub="highlighted products"
            icon={TrendingUp}
            accent="#FFD700"
          />
          <StatCard
            label="Cart Items"
            value={cartQty}
            sub={cartItems.length > 0 ? `${cartItems.length} line items` : 'cart is empty'}
            icon={ShoppingBag}
            accent="#FF6B00"
          />
        </div>
      </section>

      {/* ── MAIN LAYOUT ─────────────────────────── */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* LEFT COLUMN ── Featured collection panel */}
        <div className="md:col-span-2 space-y-6">
          {/* Featured banner */}
          <div className="relative rounded-card overflow-hidden border border-border group">
            <img
              src={dashBanner}
              alt="Unleash Your Energy — Monster Energy neon storm collection panel"
              className="w-full h-[220px] md:h-[280px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
              <div className="text-neon text-xs tracking-[0.35em] uppercase mb-2">
                Featured Collection
              </div>
              <h2 className="font-display text-3xl md:text-4xl leading-none mb-3">
                UNLEASH YOUR ENERGY
              </h2>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-neon text-black font-bold uppercase tracking-wider text-xs px-5 py-2.5 rounded-lg hover:bg-neon-bright transition w-fit"
              >
                Shop Collection <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Second banner */}
          <div className="relative rounded-card overflow-hidden border border-border group">
            <img
              src={breakBanner}
              alt="Monster Energy: Break the Ordinary — shop the full range"
              className="w-full h-[160px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-5 z-10">
              <div className="text-neon text-xs uppercase tracking-widest mb-1">All Flavors</div>
              <div className="font-display text-2xl">BREAK THE ORDINARY</div>
            </div>
            <Link
              to="/shop"
              className="absolute bottom-4 right-5 z-10 text-sm text-text-2 hover:text-neon transition font-semibold"
            >
              Shop All →
            </Link>
          </div>

          {/* Product overview */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl">PRODUCT OVERVIEW</h3>
              <Link to="/shop" className="text-xs text-neon hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {quickPicks.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.slug}`}
                  className="bg-card border border-border rounded-card p-3 flex flex-col items-center text-center hover:border-neon/40 transition group"
                >
                  <div className="h-16 flex items-center justify-center mb-2">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="drink-can h-14 object-contain"
                    />
                  </div>
                  <div className="text-[10px] text-text-2 leading-tight group-hover:text-neon transition-colors line-clamp-2">
                    {p.name.replace('Monster ', '').replace('Energy ', '')}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN ── Quick actions + mini stats */}
        <div className="space-y-6">
          {/* Quick actions */}
          <div className="bg-card border border-border rounded-card p-5">
            <h3 className="font-display text-lg mb-4 text-neon">QUICK ACTIONS</h3>
            <div className="space-y-2">
              <QuickAction to="/shop" label="Open Shop" icon={ShoppingBag} accent="#B7FF00" />
              <QuickAction to="/energy" label="Explore Energy" icon={Zap} accent="#A0C8FF" />
              <QuickAction to="/cart" label="View Cart" icon={ShoppingBag} accent="#FF6B00" />
              <QuickAction to="/" label="Return Home" icon={Home} accent="#FFD700" />
            </div>
          </div>

          {/* Cart summary */}
          <div className="bg-card border border-border rounded-card p-5">
            <h3 className="font-display text-lg mb-4">CART SUMMARY</h3>
            {cartItems.length === 0 ? (
              <div className="text-center py-4">
                <ShoppingBag size={32} className="text-muted mx-auto mb-3" />
                <p className="text-sm text-muted">Your cart is empty.</p>
                <Link
                  to="/shop"
                  className="text-xs text-neon hover:underline mt-2 block"
                >
                  Start shopping →
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {cartItems.slice(0, 4).map((item) => {
                  const product = products.find((p) => p.id === item.productId)
                  if (!product) return null
                  return (
                    <div key={item.productId} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-8 h-8 object-contain"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs truncate">{product.name}</div>
                        <div className="text-xs text-muted">×{item.quantity}</div>
                      </div>
                      <div className="text-xs text-neon font-semibold">
                        ${(product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  )
                })}
                {cartItems.length > 4 && (
                  <div className="text-xs text-muted text-center pt-1">
                    +{cartItems.length - 4} more items
                  </div>
                )}
                <Link
                  to="/cart"
                  className="w-full mt-3 flex items-center justify-center gap-2 bg-neon text-black font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg hover:bg-neon-bright transition"
                >
                  View Cart ({cartQty})
                </Link>
              </div>
            )}
          </div>

          {/* In-stock indicator */}
          <div className="bg-card border border-border rounded-card p-5">
            <h3 className="font-display text-lg mb-4">INVENTORY STATUS</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-2">In Stock</span>
                <span className="text-sm text-success font-semibold">{inStock}</span>
              </div>
              <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-neon rounded-full transition-all"
                  style={{ width: `${(inStock / totalProducts) * 100}%` }}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-2">Out of Stock</span>
                <span className="text-sm text-error font-semibold">
                  {totalProducts - inStock}
                </span>
              </div>
              <Link
                to="/shop"
                className="text-xs text-neon hover:underline block mt-2"
              >
                Browse all products →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── PRODUCT CANS ROW ───────────────────── */}
      <section className="bg-card border border-border rounded-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xl">EXPLORE THE RANGE</h3>
          <Link to="/shop" className="text-xs text-neon hover:underline">
            Shop All Drinks →
          </Link>
        </div>
        <div className="flex items-end justify-center gap-2 md:gap-4 overflow-x-auto py-4 scrollbar-thin">
          {[imgOriginal, imgWhite, imgMango].map((img, i) => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2">
              <img
                src={img}
                alt={`Monster Energy can ${i + 1}`}
                className="drink-can h-24 md:h-40 object-contain drop-shadow-[0_0_20px_rgba(183,255,0,0.2)]"
              />
            </div>
          ))}
          <div className="flex-1 flex flex-col justify-center items-center gap-3 min-w-[120px]">
            <div className="font-display text-2xl md:text-4xl text-center leading-tight">
              28<br />
              <span className="text-neon">VARIETIES</span>
            </div>
            <Link
              to="/shop"
              className="text-xs border border-neon text-neon px-4 py-2 rounded-lg hover:bg-neon hover:text-black transition"
            >
              Shop All →
            </Link>
          </div>
          {[imgOriginal, imgWhite].map((img, i) => (
            <div key={i + 3} className="flex-shrink-0 hidden md:flex flex-col items-center gap-2">
              <img
                src={img}
                alt={`Monster Energy can additional ${i + 4}`}
                className="drink-can h-24 md:h-32 object-contain drop-shadow-[0_0_15px_rgba(183,255,0,0.15)]"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
