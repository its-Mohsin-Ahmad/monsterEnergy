import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDemoStore } from '../../store/demoStore'
import { formatCurrency } from '../../utils/formatCurrency'
import { DataTable } from '../../components/dashboard/DataTable'

const statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled']

export default function AdminOrders() {
  const orders = useDemoStore((s) => s.orders)
  const updateOrder = useDemoStore((s) => s.updateOrder)
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter)
  const rows = filtered.map((o) => ({
    number: o.number,
    customer: o.customerName,
    items: o.items.length,
    total: formatCurrency(o.total),
    payment: o.paymentStatus,
    status: (
      <select value={o.status} onChange={(e) => updateOrder(o.id, { status: e.target.value as any })} className="bg-bg border border-border rounded px-2 py-1 text-xs">
        {statuses.filter((s) => s !== 'all').map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
    ),
    date: o.date,
    actions: <Link to={`/admin/orders/${o.id}`} className="text-neon text-xs hover:underline">View</Link>,
  }))
  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl">Orders</h1>
      <div className="flex gap-2 flex-wrap">
        {statuses.map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-full text-xs border ${filter === s ? 'bg-neon text-black border-neon' : 'border-border text-text-2'}`}>{s}</button>
        ))}
      </div>
      <DataTable columns={[
        { key: 'number', label: 'Order' }, { key: 'customer', label: 'Customer' }, { key: 'items', label: 'Items' },
        { key: 'total', label: 'Total' }, { key: 'payment', label: 'Payment' }, { key: 'status', label: 'Status' },
        { key: 'date', label: 'Date' }, { key: 'actions', label: '' },
      ]} rows={rows} />
    </div>
  )
}
