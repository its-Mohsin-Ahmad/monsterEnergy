import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDemoStore } from '../store/demoStore'
import { formatCurrency } from '../utils/formatCurrency'

const statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled']

export default function OrdersPage() {
  const orders = useDemoStore((s) => s.orders)
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter)
  return (
    <div className="px-4 md:px-8 py-6 space-y-6">
      <div>
        <h1 className="font-display text-3xl">YOUR ORDERS</h1>
        <p className="text-sm text-muted mt-1">{orders.length} orders (demo data)</p>
      </div>
      <div className="flex gap-2 flex-wrap">
        {statuses.map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-full text-xs border ${filter === s ? 'bg-neon text-black border-neon' : 'border-border text-text-2 hover:border-neon'}`}>{s}</button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map((o) => (
          <div key={o.id} className="bg-card border border-border rounded-card p-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="font-semibold">{o.number}</div>
              <div className="text-xs text-muted">{o.date} · {o.customerName}</div>
            </div>
            <div className="text-sm">{o.items.length} items</div>
            <div className="text-neon font-semibold">{formatCurrency(o.total)}</div>
            <span className="text-xs px-2 py-1 rounded bg-card-elev border border-border">{o.status}</span>
            <Link to={`/orders/${o.id}`} className="text-sm text-neon hover:underline">View</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
