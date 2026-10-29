import { useState } from 'react'
import { ArrowLeftRight, Download, Search, Filter, History, Calendar } from 'lucide-react'
import { useAdminStore } from '../../store/adminStore'

export default function StockMovementsPage() {
  const stockMovements = useAdminStore((s) => s.stockMovements)
  const [query, setQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  const exportCSV = () => {
    const headers = ['Movement ID,Product Name,SKU,Type,Quantity,Previous Stock,Resulting Stock,Reason,Reference ID,Actor,Timestamp']
    const rows = stockMovements.map((m) =>
      `"${m.id}","${m.productName}","${m.sku}","${m.type}",${m.quantity},${m.previousStock},${m.resultingStock},"${m.reason}","${m.referenceId || ''}","${m.actor}","${m.timestamp}"`
    )
    const blob = new Blob([[headers, ...rows].join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Monster_Stock_Movements_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
  }

  const filtered = stockMovements.filter((m) => {
    const matchesQuery =
      m.productName.toLowerCase().includes(query.toLowerCase()) ||
      m.sku.toLowerCase().includes(query.toLowerCase()) ||
      (m.referenceId && m.referenceId.toLowerCase().includes(query.toLowerCase())) ||
      m.reason.toLowerCase().includes(query.toLowerCase())
    const matchesType = selectedType === 'all' || m.type === selectedType
    return matchesQuery && matchesType
  })

  return (
    <div className="space-y-6">
      {/* ── HEADER ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
            Stock Movements Ledger
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-1">
            An append-only, immutable chronological audit trail of all warehouse inventory transactions.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-[#0D140E] hover:bg-[#B7FF00] hover:text-black border border-[#1C2C1D] text-[#B7FF00] font-semibold text-xs px-4 py-2.5 rounded-xl transition w-fit"
        >
          <Download size={15} />
          <span>Export CSV</span>
        </button>
      </div>

      {/* ── FILTERS ───────────────────────────────────────────── */}
      <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by drink, SKU, reference #, or reason..."
            className="w-full bg-[#0D140E] border border-[#1C2C1D] focus:border-[#B7FF00] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <Filter size={14} className="text-white/40" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-[#0D140E] border border-[#1C2C1D] text-white/80 rounded-xl px-3 py-1.5 text-xs outline-none"
          >
            <option value="all">All Movement Types</option>
            <option value="Stock Received">Stock Received</option>
            <option value="Order Fulfillment">Order Fulfillment</option>
            <option value="Manual Increase">Manual Increase</option>
            <option value="Manual Decrease">Manual Decrease</option>
            <option value="Damaged Goods">Damaged Goods</option>
            <option value="Inventory Correction">Inventory Correction</option>
          </select>
        </div>
      </div>

      {/* ── LEDGER TABLE ──────────────────────────────────────── */}
      <div className="bg-[#0B100C] border border-[#182619] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-[11px] bg-white/[0.01]">
                <th className="py-3 px-4 font-semibold">Movement ID</th>
                <th className="py-3 px-4 font-semibold">Timestamp</th>
                <th className="py-3 px-4 font-semibold">Product</th>
                <th className="py-3 px-4 font-semibold">SKU</th>
                <th className="py-3 px-4 font-semibold">Transaction Type</th>
                <th className="py-3 px-4 font-semibold text-center">Change</th>
                <th className="py-3 px-4 font-semibold text-center">Previous → Result</th>
                <th className="py-3 px-4 font-semibold">Reason & Reference</th>
                <th className="py-3 px-4 font-semibold text-right">Actor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((m) => {
                const isAddition = m.quantity > 0

                return (
                  <tr key={m.id} className="hover:bg-white/[0.02] transition">
                    <td className="py-3 px-4 font-mono font-semibold text-white/80">{m.id}</td>
                    <td className="py-3 px-4 text-white/50">{m.timestamp}</td>
                    <td className="py-3 px-4 font-semibold text-white">{m.productName}</td>
                    <td className="py-3 px-4 font-mono text-white/60">{m.sku}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/5 border border-white/10 text-white/70">
                        {m.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-bold">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-mono ${
                          isAddition ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
                        }`}
                      >
                        {isAddition ? `+${m.quantity}` : `${m.quantity}`}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-white/60">
                      {m.previousStock} → <span className="text-white font-bold">{m.resultingStock}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-white/80">{m.reason}</div>
                      {m.referenceId && (
                        <div className="text-[10px] font-mono text-[#B7FF00]">{m.referenceId}</div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-white/70">{m.actor}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="p-12 text-center text-white/40 text-xs">
            <History size={32} className="mx-auto mb-2 text-white/20" />
            No stock movements found matching your filters.
          </div>
        )}
      </div>
    </div>
  )
}

