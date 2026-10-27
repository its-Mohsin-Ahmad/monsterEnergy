import { StatCard } from '../../components/dashboard/StatCard'
import { SalesChart } from '../../components/dashboard/SalesChart'
import { useDemoStore } from '../../store/demoStore'
import { formatCurrency } from '../../utils/formatCurrency'

export default function AdminDashboard() {
  const products = useDemoStore((s) => s.products)
  const orders = useDemoStore((s) => s.orders)
  const customers = useDemoStore((s) => s.customers)
  const sales = orders.reduce((a, o) => a + o.total, 0)
  const chartData = [
    { label: 'Mon', value: 120 }, { label: 'Tue', value: 200 }, { label: 'Wed', value: 150 },
    { label: 'Thu', value: 280 }, { label: 'Fri', value: 320 }, { label: 'Sat', value: 260 }, { label: 'Sun', value: 190 },
  ]
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Welcome back (Demo)</h1>
        <p className="text-sm text-muted">Admin dashboard — demonstration data.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Demo Sales" value={formatCurrency(sales)} />
        <StatCard title="Demo Orders" value={orders.length} />
        <StatCard title="Demo Customers" value={customers.length} />
        <StatCard title="Active Products" value={products.filter((p) => p.status === 'published').length} />
      </div>
      <SalesChart data={chartData} />
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-card p-5">
          <div className="font-display text-lg mb-3">Best-Selling (Demo)</div>
          {products.slice(0, 5).map((p) => (
            <div key={p.id} className="flex items-center gap-3 py-2 border-b border-border/50">
              <img src={p.image} alt={p.name} className="w-10 h-10 object-contain drink-can" />
              <div className="flex-1 text-sm">{p.name}</div>
              <div className="text-xs text-muted">12 units</div>
              <div className="text-sm text-neon">{formatCurrency(p.price * 12)}</div>
            </div>
          ))}
        </div>
        <div className="bg-card border border-border rounded-card p-5">
          <div className="font-display text-lg mb-3">Recent Orders</div>
          {orders.slice(0, 5).map((o) => (
            <div key={o.id} className="flex justify-between py-2 border-b border-border/50 text-sm">
              <span>{o.number}</span>
              <span className="text-muted">{o.customerName}</span>
              <span className="text-neon">{formatCurrency(o.total)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <div className="font-display text-lg">Inventory Alerts</div>
        {products.filter((p) => p.stock < 25).map((p) => (
          <div key={p.id} className="bg-warn/10 border border-warn/40 rounded-lg px-4 py-2 text-sm flex justify-between">
            <span>{p.name}</span><span className="text-warn">{p.stock} left</span>
          </div>
        ))}
      </div>
    </div>
  )
}
