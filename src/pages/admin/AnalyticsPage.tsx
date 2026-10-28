import { SalesChart } from '../../components/dashboard/SalesChart'
import { useDemoStore } from '../../store/demoStore'
import { formatCurrency } from '../../utils/formatCurrency'

export default function AdminAnalytics() {
  const products = useDemoStore((s) => s.products)
  const data = [
    { label: 'Jan', value: 420 }, { label: 'Feb', value: 510 }, { label: 'Mar', value: 480 },
    { label: 'Apr', value: 620 }, { label: 'May', value: 700 }, { label: 'Jun', value: 640 },
  ]
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl">Analytics</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-card p-4"><div className="text-xs text-muted">Revenue</div><div className="font-display text-2xl text-neon">{formatCurrency(0)}</div></div>
        <div className="bg-card border border-border rounded-card p-4"><div className="text-xs text-muted">Products</div><div className="font-display text-2xl text-neon">{products.length}</div></div>
      </div>
      <SalesChart data={data} />
      <div className="bg-card border border-border rounded-card p-5">
        <div className="font-display text-lg mb-3">Top Products (Demo)</div>
        {products.slice(0, 5).map((p, i) => (
          <div key={p.id} className="flex items-center gap-3 py-2 border-b border-border/50 text-sm">
            <span className="text-muted">{i + 1}</span>
            <img src={p.image} alt={p.name} className="w-8 h-8 object-contain drink-can" />
            <span className="flex-1">{p.name}</span>
            <span className="text-neon">{Math.floor(Math.random() * 50 + 10)} sold</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted">Demo analytics. No real tracking or server-side data.</p>
    </div>
  )
}
