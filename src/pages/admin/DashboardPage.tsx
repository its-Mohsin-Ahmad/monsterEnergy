import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  DollarSign,
  ShoppingCart,
  Clock,
  Users,
  Package,
  AlertTriangle,
  AlertCircle,
  Database,
  Calendar,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Truck,
  CreditCard,
  MoreHorizontal,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { useAdminStore } from '../../store/adminStore'

// Chart data matching screenshot dates & values
const salesPerformanceData = [
  { date: 'Apr 24', revenue: 1950, orders: 28, items: 92 },
  { date: 'Apr 25', revenue: 2380, orders: 35, items: 110 },
  { date: 'Apr 26', revenue: 2900, orders: 42, items: 145 },
  { date: 'Apr 27', revenue: 4100, orders: 58, items: 198 },
  { date: 'Apr 28', revenue: 3950, orders: 54, items: 180 },
  { date: 'Apr 29', revenue: 5100, orders: 72, items: 240 },
  { date: 'Apr 30', revenue: 4512, orders: 63, items: 215 },
]

// Category doughnut breakdown matching screenshot
const categoryData = [
  { name: 'Original', value: 38.2, color: '#B7FF00' },
  { name: 'Ultra', value: 24.7, color: '#00D2FF' },
  { name: 'Juice & Punch', value: 16.3, color: '#8A2BE2' },
  { name: 'Rehab', value: 10.8, color: '#FFB800' },
  { name: 'Java', value: 6.4, color: '#FF5500' },
  { name: 'Others', value: 3.6, color: '#A0AEC0' },
]

function Sparkline({ color = '#B7FF00', points = '5,20 15,18 25,22 35,14 45,16 55,8 65,12 75,5' }: { color?: string; points?: string }) {
  return (
    <svg className="w-16 h-8 overflow-visible" viewBox="0 0 80 25" fill="none">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  )
}

export default function AdminDashboardPage() {
  const [salesMetric, setSalesMetric] = useState<'revenue' | 'orders' | 'items'>('revenue')
  const [refreshing, setRefreshing] = useState(false)

  const products = useAdminStore((s) => s.products)
  const orders = useAdminStore((s) => s.orders)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 600)
  }

  // Top selling products with real can thumbnails
  const topSelling = [
    {
      name: 'Monster Energy Original',
      image: products[0]?.image || '',
      unitsSold: '1,250',
      revenue: '$3,487.50',
    },
    {
      name: 'Monster Ultra',
      image: products[1]?.image || '',
      unitsSold: '980',
      revenue: '$2,842.00',
    },
    {
      name: 'Monster Energy Zero Sugar',
      image: products[2]?.image || '',
      unitsSold: '760',
      revenue: '$2,180.40',
    },
    {
      name: 'Monster Rehab',
      image: products[3]?.image || '',
      unitsSold: '540',
      revenue: '$1,621.50',
    },
    {
      name: 'Monster Mango Loco',
      image: products[4]?.image || '',
      unitsSold: '420',
      revenue: '$1,305.60',
    },
  ]

  // Inventory alert rows matching screenshot
  const inventoryAlerts = [
    {
      name: 'Monster Energy Original (16oz)',
      image: products[0]?.image || '',
      stock: 12,
      status: 'Low stock',
    },
    {
      name: 'Monster Ultra (16oz)',
      image: products[1]?.image || '',
      stock: 0,
      status: 'Out of stock',
    },
    {
      name: 'Monster Mango Loco (16oz)',
      image: products[4]?.image || '',
      stock: 8,
      status: 'Low stock',
    },
    {
      name: 'Rehab Tea + Lemon (16oz)',
      image: products[3]?.image || '',
      stock: 15,
      status: 'Low stock',
    },
    {
      name: 'Monster Java (15oz)',
      image: products[5]?.image || products[0]?.image || '',
      stock: 0,
      status: 'Out of stock',
    },
  ]

  return (
    <div className="space-y-6">
      {/* ── TOP HEADER SECTION ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-1">
            Welcome back, Admin! Here&apos;s what&apos;s happening with your store.
          </p>
        </div>

        {/* Date chip + Refresh Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#0D140E] border border-[#1C2C1D] px-3.5 py-2 rounded-xl text-xs text-white/80">
            <Calendar size={14} className="text-[#B7FF00]" />
            <span>Apr 24, 2025 – Apr 30, 2025</span>
          </div>

          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 bg-[#0D140E] hover:bg-white/5 border border-[#1C2C1D] px-3.5 py-2 rounded-xl text-xs text-white/80 hover:text-white transition"
          >
            <RefreshCw size={14} className={`text-[#B7FF00] ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* ── 8 SUMMARY KPI CARDS (2 ROWS OF 4) ──────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Total Revenue */}
        <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-5 relative overflow-hidden group hover:border-[#B7FF00]/40 transition">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#B7FF00]/10 border border-[#B7FF00]/30 flex items-center justify-center text-[#B7FF00]">
              <DollarSign size={20} />
            </div>
            <Sparkline color="#B7FF00" points="5,22 15,19 25,18 35,12 45,15 55,8 65,11 75,4" />
          </div>
          <div className="mt-4">
            <div className="text-xs text-white/50">Total Revenue</div>
            <div className="font-display text-3xl text-white tracking-wide mt-1">$24,892.45</div>
            <div className="flex items-center gap-1.5 text-xs text-[#B7FF00] mt-1.5 font-medium">
              <TrendingUp size={14} />
              <span>12.5%</span>
              <span className="text-white/40 font-normal">vs. previous 7 days</span>
            </div>
          </div>
        </div>

        {/* 2. Total Orders */}
        <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-5 relative overflow-hidden group hover:border-[#B7FF00]/40 transition">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#B7FF00]/10 border border-[#B7FF00]/30 flex items-center justify-center text-[#B7FF00]">
              <ShoppingCart size={20} />
            </div>
            <Sparkline color="#B7FF00" points="5,20 15,17 25,18 35,13 45,14 55,9 65,10 75,5" />
          </div>
          <div className="mt-4">
            <div className="text-xs text-white/50">Total Orders</div>
            <div className="font-display text-3xl text-white tracking-wide mt-1">342</div>
            <div className="flex items-center gap-1.5 text-xs text-[#B7FF00] mt-1.5 font-medium">
              <TrendingUp size={14} />
              <span>8.3%</span>
              <span className="text-white/40 font-normal">vs. previous 7 days</span>
            </div>
          </div>
        </div>

        {/* 3. Pending Orders */}
        <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-5 relative overflow-hidden group hover:border-amber-400/40 transition">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Clock size={20} />
            </div>
            <Sparkline color="#FBBF24" points="5,8 15,10 25,12 35,16 45,15 55,18 65,20 75,22" />
          </div>
          <div className="mt-4">
            <div className="text-xs text-white/50">Pending Orders</div>
            <div className="font-display text-3xl text-white tracking-wide mt-1">28</div>
            <div className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5 font-medium">
              <TrendingDown size={14} />
              <span>20.0%</span>
              <span className="text-white/40 font-normal">vs. previous 7 days</span>
            </div>
          </div>
        </div>

        {/* 4. Total Customers */}
        <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-5 relative overflow-hidden group hover:border-[#B7FF00]/40 transition">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#B7FF00]/10 border border-[#B7FF00]/30 flex items-center justify-center text-[#B7FF00]">
              <Users size={20} />
            </div>
            <Sparkline color="#B7FF00" points="5,21 15,19 25,17 35,14 45,13 55,10 65,8 75,6" />
          </div>
          <div className="mt-4">
            <div className="text-xs text-white/50">Total Customers</div>
            <div className="font-display text-3xl text-white tracking-wide mt-1">1,248</div>
            <div className="flex items-center gap-1.5 text-xs text-[#B7FF00] mt-1.5 font-medium">
              <TrendingUp size={14} />
              <span>6.7%</span>
              <span className="text-white/40 font-normal">vs. previous 7 days</span>
            </div>
          </div>
        </div>

        {/* 5. Total Products */}
        <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-5 relative overflow-hidden group hover:border-[#B7FF00]/40 transition">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#B7FF00]/10 border border-[#B7FF00]/30 flex items-center justify-center text-[#B7FF00]">
              <Package size={20} />
            </div>
            <Sparkline color="#B7FF00" points="5,19 15,18 25,17 35,16 45,15 55,14 65,12 75,10" />
          </div>
          <div className="mt-4">
            <div className="text-xs text-white/50">Total Products</div>
            <div className="font-display text-3xl text-white tracking-wide mt-1">86</div>
            <div className="flex items-center gap-1.5 text-xs text-[#B7FF00] mt-1.5 font-medium">
              <TrendingUp size={14} />
              <span>3.6%</span>
              <span className="text-white/40 font-normal">vs. previous 7 days</span>
            </div>
          </div>
        </div>

        {/* 6. Low Stock Products */}
        <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-5 relative overflow-hidden group hover:border-amber-400/40 transition">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <AlertTriangle size={20} />
            </div>
            <Sparkline color="#F87171" points="5,22 15,19 25,15 35,14 45,10 55,8 65,11 75,6" />
          </div>
          <div className="mt-4">
            <div className="text-xs text-white/50">Low Stock Products</div>
            <div className="font-display text-3xl text-white tracking-wide mt-1">7</div>
            <div className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5 font-medium">
              <TrendingUp size={14} />
              <span>46.2%</span>
              <span className="text-white/40 font-normal">vs. previous 7 days</span>
            </div>
          </div>
        </div>

        {/* 7. Out of Stock Products */}
        <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-5 relative overflow-hidden group hover:border-red-400/40 transition">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-red-400/10 border border-red-400/30 flex items-center justify-center text-red-400">
              <AlertCircle size={20} />
            </div>
            <Sparkline color="#EF4444" points="5,10 15,14 25,18 35,16 45,19 55,20 65,22 75,23" />
          </div>
          <div className="mt-4">
            <div className="text-xs text-white/50">Out of Stock Products</div>
            <div className="font-display text-3xl text-white tracking-wide mt-1">2</div>
            <div className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5 font-medium">
              <TrendingDown size={14} />
              <span>60.0%</span>
              <span className="text-white/40 font-normal">vs. previous 7 days</span>
            </div>
          </div>
        </div>

        {/* 8. Total Stock Units */}
        <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-5 relative overflow-hidden group hover:border-[#B7FF00]/40 transition">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#B7FF00]/10 border border-[#B7FF00]/30 flex items-center justify-center text-[#B7FF00]">
              <Database size={20} />
            </div>
            <Sparkline color="#B7FF00" points="5,20 15,18 25,15 35,16 45,12 55,10 65,9 75,7" />
          </div>
          <div className="mt-4">
            <div className="text-xs text-white/50">Total Stock Units</div>
            <div className="font-display text-3xl text-white tracking-wide mt-1">4,320</div>
            <div className="flex items-center gap-1.5 text-xs text-[#B7FF00] mt-1.5 font-medium">
              <TrendingUp size={14} />
              <span>5.1%</span>
              <span className="text-white/40 font-normal">vs. previous 7 days</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MIDDLE ROW: SALES PERFORMANCE / SALES BY CATEGORY / OPERATIONAL ALERTS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Performance Area Chart (5 cols) */}
        <div className="lg:col-span-5 bg-[#0B100C] border border-[#182619] rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[#B7FF00] font-bold text-base">📊</span>
              <h2 className="font-display text-lg text-white tracking-wide">Sales Performance</h2>
            </div>
            {/* Metric switcher tabs */}
            <div className="flex items-center bg-[#070B07] border border-white/10 rounded-lg p-0.5 text-[11px]">
              {(['revenue', 'orders', 'items'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setSalesMetric(m)}
                  className={`px-2.5 py-1 rounded-md capitalize font-semibold transition ${
                    salesMetric === m
                      ? 'bg-[#B7FF00] text-black shadow-sm'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {m === 'items' ? 'Items Sold' : m}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="neonGreenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B7FF00" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#B7FF00" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#ffffff30" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#ffffff30"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => (salesMetric === 'revenue' ? `$${val}` : `${val}`)}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#090E0A',
                    borderColor: '#1E2E1F',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                  formatter={(val: number) => [
                    salesMetric === 'revenue' ? `$${val.toLocaleString()}` : `${val} units`,
                    salesMetric.toUpperCase(),
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey={salesMetric}
                  stroke="#B7FF00"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#neonGreenGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category Doughnut (3.5 cols / span 3) */}
        <div className="lg:col-span-4 bg-[#0B100C] border border-[#182619] rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#B7FF00] font-bold text-base">🔔</span>
            <h2 className="font-display text-lg text-white tracking-wide">Sales by Category</h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-auto">
            {/* Donut Chart with Center Text */}
            <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={68}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#070B07" strokeWidth={2} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="font-display text-xl text-white font-bold leading-tight">$24.9K</div>
                <div className="text-[10px] text-white/50 leading-tight">Total Sales</div>
              </div>
            </div>

            {/* Legend list */}
            <div className="space-y-1.5 flex-1 w-full sm:w-auto">
              {categoryData.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="text-white/70">{c.name}</span>
                  </div>
                  <span className="text-white font-semibold">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Operational Alerts Card (3.5 cols / span 3) */}
        <div className="lg:col-span-3 bg-[#0B100C] border border-[#182619] rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-[#B7FF00] font-bold text-base">🚨</span>
              <h2 className="font-display text-lg text-white tracking-wide">Operational Alerts</h2>
            </div>
            <Link to="/dashboard/notifications" className="text-xs text-[#B7FF00] hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-2.5 my-auto">
            {/* Out of Stock */}
            <Link
              to="/dashboard/inventory"
              className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/5 border border-white/5 transition"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
                  <AlertCircle size={15} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Out of Stock Products</div>
                  <div className="text-[10px] text-white/40">Products need immediate attention</div>
                </div>
              </div>
              <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                2
              </span>
            </Link>

            {/* Low Stock */}
            <Link
              to="/dashboard/inventory"
              className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/5 border border-white/5 transition"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <AlertTriangle size={15} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Low Stock Products</div>
                  <div className="text-[10px] text-white/40">Below minimum threshold</div>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                7
              </span>
            </Link>

            {/* Pending Orders */}
            <Link
              to="/dashboard/orders"
              className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/5 border border-white/5 transition"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                  <Clock size={15} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Pending Orders</div>
                  <div className="text-[10px] text-white/40">Awaiting processing</div>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
                28
              </span>
            </Link>

            {/* Orders Awaiting Shipment */}
            <Link
              to="/dashboard/orders"
              className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/5 border border-white/5 transition"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <Truck size={15} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Orders Awaiting Shipment</div>
                  <div className="text-[10px] text-white/40">Ready for dispatch</div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                12
              </span>
            </Link>

            {/* Payment Issues */}
            <Link
              to="/dashboard/orders"
              className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/5 border border-white/5 transition"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                  <CreditCard size={15} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Payment Issues</div>
                  <div className="text-[10px] text-white/40">Require manual review</div>
                </div>
              </div>
              <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
                3
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── BOTTOM ROW: RECENT ORDERS / TOP SELLING PRODUCTS / INVENTORY ALERTS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders Table (5 cols) */}
        <div className="lg:col-span-5 bg-[#0B100C] border border-[#182619] rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShoppingCart size={17} className="text-[#B7FF00]" />
              <h2 className="font-display text-lg text-white tracking-wide">Recent Orders</h2>
            </div>
            <Link to="/dashboard/orders" className="text-xs text-[#B7FF00] hover:underline">
              View All
            </Link>
          </div>

          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-[11px]">
                  <th className="pb-2.5 font-medium">Order #</th>
                  <th className="pb-2.5 font-medium">Date</th>
                  <th className="pb-2.5 font-medium">Customer</th>
                  <th className="pb-2.5 font-medium">Total</th>
                  <th className="pb-2.5 font-medium">Payment</th>
                  <th className="pb-2.5 font-medium">Status</th>
                  <th className="pb-2.5 font-medium text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.slice(0, 5).map((o) => (
                  <tr key={o.id} className="hover:bg-white/[0.02] transition">
                    <td className="py-2.5 font-mono text-white/90 font-medium">{o.number}</td>
                    <td className="py-2.5 text-white/50">{o.date}</td>
                    <td className="py-2.5 text-white font-medium truncate max-w-[100px]">
                      {o.customerName}
                    </td>
                    <td className="py-2.5 font-bold text-white">${o.total.toFixed(2)}</td>
                    <td className="py-2.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                          o.paymentStatus === 'paid'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : 'bg-amber-500/15 text-amber-400'
                        }`}
                      >
                        {o.paymentStatus}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                          o.fulfillmentStatus === 'delivered'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : o.fulfillmentStatus === 'shipped'
                            ? 'bg-blue-500/15 text-blue-400'
                            : o.fulfillmentStatus === 'processing'
                            ? 'bg-amber-500/15 text-amber-400'
                            : 'bg-yellow-500/15 text-yellow-400'
                        }`}
                      >
                        {o.fulfillmentStatus}
                      </span>
                    </td>
                    <td className="py-2.5 text-right">
                      <Link
                        to={`/dashboard/orders`}
                        className="text-white/40 hover:text-white p-1 rounded inline-block"
                      >
                        <MoreHorizontal size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products (3.5 cols / span 4) */}
        <div className="lg:col-span-4 bg-[#0B100C] border border-[#182619] rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[#B7FF00] font-bold text-base">🏆</span>
              <h2 className="font-display text-lg text-white tracking-wide">Top Selling Products</h2>
            </div>
            <Link to="/dashboard/products" className="text-xs text-[#B7FF00] hover:underline flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-12 text-[10px] text-white/40 uppercase font-semibold pb-1 border-b border-white/5">
              <div className="col-span-7">Product</div>
              <div className="col-span-2 text-right">Units Sold</div>
              <div className="col-span-3 text-right">Revenue</div>
            </div>

            {topSelling.map((p) => (
              <div key={p.name} className="grid grid-cols-12 items-center text-xs py-1">
                <div className="col-span-7 flex items-center gap-2.5 min-w-0 pr-2">
                  <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center p-0.5 shrink-0">
                    <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                  </div>
                  <span className="font-medium text-white truncate">{p.name}</span>
                </div>
                <div className="col-span-2 text-right text-white/60 font-mono text-[11px]">
                  {p.unitsSold}
                </div>
                <div className="col-span-3 text-right font-bold text-white text-[11px]">
                  {p.revenue}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Alerts (3.5 cols / span 3) */}
        <div className="lg:col-span-3 bg-[#0B100C] border border-[#182619] rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Package size={17} className="text-[#B7FF00]" />
              <h2 className="font-display text-lg text-white tracking-wide">Inventory Alerts</h2>
            </div>
            <Link to="/dashboard/inventory" className="text-xs text-[#B7FF00] hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-2.5">
            {inventoryAlerts.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center p-0.5 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">{item.name}</div>
                    <div className="text-[10px] text-white/40">{item.stock} left</div>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${
                    item.status === 'Out of stock'
                      ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                      : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
