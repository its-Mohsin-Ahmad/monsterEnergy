import { useState } from 'react'
import {
  Users,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  X,
  ExternalLink,
} from 'lucide-react'
import { useAdminStore } from '../../store/adminStore'
import { useDemoStore } from '../../store/demoStore'
import { formatCurrency } from '../../utils/formatCurrency'
import type { Customer } from '../../types'

export default function AdminCustomersPage() {
  const demoCustomers = useDemoStore((s) => s.customers)
  const orders = useAdminStore((s) => s.orders)

  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  // Map customer data with order totals
  const customerList = demoCustomers.map((c) => {
    const custOrders = orders.filter((o) => o.customerName === c.name || o.customerEmail === c.email)
    const spent = custOrders.reduce((sum, o) => sum + o.total, c.totalSpent || 0)
    return {
      ...c,
      totalSpent: spent,
      ordersCount: custOrders.length || c.ordersCount || 1,
    }
  })

  const filtered = customerList.filter((c) => {
    const matchesQuery =
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase())
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter
    return matchesQuery && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* ── HEADER ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
            Customers Directory
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-1">
            View registered store customers, total lifetime spend, order history, and account statuses.
          </p>
        </div>

        <div className="text-xs text-white/50 bg-[#0B100C] border border-[#182619] px-4 py-2 rounded-xl">
          Total Customers: <span className="font-bold text-[#B7FF00]">{customerList.length}</span>
        </div>
      </div>

      {/* ── CONTROLS & SEARCH ─────────────────────────────────── */}
      <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by customer name or email..."
            className="w-full bg-[#0D140E] border border-[#1C2C1D] focus:border-[#B7FF00] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={14} className="text-white/40" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#0D140E] border border-[#1C2C1D] text-white/80 rounded-xl px-3 py-1.5 text-xs outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Accounts</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* ── CUSTOMERS TABLE ───────────────────────────────────── */}
      <div className="bg-[#0B100C] border border-[#182619] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-[11px] bg-white/[0.01]">
                <th className="py-3 px-4 font-semibold">Customer</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold text-center">Orders</th>
                <th className="py-3 px-4 font-semibold">Total Spent</th>
                <th className="py-3 px-4 font-semibold">Member Since</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#B7FF00]/15 border border-[#B7FF00]/30 flex items-center justify-center font-bold text-xs text-[#B7FF00]">
                        {c.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-white">{c.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-white/60 font-mono text-[11px]">{c.email}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-white">{c.ordersCount}</td>
                  <td className="py-3.5 px-4 font-bold text-[#B7FF00]">
                    {formatCurrency(c.totalSpent)}
                  </td>
                  <td className="py-3.5 px-4 text-white/50">{c.registeredAt}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                        c.status === 'active'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-white/10 text-white/40'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedCustomer(c)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#0D140E] hover:bg-[#B7FF00] hover:text-black border border-[#1C2C1D] text-white/80 transition text-xs font-semibold"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── CUSTOMER DETAIL MODAL ─────────────────────────────── */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedCustomer(null)} />
          <div className="relative w-full max-w-lg bg-[#090E0A] border border-[#1E2E1F] rounded-2xl shadow-2xl p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#B7FF00]/20 border border-[#B7FF00] flex items-center justify-center font-bold text-base text-[#B7FF00]">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-display text-xl text-white">{selectedCustomer.name}</h2>
                  <div className="text-xs text-white/50">Customer Profile</div>
                </div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="text-white/40 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div>
                  <div className="text-[10px] text-white/40 uppercase font-semibold">Lifetime Spend</div>
                  <div className="font-display text-2xl text-[#B7FF00] mt-0.5">
                    {formatCurrency(selectedCustomer.totalSpent)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-white/40 uppercase font-semibold">Total Orders Placed</div>
                  <div className="font-display text-2xl text-white mt-0.5">
                    {selectedCustomer.ordersCount} orders
                  </div>
                </div>
              </div>

              <div className="space-y-2 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-2 text-white/70">
                  <Mail size={14} className="text-[#B7FF00]" />
                  <span>{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Calendar size={14} className="text-[#B7FF00]" />
                  <span>Member since: {selectedCustomer.registeredAt}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <ShieldCheck size={14} className="text-[#B7FF00]" />
                  <span>Account Status: <strong className="text-emerald-400 capitalize">{selectedCustomer.status}</strong></span>
                </div>
              </div>

              <div className="pt-2 text-right">
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="px-4 py-2 rounded-xl bg-[#B7FF00] text-black font-bold uppercase tracking-wider text-xs"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
