import { useParams, Link } from 'react-router-dom'
import { useDemoStore } from '../../store/demoStore'

export default function AdminCustomerDetails() {
  const { customerId } = useParams()
  const customers = useDemoStore((s) => s.customers)
  const customer = customers.find((c) => c.id === customerId)
  if (!customer) return <div className="px-8 py-12">Customer not found.</div>
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
      <div className="grid grid-cols-1 gap-3">
        <div className="bg-card border border-border rounded-card p-4 text-center"><div className="font-display text-2xl text-neon">${customer.totalSpent.toFixed(0)}</div><div className="text-xs text-muted">Spent</div></div>
      </div>
    </div>
  )
}
