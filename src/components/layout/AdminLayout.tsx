import { useState, useEffect } from 'react'
import { NavLink, Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Boxes,
  Layers,
  ArrowLeftRight,
  Truck,
  ShoppingCart,
  Users,
  Tag,
  BarChart3,
  Monitor,
  Bell,
  ShieldCheck,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  Calendar,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react'
import { useAdminStore } from '../../store/adminStore'
import logoImg from '../../images/logo/Monster_Energy_ragged_M_text_logo-removebg-preview.png'

interface NavItemDef {
  to: string
  label: string
  icon: React.ElementType
  exact?: boolean
  badge?: number
}

const NAV_ITEMS: NavItemDef[] = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
  { to: '/dashboard/products', label: 'Products & Categories', icon: Boxes },
  { to: '/dashboard/inventory', label: 'Inventory & Stock', icon: Layers },
  { to: '/dashboard/stock-movements', label: 'Stock Movements', icon: ArrowLeftRight },
  { to: '/dashboard/suppliers', label: 'Suppliers & Purchasing', icon: Truck },
  { to: '/dashboard/orders', label: 'Orders & Fulfillment', icon: ShoppingCart, badge: 5 },
  { to: '/dashboard/customers', label: 'Customers', icon: Users },
  { to: '/dashboard/coupons', label: 'Promotions & Coupons', icon: Tag },
  { to: '/dashboard/reports', label: 'Sales & Reports', icon: BarChart3 },
  { to: '/dashboard/content', label: 'Website Content', icon: Monitor },
  { to: '/dashboard/notifications', label: 'Notifications', icon: Bell, badge: 3 },
  { to: '/dashboard/users', label: 'Admin Users & Roles', icon: ShieldCheck },
  { to: '/dashboard/logs', label: 'Activity Logs', icon: FileText },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
  { to: '/dashboard/help', label: 'Help & Support', icon: HelpCircle },
]

export function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [dateRange, setDateRange] = useState('Last 7 days')
  const [dateOpen, setDateOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const isAuthenticated = useAdminStore((s) => s.isAuthenticated)
  const currentUser = useAdminStore((s) => s.currentUser)
  const logout = useAdminStore((s) => s.logout)
  const login = useAdminStore((s) => s.login)
  const products = useAdminStore((s) => s.products)
  const orders = useAdminStore((s) => s.orders)
  const notifications = useAdminStore((s) => s.notifications)
  const unreadNotifs = notifications.filter((n) => !n.read)

  // Login form state
  const [loginEmail, setLoginEmail] = useState('admin@monsterenergy.com')
  const [loginPassword, setLoginPassword] = useState('monster2025')
  const [loginError, setLoginError] = useState('')

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setNotifOpen(false)
        setDateOpen(false)
        setUserMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const ok = login(loginEmail, loginPassword)
    if (!ok) {
      setLoginError('Invalid administrator credentials. Try: admin@monsterenergy.com / any password.')
    }
  }

  // Filter products & orders for quick global search
  const filteredProducts = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : []

  const filteredOrders = searchQuery.trim()
    ? orders.filter(
        (o) =>
          o.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.customerName.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : []

  // If not authenticated, render the dedicated Monster Admin Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050805] text-[#F5F7F4] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient neon backdrop glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#B7FF00]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-md bg-[#090D0A] border border-[#1E2E1F] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-8 relative z-10 backdrop-blur-xl">
          {/* Logo & Heading */}
          <div className="flex flex-col items-center text-center mb-8">
            <img
              src={logoImg}
              alt="Monster Energy Logo"
              className="w-14 h-14 object-contain filter drop-shadow-[0_0_15px_rgba(183,255,0,0.6)] mb-3"
            />
            <h1 className="font-display text-3xl tracking-wider text-white">MONSTER ADMIN</h1>
            <div className="text-[11px] text-[#B7FF00] font-bold tracking-[0.25em] uppercase mt-0.5">
              Control Center
            </div>
            <p className="text-xs text-white/50 mt-2">
              Authorized personnel only. Enter credentials to manage store operations.
            </p>
          </div>

          {loginError && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertTriangle size={15} />
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                Administrator Email
              </label>
              <input
                type="text"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@monsterenergy.com"
                required
                className="w-full bg-[#0D140E] border border-[#1E2E1F] focus:border-[#B7FF00] focus:shadow-[0_0_12px_rgba(183,255,0,0.2)] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                Security Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#0D140E] border border-[#1E2E1F] focus:border-[#B7FF00] focus:shadow-[0_0_12px_rgba(183,255,0,0.2)] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#B7FF00] hover:bg-[#c6ff24] text-black font-bold uppercase tracking-wider text-xs py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(183,255,0,0.35)] hover:shadow-[0_0_30px_rgba(183,255,0,0.6)] active:scale-95"
            >
              Sign In to Control Center
            </button>
          </form>

          {/* Quick Demo Login button */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => {
                login('admin@monsterenergy.com', 'monster2025')
              }}
              className="text-xs text-[#B7FF00] hover:underline font-medium"
            >
              ⚡ One-Click Demo Access
            </button>
            <Link to="/" className="text-xs text-white/40 hover:text-white transition flex items-center gap-1">
              ← Return to Public Storefront
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#070A07] text-[#F5F7F4] flex flex-col antialiased selection:bg-[#B7FF00] selection:text-black">
      <div className="flex flex-1 min-h-screen">
        {/* ── FIXED LEFT SIDEBAR (DESKTOP) ────────────────────────── */}
        <aside className="hidden lg:flex flex-col w-[265px] h-screen sticky top-0 bg-[#060806] border-r border-[#152016] select-none z-30">
          {/* Top Brand Logo */}
          <div className="px-6 py-5 flex items-center gap-3 border-b border-[#142015]">
            <img
              src={logoImg}
              alt="Monster Energy"
              className="w-8 h-8 object-contain shrink-0 filter drop-shadow-[0_0_8px_rgba(183,255,0,0.6)]"
            />
            <div>
              <div className="font-display text-base tracking-wider text-white leading-none">
                MONSTER
              </div>
              <div className="text-[11px] text-[#B7FF00] font-black tracking-widest leading-none mt-1 uppercase">
                ADMIN
              </div>
              <div className="text-[9px] text-white/40 tracking-wider uppercase mt-0.5">
                Control Center
              </div>
            </div>
          </div>

          {/* Nav List */}
          <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-3 space-y-0.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const isMatch = item.exact
                ? location.pathname === item.to
                : location.pathname.startsWith(item.to)

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 group ${
                    isMatch
                      ? 'bg-[#B7FF00] text-black shadow-[0_0_14px_rgba(183,255,0,0.4)] font-bold'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      size={17}
                      className={`shrink-0 ${isMatch ? 'stroke-[2.5]' : 'stroke-[1.8] group-hover:scale-110 transition-transform'}`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 ${
                        isMatch
                          ? 'bg-black text-[#B7FF00]'
                          : 'bg-[#B7FF00] text-black shadow-[0_0_8px_rgba(183,255,0,0.6)]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              )
            })}

            {/* Logout button in sidebar */}
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white/50 hover:text-red-400 hover:bg-red-500/10 transition mt-2 text-left"
            >
              <LogOut size={17} className="stroke-[1.8]" />
              <span>Logout</span>
            </button>
          </nav>

          {/* Sidebar Footer Link */}
          <div className="p-4 border-t border-[#142015] flex items-center justify-between text-xs text-white/40">
            <Link
              to="/"
              target="_blank"
              className="hover:text-[#B7FF00] transition flex items-center gap-1.5"
            >
              <span>View Storefront</span>
              <ExternalLink size={12} />
            </Link>
            <span className="text-[10px] font-mono text-white/20">v2.5.0</span>
          </div>
        </aside>

        {/* ── MOBILE SLIDE-OUT DRAWER ──────────────────────────────── */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="relative w-[280px] max-w-[85vw] h-full bg-[#060806] border-r border-[#152016] flex flex-col justify-between p-4 z-10 shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#142015]">
                  <div className="flex items-center gap-3">
                    <img src={logoImg} alt="Monster Energy" className="w-8 h-8 object-contain" />
                    <div>
                      <div className="font-display text-base text-white">MONSTER ADMIN</div>
                      <div className="text-[10px] text-[#B7FF00] tracking-widest font-bold uppercase">
                        Control Center
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-1 rounded-lg text-white/60 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex flex-col gap-1 mt-4 overflow-y-auto max-h-[70vh] scrollbar-thin">
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon
                    const isMatch = item.exact
                      ? location.pathname === item.to
                      : location.pathname.startsWith(item.to)
                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.exact}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                          isMatch ? 'bg-[#B7FF00] text-black font-bold' : 'text-white/70 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon size={16} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#B7FF00] text-black font-bold">
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    )
                  })}
                </nav>
              </div>

              <div className="pt-3 border-t border-[#142015] flex items-center justify-between">
                <button
                  onClick={() => {
                    logout()
                    setMobileOpen(false)
                  }}
                  className="text-xs text-red-400 hover:underline flex items-center gap-1.5"
                >
                  <LogOut size={14} /> Logout
                </button>
                <Link to="/" className="text-xs text-white/40 hover:text-white">
                  Storefront →
                </Link>
              </div>
            </aside>
          </div>
        )}

        {/* ── RIGHT MAIN WRAPPER ───────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar matching screenshot */}
          <header className="h-16 bg-[#080B08]/95 backdrop-blur-xl border-b border-[#142015] px-4 md:px-8 flex items-center justify-between sticky top-0 z-20">
            {/* Mobile menu toggle */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setMobileOpen(true)}
                className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/5"
              >
                <Menu size={20} />
              </button>
              <img src={logoImg} alt="Monster Energy" className="w-6 h-6 object-contain" />
            </div>

            {/* Global Search Bar with ⌘K */}
            <div className="relative flex-1 max-w-md hidden md:block">
              <div
                onClick={() => setSearchOpen(true)}
                className="w-full flex items-center justify-between bg-[#0D140E] border border-[#1C2C1D] hover:border-[#B7FF00]/50 rounded-xl px-3.5 py-2 text-xs text-white/50 cursor-pointer transition shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <Search size={15} className="text-white/40" />
                  <span>Search products, orders, customers...</span>
                </div>
                <kbd className="px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] text-white/40 font-mono">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Right utilities group */}
            <div className="flex items-center gap-3 md:gap-4 ml-auto">
              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => {
                    setNotifOpen(!notifOpen)
                    setDateOpen(false)
                    setUserMenuOpen(false)
                  }}
                  className="relative p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition"
                  title="Notifications"
                >
                  <Bell size={18} />
                  {unreadNotifs.length > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#B7FF00] text-black text-[9px] font-black flex items-center justify-center shadow-[0_0_8px_#B7FF00]">
                      {unreadNotifs.length}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0B100C] border border-[#1F2F20] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.85)] p-4 z-40 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="font-display text-sm tracking-wider">NOTIFICATIONS</div>
                      <Link
                        to="/dashboard/notifications"
                        onClick={() => setNotifOpen(false)}
                        className="text-[11px] text-[#B7FF00] hover:underline"
                      >
                        View All
                      </Link>
                    </div>
                    <div className="divide-y divide-white/5 max-h-72 overflow-y-auto scrollbar-thin mt-2">
                      {notifications.slice(0, 4).map((n) => (
                        <div
                          key={n.id}
                          className="py-2.5 px-2 hover:bg-white/5 rounded-lg transition flex items-start gap-2.5"
                        >
                          {n.type === 'out_of_stock' ? (
                            <AlertTriangle size={15} className="text-red-400 shrink-0 mt-0.5" />
                          ) : n.type === 'low_stock' ? (
                            <AlertTriangle size={15} className="text-amber-400 shrink-0 mt-0.5" />
                          ) : (
                            <Info size={15} className="text-[#B7FF00] shrink-0 mt-0.5" />
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-semibold text-white truncate">{n.title}</div>
                            <div className="text-[11px] text-white/50 leading-snug line-clamp-2 mt-0.5">
                              {n.message}
                            </div>
                            <div className="text-[10px] text-white/30 mt-1">{n.timestamp}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Date Filter Dropdown */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => {
                    setDateOpen(!dateOpen)
                    setNotifOpen(false)
                    setUserMenuOpen(false)
                  }}
                  className="flex items-center gap-2 bg-[#0D140E] border border-[#1C2C1D] hover:border-[#B7FF00]/40 rounded-xl px-3 py-1.5 text-xs text-white/80 transition"
                >
                  <Calendar size={14} className="text-[#B7FF00]" />
                  <span>{dateRange}</span>
                  <ChevronDown size={13} className="text-white/40" />
                </button>
                {dateOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-[#0B100C] border border-[#1F2F20] rounded-xl shadow-xl py-1.5 z-40">
                    {['Today', 'Last 7 days', 'Last 30 days', 'Last 90 days', 'This Month'].map(
                      (opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setDateRange(opt)
                            setDateOpen(false)
                          }}
                          className={`w-full text-left px-3.5 py-1.5 text-xs hover:bg-white/5 transition ${
                            dateRange === opt ? 'text-[#B7FF00] font-bold' : 'text-white/70'
                          }`}
                        >
                          {opt}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Admin Profile User Pill */}
              <div className="relative">
                <button
                  onClick={() => {
                    setUserMenuOpen(!userMenuOpen)
                    setNotifOpen(false)
                    setDateOpen(false)
                  }}
                  className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl hover:bg-white/5 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-[#B7FF00]/20 border border-[#B7FF00] flex items-center justify-center text-[#B7FF00] font-bold text-xs shrink-0">
                    A
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-xs font-semibold text-white leading-tight">Admin</div>
                    <div className="text-[10px] text-white/40 leading-tight">Super Admin</div>
                  </div>
                  <ChevronDown size={13} className="hidden sm:block text-white/40" />
                </button>

                {/* Profile menu dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#0B100C] border border-[#1F2F20] rounded-xl shadow-2xl p-1.5 z-40">
                    <div className="px-3 py-2 border-b border-white/5 mb-1">
                      <div className="text-xs font-bold text-white">{currentUser.name}</div>
                      <div className="text-[10px] text-white/40 truncate">{currentUser.email}</div>
                    </div>
                    <Link
                      to="/"
                      target="_blank"
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition"
                    >
                      <ExternalLink size={13} /> View Storefront
                    </Link>
                    <Link
                      to="/dashboard/settings"
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition"
                    >
                      <Settings size={13} /> Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setUserMenuOpen(false)
                      }}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition text-left mt-1"
                    >
                      <LogOut size={13} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* ── MAIN CONTENT CONTAINER ────────────────────────────── */}
          <main className="flex-1 p-4 md:p-8 max-w-[1600px] w-full mx-auto">
            <Outlet />
          </main>

          {/* ── FOOTER MATCHING SCREENSHOT ───────────────────────── */}
          <footer className="border-t border-[#142015] px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40 bg-[#060806]">
            <div className="flex items-center gap-2.5">
              <img src={logoImg} alt="Monster Energy" className="w-5 h-5 object-contain" />
              <span className="font-display text-xs tracking-wider text-white">MONSTER ENERGY</span>
              <span className="text-white/20">|</span>
              <span className="text-[10px] tracking-widest text-[#B7FF00] font-semibold uppercase">
                FUEL YOUR WORLD
              </span>
            </div>
            <div>© 2025 Monster Energy. All rights reserved.</div>
          </footer>
        </div>
      </div>

      {/* ── GLOBAL SEARCH MODAL (CMD+K) ───────────────────────────── */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-[#090E0A] border border-[#1E2E1F] rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.9)] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <Search size={20} className="text-[#B7FF00]" />
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, SKUs, order numbers, customers..."
                className="w-full bg-transparent text-white placeholder-white/40 text-base outline-none font-medium"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-xs text-white/40 hover:text-white px-2 py-1 rounded border border-white/20"
              >
                ESC
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-3 divide-y divide-white/5">
              {searchQuery.trim() === '' ? (
                <div className="p-8 text-center text-xs text-white/40">
                  Type to search across <span className="text-[#B7FF00]">Products</span>,{' '}
                  <span className="text-[#B7FF00]">Orders</span>, and{' '}
                  <span className="text-[#B7FF00]">Customers</span>.
                </div>
              ) : (
                <>
                  {filteredProducts.length > 0 && (
                    <div className="pb-3">
                      <div className="text-[10px] uppercase font-bold text-[#B7FF00] tracking-widest px-3 py-1">
                        Products ({filteredProducts.length})
                      </div>
                      {filteredProducts.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            navigate('/dashboard/products')
                            setSearchOpen(false)
                          }}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition"
                        >
                          <div className="flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-8 h-8 object-contain" />
                            <div>
                              <div className="text-xs font-semibold text-white">{p.name}</div>
                              <div className="text-[10px] text-white/40">
                                {p.sku} • {p.category.toUpperCase()}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-[#B7FF00]">
                            ${p.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {filteredOrders.length > 0 && (
                    <div className="pt-3">
                      <div className="text-[10px] uppercase font-bold text-white/60 tracking-widest px-3 py-1">
                        Orders ({filteredOrders.length})
                      </div>
                      {filteredOrders.map((o) => (
                        <div
                          key={o.id}
                          onClick={() => {
                            navigate('/dashboard/orders')
                            setSearchOpen(false)
                          }}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition"
                        >
                          <div>
                            <div className="text-xs font-semibold text-white">
                              {o.number} — {o.customerName}
                            </div>
                            <div className="text-[10px] text-white/40">{o.date}</div>
                          </div>
                          <span className="text-xs font-bold text-white">
                            ${o.total.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {filteredProducts.length === 0 && filteredOrders.length === 0 && (
                    <div className="p-8 text-center text-xs text-white/40">
                      No matching records found for "{searchQuery}".
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
