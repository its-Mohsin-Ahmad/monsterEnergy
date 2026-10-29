import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, BarChart3, Package, ShoppingCart, Users, ShieldAlert, History, Tag, Truck, Monitor, Settings, LogOut, Search, User, AlertCircle, TrendingUp, DollarSign, Clock, ArrowRight, Plus, AlertTriangle } from 'lucide-react'
import { useAdminStore } from '../../store/adminStore'
import { formatCurrency } from '../../utils/formatCurrency'

const NAV_ITEMS = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/dashboard/' },
  { key: 'analytics', label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
  { key: 'products', label: 'Products', icon: Package, path: '/dashboard/products' },
  { key: 'inventory', label: 'Inventory & Stocks', icon: AlertCircle, path: '/dashboard/inventory' },
  { key: 'orders', label: 'Orders', icon: ShoppingCart, path: '/dashboard/orders' },
  { key: 'users', label: 'Users & Customers', icon: Users, path: '/dashboard/users' },
  { key: 'stock-movements', label: 'Stock Movements', icon: History, path: '/dashboard/stock-movements' },
  { key: 'coupons', label: 'Coupons', icon: Tag, path: '/dashboard/coupons' },
  { key: 'suppliers', label: 'Suppliers', icon: Truck, path: '/dashboard/suppliers' },
  { key: 'website-content', label: 'Website Content', icon: Monitor, path: '/dashboard/website-content' },
  { key: 'messages', label: 'Messages', icon: Clock, path: '/dashboard/messages' },
  { key: 'reports', label: 'Reports', icon: TrendingUp, path: '/dashboard/reports' },
  { key: 'audit-log', label: 'Audit Log', icon: ShieldAlert, path: '/dashboard/audit-log' },
  { key: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' },
] as const

const SUB_PAGE_MAP: Record<string, () => Promise<{ default: React.ComponentType<any> }>> = {
  analytics: () => import('../../pages/admin/AnalyticsPage').then((m) => ({ default: m.default })),
  products: () => import('../../pages/admin/ProductsPage').then((m) => ({ default: m.default })),
  inventory: () => import('../../pages/admin/InventoryPage').then((m) => ({ default: m.default })),
  orders: () => import('../../pages/admin/OrdersPage').then((m) => ({ default: m.default })),
  users: () => import('../../pages/admin/CustomersPage').then((m) => ({ default: m.default })),
  'stock-movements': () => import('../../pages/admin/StockMovementsPage').then((m) => ({ default: m.default })),
  coupons: () => import('../../pages/admin/CouponsPage').then((m) => ({ default: m.default })),
  suppliers: () => import('../../pages/admin/SuppliersPage').then((m) => ({ default: m.default })),
  'website-content': () => import('../../pages/admin/WebsiteContentPage').then((m) => ({ default: m.default })),
  messages: () => import('../../pages/admin/MessagesPage').then((m) => ({ default: m.default })),
  reports: () => import('../../pages/admin/ReportsPage').then((m) => ({ default: m.default })),
} as const

export default function UnifiedDashboardPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const { products, orders, stockMovements, activityLogs, adminUsers, notifications } = useAdminStore((s) => ({
    products: s.products, orders: s.orders, stockMovements: s.stockMovements, activityLogs: s.activityLogs, adminUsers: s.adminUsers, notifications: s.notifications,
  }))

  const [activeKey, setActiveKey] = useState<string>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const currentPath = location.pathname
  const matchedItem = NAV_ITEMS.find((i) => currentPath.startsWith(i.path.replace('/dashboard', '')) || currentPath === i.path)
  if (matchedItem) setActiveKey(matchedItem.key)

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0)
  const totalOrders = orders.length
  const totalProducts = products.length
  const lowStockCount = products.filter((p) => (p.stock || 0) <= (p.minStock || 15) && (p.stock || 0) > 0).length
  const outOfStockCount = products.filter((p) => (p.stock || 0) <= 0).length
  const totalStock = products.reduce((acc, p) => acc + (p.stock || 0), 0)

  const statCards = [
    { label: 'Total Revenue', value: formatCurrency(totalRevenue), icon: DollarSign, color: 'text-[#B7FF00]', trend: '+12.4%', trendColor: 'text-emerald-400' },
    { label: 'Total Orders', value: totalOrders.toString(), icon: ShoppingCart, color: 'text-[#00D2FF]', trend: '+8.2%', trendColor: 'text-emerald-400' },
    { label: 'Active Products', value: totalProducts.toString(), icon: Package, color: 'text-[#8A2BE2]', trend: '+3 new', trendColor: 'text-emerald-400' },
    { label: 'Total Stock Units', value: totalStock.toString(), icon: AlertCircle, color: (lowStockCount > 0 || outOfStockCount > 0) ? 'text-amber-400' : 'text-emerald-400', trend: lowStockCount > 0 ? lowStockCount + ' low stock' : 'All good', trendColor: lowStockCount > 0 ? 'text-amber-400' : 'text-emerald-400' },
  ]

  const SubPage = SUB_PAGE_MAP[activeKey]

  return (
    <div className="flex h-screen bg-[#050706] text-white overflow-hidden">
      <aside className={`fixed left-0 top-0 h-full w-64 bg-[#090E0A] border-r border-[#182619] transition-all duration-300 z-50 ${sidebarOpen ? '' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-[#182619]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#B7FF00]/20 flex items-center justify-center border border-[#B7FF00]/30">
              <Package size={20} className="text-[#B7FF00]" />
            </div>
            <span className="font-display font-bold text-xl tracking-wider">MONSTER<span className="text-[#B7FF00]">ADMIN</span></span>
          </div>
          <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">Energy Control Center</p>
        </div>

        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-140px)]">
          {NAV_ITEMS.map((item) => {
            const isActive = activeKey === item.key
            const Icon = item.icon
            return (
              <button
                key={item.key}
                onClick={() => { setActiveKey(item.key); navigate(item.path); if (!sidebarOpen) setSidebarOpen(true) }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-[#B7FF00]/10 border border-[#B7FF00]/30 text-[#B7FF00] shadow-[0_0_10px_rgba(183,255,0,0.15)]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
              >
                <Icon size={18} className={isActive ? 'text-[#B7FF00]' : 'text-white/50'} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#182619]">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 text-sm transition">
            <ArrowRight size={16} className="text-white/40" />
            <span>Back to Storefront</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden pl-[calc(64px+1rem)] pr-4 pt-4 pb-8 transition-all duration-300">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl text-white tracking-wide">{NAV_ITEMS.find((i) => i.key === activeKey)?.label || 'Dashboard'}</h1>
            <p className="text-xs text-white/50 mt-0.5">Monster Energy Admin Control Center</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 md:hidden">
              {sidebarOpen ? <User size={18} /> : <LayoutDashboard size={18} />}
            </button>
            <div className="relative hidden sm:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input type="text" placeholder="Search admin..." className="w-48 bg-[#0D140E] border border-[#1C2C1D] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/40 focus:border-[#B7FF00] outline-none transition" />
            </div>
            <div className="flex items-center gap-2 pl-4 border-l border-[#182619]">
              <span className="text-xs text-white/60">Admin</span>
              <button onClick={() => navigate('/login')} className="ml-2 text-xs text-[#B7FF00] hover:underline font-bold">Logout <LogOut size={14} /></button>
            </div>
          </div>
        </header>
        {activeKey === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map((card, i) => (
                <div key={i} className="bg-[#0B100C] border border-[#182619] rounded-2xl p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-white/40 uppercase font-semibold mb-1">{card.label}</div>
                      <div className="font-display text-2xl font-bold text-white">{card.value}</div>
                    </div>
                    <div className={`p-2.5 rounded-lg bg-white/5 ${card.color}`}>
                      <card.icon size={18} />
                    </div>
                  </div>
                  <div className={`text-[10px] font-semibold ${card.trendColor} mt-2`}>
                    ↑ {card.trend}
                  </div>
                </div>
        ))}
          </div>
        </div>
      )}
        {activeKey !== 'overview' && SubPage && <SubPage />}

        {activeKey !== 'overview' && !SubPage && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <AlertCircle size={48} className="text-white/20 mb-4" />
            <h2 className="text-xl text-white font-semibold">Page Under Construction</h2>
            <p className="text-white/50 mt-1 text-sm">The {activeKey} section is coming soon.</p>
          </div>
        )}
      </main>
    </div>
  )
}