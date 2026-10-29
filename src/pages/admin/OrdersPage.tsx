import { useState } from 'react'
import {
  ShoppingCart,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Eye,
  FileText,
  X,
  CreditCard,
  MapPin,
  Calendar,
} from 'lucide-react'
import { useAdminStore } from '../../store/adminStore'
import { formatCurrency } from '../../utils/formatCurrency'
import type { Order } from '../../types'

export default function AdminOrdersPage() {
  const orders = useAdminStore((s) => s.orders)
  const updateOrderStatus = useAdminStore((s) => s.updateOrderStatus)
  const updatePaymentStatus = useAdminStore((s) => s.updatePaymentStatus)

  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filtered = orders.filter((o) => {
    const matchesQuery =
      o.number.toLowerCase().includes(query.toLowerCase()) ||
      o.customerName.toLowerCase().includes(query.toLowerCase()) ||
      (o.customerEmail && o.customerEmail.toLowerCase().includes(query.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || o.fulfillmentStatus === statusFilter
    return matchesQuery && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* ── HEADER ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
            Orders & Fulfillment
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-1">
            Track customer orders, manage shipments, confirm payment transactions, and handle returns.
          </p>
        </div>
      </div>

      {/* ── FILTERS ───────────────────────────────────────────── */}
      <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search order #, customer name, email..."
            className="w-full bg-[#0D140E] border border-[#1C2C1D] focus:border-[#B7FF00] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-[#070B07] border border-white/10 rounded-xl p-1 text-xs">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'pending', label: 'Pending' },
            { id: 'processing', label: 'Processing' },
            { id: 'shipped', label: 'Shipped' },
            { id: 'delivered', label: 'Delivered' },
            { id: 'cancelled', label: 'Cancelled' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                statusFilter === tab.id
                  ? 'bg-[#B7FF00] text-black font-bold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── ORDERS TABLE ──────────────────────────────────────── */}
      <div className="bg-[#0B100C] border border-[#182619] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-[11px] bg-white/[0.01]">
                <th className="py-3 px-4 font-semibold">Order #</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Customer</th>
                <th className="py-3 px-4 font-semibold">Items</th>
                <th className="py-3 px-4 font-semibold">Total Amount</th>
                <th className="py-3 px-4 font-semibold">Payment</th>
                <th className="py-3 px-4 font-semibold">Fulfillment Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 px-4 font-mono font-bold text-white">{o.number}</td>
                  <td className="py-3 px-4 text-white/50">{o.date}</td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{o.customerName}</div>
                    <div className="text-[10px] text-white/40">{o.customerEmail || 'No email provided'}</div>
                  </td>
                  <td className="py-3 px-4 text-white/70">
                    {o.items.reduce((acc, i) => acc + i.quantity, 0)} units ({o.items.length} lines)
                  </td>
                  <td className="py-3 px-4 font-bold text-[#B7FF00]">{formatCurrency(o.total)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                        o.paymentStatus === 'paid'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : o.paymentStatus === 'pending'
                          ? 'bg-amber-500/15 text-amber-400'
                          : 'bg-red-500/15 text-red-400'
                      }`}
                    >
                      {o.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                        o.fulfillmentStatus === 'delivered'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : o.fulfillmentStatus === 'shipped'
                          ? 'bg-blue-500/15 text-blue-400'
                          : o.fulfillmentStatus === 'processing'
                          ? 'bg-amber-500/15 text-amber-400'
                          : o.fulfillmentStatus === 'cancelled'
                          ? 'bg-red-500/15 text-red-400'
                          : 'bg-yellow-500/15 text-yellow-400'
                      }`}
                    >
                      {o.fulfillmentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(o)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#0D140E] hover:bg-[#B7FF00] hover:text-black border border-[#1C2C1D] text-white/80 transition text-xs font-semibold flex items-center gap-1.5 ml-auto"
                    >
                      <Eye size={13} />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── ORDER DETAILS MODAL ───────────────────────────────── */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedOrder(null)} />
          <div className="relative w-full max-w-2xl bg-[#090E0A] border border-[#1E2E1F] rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.95)] p-6 z-10 max-h-[90vh] overflow-y-auto scrollbar-thin">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <div className="font-display text-2xl text-white">ORDER {selectedOrder.number}</div>
                <div className="text-xs text-white/50">{selectedOrder.date} • Placed online</div>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-white/40 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5 mt-4 text-xs">
              {/* Customer Info & Shipping Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div>
                  <div className="text-[10px] text-white/40 uppercase font-semibold mb-1">Customer</div>
                  <div className="font-bold text-white text-sm">{selectedOrder.customerName}</div>
                  <div className="text-white/60 mt-0.5">{selectedOrder.customerEmail}</div>
                  <div className="text-white/60">{selectedOrder.customerPhone || 'No phone'}</div>
                </div>
                <div>
                  <div className="text-[10px] text-white/40 uppercase font-semibold mb-1">Shipping Address</div>
                  <div className="text-white/80 flex items-start gap-1.5 leading-relaxed">
                    <MapPin size={14} className="text-[#B7FF00] shrink-0 mt-0.5" />
                    <span>{selectedOrder.shippingAddress || 'Standard Delivery, United States'}</span>
                  </div>
                </div>
              </div>

              {/* Items Purchased List */}
              <div>
                <div className="font-display text-sm text-white uppercase tracking-wider mb-2">
                  Order Line Items
                </div>
                <div className="divide-y divide-white/5 border border-white/5 rounded-xl overflow-hidden bg-black/20">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">{item.productName || 'Monster Drink'}</div>
                        <div className="text-[10px] text-white/40">
                          Qty: {item.quantity} × {formatCurrency(item.price)}
                        </div>
                      </div>
                      <div className="font-bold text-[#B7FF00]">
                        {formatCurrency(item.quantity * item.price)}
                      </div>
                    </div>
                  ))}
                  <div className="p-3 bg-white/[0.02] flex items-center justify-between font-bold text-sm">
                    <span>Grand Total</span>
                    <span className="text-[#B7FF00] font-display text-lg">
                      {formatCurrency(selectedOrder.total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Update Quick Controls */}
              <div className="p-4 rounded-xl bg-[#0D140E] border border-[#1C2C1D]">
                <div className="font-semibold text-white mb-2.5">Update Fulfillment Progress:</div>
                <div className="flex flex-wrap items-center gap-2">
                  {(['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        updateOrderStatus(selectedOrder.id, st, st)
                        setSelectedOrder({ ...selectedOrder, status: st, fulfillmentStatus: st })
                      }}
                      className={`px-3 py-1.5 rounded-lg font-bold capitalize text-xs transition ${
                        selectedOrder.fulfillmentStatus === st
                          ? 'bg-[#B7FF00] text-black shadow-sm'
                          : 'bg-white/5 text-white/60 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

