import { useState } from 'react'
import {
  Truck,
  Plus,
  PackageCheck,
  Building,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  X,
  Clock,
} from 'lucide-react'
import { useAdminStore } from '../../store/adminStore'
import { formatCurrency } from '../../utils/formatCurrency'
import type { Supplier, PurchaseOrder } from '../../types'

export default function AdminSuppliersPage() {
  const suppliers = useAdminStore((s) => s.suppliers)
  const addSupplier = useAdminStore((s) => s.addSupplier)
  const purchaseOrders = useAdminStore((s) => s.purchaseOrders)
  const createPurchaseOrder = useAdminStore((s) => s.createPurchaseOrder)
  const receivePurchaseOrder = useAdminStore((s) => s.receivePurchaseOrder)
  const products = useAdminStore((s) => s.products)

  const [activeTab, setActiveTab] = useState<'suppliers' | 'orders'>('suppliers')

  // Supplier modal
  const [supplierModal, setSupplierModal] = useState(false)
  const [supplierForm, setSupplierForm] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    leadTimeDays: 7,
    status: 'active' as const,
  })

  // PO modal
  const [poModal, setPoModal] = useState(false)
  const [poSupplierId, setPoSupplierId] = useState(suppliers[0]?.id || '')
  const [poProductId, setPoProductId] = useState(products[0]?.id || '')
  const [poQuantity, setPoQuantity] = useState(150)
  const [poCost, setPoCost] = useState(1.35)

  // Receiving modal
  const [receivingPo, setReceivingPo] = useState<PurchaseOrder | null>(null)
  const [receivedMap, setReceivedMap] = useState<Record<string, number>>({})

  const handleCreateSupplier = (e: React.FormEvent) => {
    e.preventDefault()
    if (!supplierForm.name) return
    addSupplier(supplierForm)
    setSupplierModal(false)
  }

  const handleCreatePo = (e: React.FormEvent) => {
    e.preventDefault()
    const sup = suppliers.find((s) => s.id === poSupplierId) || suppliers[0]
    const prod = products.find((p) => p.id === poProductId) || products[0]
    if (!sup || !prod) return

    createPurchaseOrder({
      poNumber: `PO-${new Date().getFullYear()}-${Math.floor(10 + Math.random() * 90)}`,
      supplierId: sup.id,
      supplierName: sup.name,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      expectedDelivery: 'May 15, 2025',
      items: [
        {
          productId: prod.id,
          productName: prod.name,
          quantity: poQuantity,
          receivedQuantity: 0,
          unitCost: poCost,
        },
      ],
      subtotal: poQuantity * poCost,
      status: 'ordered',
    })
    setPoModal(false)
  }

  const handleOpenReceive = (po: PurchaseOrder) => {
    setReceivingPo(po)
    const map: Record<string, number> = {}
    po.items.forEach((item) => {
      map[item.productId] = item.quantity
    })
    setReceivedMap(map)
  }

  const handleConfirmReceive = (e: React.FormEvent) => {
    e.preventDefault()
    if (!receivingPo) return
    receivePurchaseOrder(receivingPo.id, receivedMap)
    setReceivingPo(null)
  }

  return (
    <div className="space-y-6">
      {/* ── HEADER ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
            Suppliers & Purchasing
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-1">
            Manage bottling partners, ingredient suppliers, generate POs, and record incoming stock receipts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setSupplierModal(true)}
            className="flex items-center gap-1.5 bg-[#0D140E] hover:bg-white/5 border border-[#1C2C1D] text-white text-xs px-3.5 py-2 rounded-xl transition"
          >
            <Plus size={15} className="text-[#B7FF00]" />
            <span>Add Supplier</span>
          </button>
          <button
            onClick={() => setPoModal(true)}
            className="flex items-center gap-1.5 bg-[#B7FF00] hover:bg-[#c6ff24] text-black font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl transition shadow-[0_0_15px_rgba(183,255,0,0.3)]"
          >
            <Plus size={15} />
            <span>Create Purchase Order</span>
          </button>
        </div>
      </div>

      {/* ── TABS SWITCHER ─────────────────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('suppliers')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition rounded-xl ${
            activeTab === 'suppliers'
              ? 'bg-[#B7FF00] text-black shadow-sm'
              : 'text-white/60 hover:text-white'
          }`}
        >
          Active Suppliers ({suppliers.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition rounded-xl ${
            activeTab === 'orders'
              ? 'bg-[#B7FF00] text-black shadow-sm'
              : 'text-white/60 hover:text-white'
          }`}
        >
          Purchase Orders ({purchaseOrders.length})
        </button>
      </div>

      {/* ── TAB 1: SUPPLIERS DIRECTORY ────────────────────────── */}
      {activeTab === 'suppliers' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suppliers.map((s) => (
            <div
              key={s.id}
              className="bg-[#0B100C] border border-[#182619] rounded-2xl p-5 hover:border-[#B7FF00]/40 transition space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#B7FF00]/10 border border-[#B7FF00]/30 flex items-center justify-center text-[#B7FF00]">
                  <Building size={20} />
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 capitalize">
                  {s.status}
                </span>
              </div>

              <div>
                <h3 className="font-display text-lg text-white">{s.name}</h3>
                <div className="text-xs text-white/50">{s.contactPerson} (Lead Contact)</div>
              </div>

              <div className="space-y-1.5 text-xs text-white/70 pt-2 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-white/40" />
                  <span className="truncate">{s.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-white/40" />
                  <span>{s.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-white/40" />
                  <span>Lead Time: {s.leadTimeDays || 7} days</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TAB 2: PURCHASE ORDERS ────────────────────────────── */}
      {activeTab === 'orders' && (
        <div className="bg-[#0B100C] border border-[#182619] rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-[11px] bg-white/[0.01]">
                  <th className="py-3 px-4 font-semibold">PO Number</th>
                  <th className="py-3 px-4 font-semibold">Supplier</th>
                  <th className="py-3 px-4 font-semibold">Order Date</th>
                  <th className="py-3 px-4 font-semibold">Expected Arrival</th>
                  <th className="py-3 px-4 font-semibold">Items</th>
                  <th className="py-3 px-4 font-semibold">Subtotal</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {purchaseOrders.map((po) => (
                  <tr key={po.id} className="hover:bg-white/[0.02] transition">
                    <td className="py-3 px-4 font-mono font-bold text-white">{po.poNumber}</td>
                    <td className="py-3 px-4 font-medium text-white">{po.supplierName}</td>
                    <td className="py-3 px-4 text-white/50">{po.date}</td>
                    <td className="py-3 px-4 text-white/60">{po.expectedDelivery}</td>
                    <td className="py-3 px-4 text-white/80">
                      {po.items.map((i) => `${i.quantity}x ${i.productName}`).join(', ')}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#B7FF00]">{formatCurrency(po.subtotal)}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                          po.status === 'received'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : 'bg-amber-500/15 text-amber-400'
                        }`}
                      >
                        {po.status === 'received' ? 'Received & Stocked' : 'Pending Delivery'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {po.status !== 'received' ? (
                        <button
                          onClick={() => handleOpenReceive(po)}
                          className="px-3 py-1 rounded-lg bg-[#B7FF00] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#c6ff24] transition"
                        >
                          Receive Stock
                        </button>
                      ) : (
                        <span className="text-white/40 text-xs flex items-center gap-1 justify-end">
                          <CheckCircle2 size={13} className="text-emerald-400" /> Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── RECEIVE STOCK WORKFLOW MODAL ──────────────────────── */}
      {receivingPo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setReceivingPo(null)} />
          <div className="relative w-full max-w-lg bg-[#090E0A] border border-[#1E2E1F] rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.95)] p-6 z-10">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h2 className="font-display text-xl text-white">RECEIVE INVENTORY</h2>
                <div className="text-xs text-white/50">Processing {receivingPo.poNumber}</div>
              </div>
              <button onClick={() => setReceivingPo(null)} className="text-white/40 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleConfirmReceive} className="space-y-4 mt-4 text-xs">
              <p className="text-white/70">
                Confirming receipt will automatically add units to available inventory and log an audit movement record.
              </p>

              {receivingPo.items.map((item) => (
                <div key={item.productId} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="font-semibold text-white">{item.productName}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50">Ordered: {item.quantity} units</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white/70">Received:</span>
                      <input
                        type="number"
                        min="1"
                        value={receivedMap[item.productId] || item.quantity}
                        onChange={(e) =>
                          setReceivedMap({
                            ...receivedMap,
                            [item.productId]: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-20 bg-[#0D140E] border border-[#1C2C1D] text-white rounded-lg px-2 py-1 text-center font-bold"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setReceivingPo(null)}
                  className="px-4 py-2 rounded-xl border border-white/20 text-white/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#B7FF00] text-black font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(183,255,0,0.3)] hover:bg-[#c6ff24]"
                >
                  Confirm & Update Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

