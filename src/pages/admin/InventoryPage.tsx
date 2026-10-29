import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Layers,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Search,
  Filter,
  Sliders,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  X,
  History,
} from 'lucide-react'
import { useAdminStore } from '../../store/adminStore'
import { formatCurrency } from '../../utils/formatCurrency'
import type { Product, StockAdjustmentType } from '../../types'

export default function AdminInventoryPage() {
  const products = useAdminStore((s) => s.products)
  const adjustStock = useAdminStore((s) => s.adjustStock)

  const [query, setQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all')

  // Adjustment Modal
  const [adjustModalOpen, setAdjustModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [adjustDelta, setAdjustDelta] = useState<number>(10)
  const [adjustType, setAdjustType] = useState<StockAdjustmentType>('Manual Increase')
  const [adjustReason, setAdjustReason] = useState('')
  const [adjustRef, setAdjustRef] = useState('')

  // Calculations
  const totalPhysical = products.reduce((acc, p) => acc + (p.stock || 0), 0)
  const totalReserved = products.reduce((acc, p) => acc + (p.reservedStock || 0), 0)
  const totalAvailable = Math.max(0, totalPhysical - totalReserved)
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= (p.minStock || 15)).length
  const outOfStockCount = products.filter((p) => p.stock <= 0).length
  const totalValuation = products.reduce((acc, p) => acc + p.stock * (p.costPrice || p.price * 0.45), 0)

  const openAdjust = (p: Product) => {
    setSelectedProduct(p)
    setAdjustDelta(10)
    setAdjustType('Stock Received')
    setAdjustReason('Restock inventory batch')
    setAdjustRef(`ADJ-${Date.now().toString().slice(-4)}`)
    setAdjustModalOpen(true)
  }

  const handleAdjustSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProduct) return
    adjustStock(selectedProduct.id, adjustDelta, adjustType, adjustReason, adjustRef)
    get().logAction(
      'Stock Adjustment',
      'Inventory',
      `Adjusted stock for ${selectedProduct.name} by ${adjustDelta} ${adjustDelta >= 0 ? '+' : ''}units (${adjustType})`
    )
    setAdjustModalOpen(false)
  }

  const filtered = products.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(query.toLowerCase()))

    const isOut = p.stock <= 0
    const isLow = !isOut && p.stock <= (p.minStock || 15)
    const isIn = p.stock > (p.minStock || 15)

    if (filterStatus === 'in_stock') return matchesQuery && isIn
    if (filterStatus === 'low_stock') return matchesQuery && isLow
    if (filterStatus === 'out_of_stock') return matchesQuery && isOut
    return matchesQuery
  })

  return (
    <div className="space-y-6">
      {/* ── HEADER ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
            Inventory & Stock Management
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-1">
            Real-time physical stock tracking, reservation allocations, and audit-logged adjustments.
          </p>
        </div>

        <Link
          to="/dashboard/stock-movements"
          className="flex items-center gap-2 bg-[#0D140E] hover:bg-white/5 border border-[#1C2C1D] text-[#B7FF00] font-semibold text-xs px-4 py-2.5 rounded-xl transition w-fit"
        >
          <History size={15} />
          <span>View Stock Ledger</span>
        </Link>
      </div>

      {/* ── INVENTORY METRICS KPI ROW ─────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-4">
          <div className="text-[11px] text-white/50">Total Physical</div>
          <div className="font-display text-2xl text-white mt-1">{totalPhysical.toLocaleString()}</div>
          <div className="text-[10px] text-white/40 mt-0.5">On-hand units</div>
        </div>

        <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-4">
          <div className="text-[11px] text-white/50">Available to Sell</div>
          <div className="font-display text-2xl text-[#B7FF00] mt-1">{totalAvailable.toLocaleString()}</div>
          <div className="text-[10px] text-white/40 mt-0.5">Unreserved units</div>
        </div>

        <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-4">
          <div className="text-[11px] text-white/50">Reserved</div>
          <div className="font-display text-2xl text-blue-400 mt-1">{totalReserved}</div>
          <div className="text-[10px] text-white/40 mt-0.5">Pending orders</div>
        </div>

        <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-4">
          <div className="text-[11px] text-white/50">Low Stock</div>
          <div className="font-display text-2xl text-amber-400 mt-1">{lowStockCount}</div>
          <div className="text-[10px] text-white/40 mt-0.5">Below threshold</div>
        </div>

        <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-4">
          <div className="text-[11px] text-white/50">Out of Stock</div>
          <div className="font-display text-2xl text-red-400 mt-1">{outOfStockCount}</div>
          <div className="text-[10px] text-white/40 mt-0.5">Zero available</div>
        </div>

        <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-4">
          <div className="text-[11px] text-white/50">Valuation</div>
          <div className="font-display text-2xl text-white mt-1">{formatCurrency(totalValuation)}</div>
          <div className="text-[10px] text-white/40 mt-0.5">At cost price</div>
        </div>
      </div>

      {/* ── CONTROLS & STATUS TABS ────────────────────────────── */}
      <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stock by drink name or SKU..."
            className="w-full bg-[#0D140E] border border-[#1C2C1D] focus:border-[#B7FF00] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 outline-none"
          />
        </div>

        {/* Status filter tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#070B07] border border-white/10 rounded-xl p-1 text-xs">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'in_stock', label: 'In Stock' },
            { id: 'low_stock', label: 'Low Stock' },
            { id: 'out_of_stock', label: 'Out of Stock' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id as typeof filterStatus)}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                filterStatus === tab.id
                  ? 'bg-[#B7FF00] text-black font-bold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── INVENTORY TABLE ───────────────────────────────────── */}
      <div className="bg-[#0B100C] border border-[#182619] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-[11px] bg-white/[0.01]">
                <th className="py-3 px-4 font-semibold">Drink Variety</th>
                <th className="py-3 px-4 font-semibold">SKU</th>
                <th className="py-3 px-4 font-semibold text-center">On-Hand</th>
                <th className="py-3 px-4 font-semibold text-center">Reserved</th>
                <th className="py-3 px-4 font-semibold text-center">Available</th>
                <th className="py-3 px-4 font-semibold text-center">Min Level</th>
                <th className="py-3 px-4 font-semibold">Unit Cost</th>
                <th className="py-3 px-4 font-semibold">Valuation</th>
                <th className="py-3 px-4 font-semibold">Stock Status</th>
                <th className="py-3 px-4 font-semibold text-right">Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((p) => {
                const onHand = p.stock || 0
                const reserved = p.reservedStock || 0
                const available = Math.max(0, onHand - reserved)
                const min = p.minStock || 15
                const isOut = onHand <= 0
                const isLow = !isOut && onHand <= min
                const unitCost = p.costPrice || +(p.price * 0.45).toFixed(2)
                const itemValuation = onHand * unitCost

                return (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center p-1 shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-white truncate max-w-[170px]">{p.name}</div>
                          <div className="text-[10px] text-white/40">{p.variant || '500ml Can'}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-white/60">{p.sku || '—'}</td>

                    <td className="py-3 px-4 text-center font-bold text-white text-sm">{onHand}</td>

                    <td className="py-3 px-4 text-center font-mono text-blue-400">
                      {reserved > 0 ? reserved : '—'}
                    </td>

                    <td className="py-3 px-4 text-center font-bold text-[#B7FF00] text-sm">
                      {available}
                    </td>

                    <td className="py-3 px-4 text-center text-white/50">{min}</td>

                    <td className="py-3 px-4 text-white/60">{formatCurrency(unitCost)}</td>

                    <td className="py-3 px-4 font-bold text-white">{formatCurrency(itemValuation)}</td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isOut
                            ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                            : isLow
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : 'bg-emerald-500/15 text-emerald-400'
                        }`}
                      >
                        {isOut ? 'Out of stock' : isLow ? 'Low stock' : 'In stock'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => openAdjust(p)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#0D140E] hover:bg-[#B7FF00] hover:text-black border border-[#1C2C1D] text-white/80 transition text-xs font-semibold"
                      >
                        Adjust Stock
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── STOCK ADJUSTMENT MODAL ────────────────────────────── */}
      {adjustModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setAdjustModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-[#090E0A] border border-[#1E2E1F] rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.95)] p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h2 className="font-display text-xl text-white">ADJUST INVENTORY</h2>
                <div className="text-xs text-white/50">{selectedProduct.name}</div>
              </div>
              <button onClick={() => setAdjustModalOpen(false)} className="text-white/40 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 mt-4 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-white/40 uppercase font-semibold">Current On-Hand</div>
                  <div className="font-display text-2xl text-white">{selectedProduct.stock} units</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-white/40 uppercase font-semibold">New Projected Stock</div>
                  <div className="font-display text-2xl text-[#B7FF00]">
                    {Math.max(0, selectedProduct.stock + adjustDelta)} units
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-white/70 font-semibold mb-1">Adjustment Type *</label>
                <select
                  value={adjustType}
                  onChange={(e) => {
                    const val = e.target.value as StockAdjustmentType
                    setAdjustType(val)
                    if (
                      val === 'Manual Decrease' ||
                      val === 'Damaged Goods' ||
                      val === 'Expired Goods' ||
                      val === 'Lost / Missing'
                    ) {
                      setAdjustDelta(-Math.abs(adjustDelta))
                    } else {
                      setAdjustDelta(Math.abs(adjustDelta))
                    }
                  }}
                  className="w-full bg-[#0D140E] border border-[#1C2C1D] text-white rounded-xl px-3.5 py-2.5 outline-none"
                >
                  <option value="Stock Received">Stock Received (+)</option>
                  <option value="Manual Increase">Manual Increase (+)</option>
                  <option value="Manual Decrease">Manual Decrease (-)</option>
                  <option value="Damaged Goods">Damaged Goods (-)</option>
                  <option value="Expired Goods">Expired Goods (-)</option>
                  <option value="Returned Goods">Returned Goods (+)</option>
                  <option value="Inventory Correction">Inventory Correction (+/-)</option>
                  <option value="Lost / Missing">Lost / Missing (-)</option>
                </select>
              </div>

              <div>
                <label className="block text-white/70 font-semibold mb-1">
                  Quantity Change ({adjustDelta >= 0 ? '+' : ''}{adjustDelta}) *
                </label>
                <input
                  type="number"
                  required
                  value={adjustDelta}
                  onChange={(e) => setAdjustDelta(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#0D140E] border border-[#1C2C1D] focus:border-[#B7FF00] rounded-xl px-3.5 py-2.5 text-white outline-none font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-white/70 font-semibold mb-1">Reason for Adjustment *</label>
                <input
                  type="text"
                  required
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  placeholder="e.g. Received shipment container #8812, cycle recount..."
                  className="w-full bg-[#0D140E] border border-[#1C2C1D] focus:border-[#B7FF00] rounded-xl px-3.5 py-2.5 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-white/70 font-semibold mb-1">Reference / PO / Batch #</label>
                <input
                  type="text"
                  value={adjustRef}
                  onChange={(e) => setAdjustRef(e.target.value)}
                  placeholder="e.g. PO-2025-01, RMA-440"
                  className="w-full bg-[#0D140E] border border-[#1C2C1D] focus:border-[#B7FF00] rounded-xl px-3.5 py-2.5 text-white outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setAdjustModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/20 text-white/70 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#B7FF00] text-black font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(183,255,0,0.3)] hover:bg-[#c6ff24]"
                >
                  Confirm Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
