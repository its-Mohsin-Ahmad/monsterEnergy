import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDemoStore } from '../../store/demoStore'
import { DataTable } from '../../components/dashboard/DataTable'

export default function AdminCustomers() {
  const customers = useDemoStore((s) => s.customers)
  const [q, setQ] = useState('')
  const filtered = customers.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.email.toLowerCase().includes(q.toLowerCase()))
  const rows = filtered.map((c) => ({
    name: c.name,
    email: c.email,
    orders: c.ordersCount,
    spent: `$${c.totalSpent.toFixed(2)}`,
    joined: c.registeredAt,
    actions: <Link to={`/admin/customers/${c.id}`} className="text-neon text-xs hover:underline">View</Link>,
  }))
  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl">Customers</h1>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="bg-card border border-border rounded-lg px-4 py-2.5 text-sm w-full max-w-sm focus:border-neon outline-none" />
      <DataTable columns={[
        { key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }, { key: 'orders', label: 'Orders' },
        { key: 'spent', label: 'Spent' }, { key: 'joined', label: 'Joined' }, { key: 'actions', label: '' },
      ]} rows={rows} />
    </div>
  )
}
