import { useParams, Link } from 'react-router-dom'
import { useDemoStore } from '../../store/demoStore'
import { formatCurrency } from '../../utils/formatCurrency'

export default function AdminCustomerDetails() {
  const { customerId } = useParams()
  const customers = useDemoStore((s) => s.customers)
  const orders = useDemoStore((s) => s.orders)
  const customer = customers.find((c) => c.id === customerId)
  if (!customer) return <div className="px-8 py-12">Customer not found.</div>
  const custOrders = orders.filter((o) => o.customerId === customerId)
  return (
    <div className="space-y-6 max-w-3xl">
      <Link to="/admin/customers" className="text-sm text-neon">← Back</Link>
      <div className="bg-card border border-border rounded-card p-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-card-elev flex items-center justify-center font-display text-xl">{customer.name[0]}</div>
        <div>
          <div className="font-display text-2xl">{customer.name}</div>
          <div className="text-sm text-text-2">{customer.email}</div>
          <div className="text-xs text-muted">Joined {customer.registeredAt}</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card border border-border rounded-card p-4 text-center"><div className="font-display text-2xl text-neon">{customer.ordersCount}</div><div className="text-xs text-muted">Orders</div></div>
        <div className="bg-card border border-border rounded-card p-4 text-center"><div className="font-display text-2xl text-neon">${customer.totalSpent.toFixed(0)}</div><div className="text-xs text-muted">Spent</div></div>
        <div className="bg-card border border-border rounded-card p-4 text-center"><div className="font-display text-2xl text-neon">{custOrders.length}</div><div className="text-xs text-muted">Demo Orders</div></div>
      </div>
      <div>
        <h2 className="font-display text-xl mb-3">Orders</h2>
        {custOrders.length === 0 && <div className="text-sm text-muted">No orders (demo data may use 'demo' customerId).</div>}
        {custOrders.map((o) => (
          <Link key={o.id} to={`/admin/orders/${o.id}`} className="block bg-card border border-border rounded-card p-4 mb-2 hover:border-neon">
            <div className="flex justify-between"><span>{o.number}</span><span className="text-neon">{formatCurrency(o.total)}</span></div>
            <div className="text-xs text-muted">{o.date} · {o.status}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
