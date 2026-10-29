import { useState } from 'react'
import { Tag, Plus, CheckCircle2, XCircle, Trash2, Calendar, DollarSign, Percent, X } from 'lucide-react'
import { useAdminStore } from '../../store/adminStore'
import { formatCurrency } from '../../utils/formatCurrency'

export default function AdminCouponsPage() {
  const coupons = useAdminStore((s) => s.coupons)
  const addCoupon = useAdminStore((s) => s.addCoupon)
  const toggleCoupon = useAdminStore((s) => s.toggleCoupon)
  const deleteCoupon = useAdminStore((s) => s.deleteCoupon)

  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({
    code: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: 15,
    minOrderValue: 30,
    startDate: '2025-05-01',
    endDate: '2025-12-31',
    usageLimit: 300,
    description: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.code) return
    addCoupon({
      ...form,
      code: form.code.toUpperCase().replace(/\s+/g, ''),
      timesUsed: 0,
      active: true,
    })
    setModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
            Promotions & Coupons
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-1">
            Create promotional discount codes, manage seasonal campaigns, and monitor redemption stats.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-[#B7FF00] hover:bg-[#c6ff24] text-black font-bold uppercase tracking-wider text-xs px-4 py-2.5 rounded-xl transition shadow-[0_0_15px_rgba(183,255,0,0.3)] w-fit"
        >
          <Plus size={16} />
          <span>Create Coupon</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coupons.map((c) => (
          <div
            key={c.id}
            className={`bg-[#0B100C] border rounded-2xl p-5 space-y-4 transition ${
              c.active ? 'border-[#182619] hover:border-[#B7FF00]/40' : 'border-white/5 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-base font-black px-3 py-1 rounded-xl bg-[#B7FF00]/15 text-[#B7FF00] border border-[#B7FF00]/30 tracking-wider">
                {c.code}
              </span>
              <button
                onClick={() => toggleCoupon(c.id)}
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold transition ${
                  c.active
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'bg-white/10 text-white/40'
                }`}
              >
                {c.active ? 'Active' : 'Disabled'}
              </button>
            </div>

            <div>
              <div className="font-display text-3xl text-white">
                {c.type === 'percentage' ? `${c.value}% OFF` : `${formatCurrency(c.value)} OFF`}
              </div>
              <div className="text-xs text-white/50 mt-1">
                Min. order {formatCurrency(c.minOrderValue)} • {c.description || 'Valid on all items'}
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white/60">
              <div>
                Used <span className="text-white font-bold">{c.timesUsed}</span> / {c.usageLimit}
              </div>
              <button
                onClick={() => deleteCoupon(c.id)}
                className="text-white/40 hover:text-red-400 p-1"
                title="Delete Coupon"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-md bg-[#090E0A] border border-[#1E2E1F] rounded-2xl shadow-2xl p-6 z-10">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="font-display text-xl text-white">NEW PROMO COUPON</h2>
              <button onClick={() => setModalOpen(false)} className="text-white/40 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block text-white/70 font-semibold mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                  placeholder="e.g. UNLEASH25"
                  className="w-full bg-[#0D140E] border border-[#1C2C1D] uppercase font-mono tracking-wider text-white rounded-xl px-3.5 py-2.5 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Discount Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                    className="w-full bg-[#0D140E] border border-[#1C2C1D] text-white rounded-xl px-3.5 py-2.5 outline-none"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount ($)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Discount Value *</label>
                  <input
                    type="number"
                    required
                    value={form.value}
                    onChange={(e) => setForm({ ...form, value: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#0D140E] border border-[#1C2C1D] text-white rounded-xl px-3.5 py-2.5 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Min. Order ($)</label>
                  <input
                    type="number"
                    value={form.minOrderValue}
                    onChange={(e) => setForm({ ...form, minOrderValue: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#0D140E] border border-[#1C2C1D] text-white rounded-xl px-3.5 py-2.5 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Usage Limit</label>
                  <input
                    type="number"
                    value={form.usageLimit}
                    onChange={(e) => setForm({ ...form, usageLimit: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#0D140E] border border-[#1C2C1D] text-white rounded-xl px-3.5 py-2.5 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/20 text-white/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#B7FF00] text-black font-bold uppercase tracking-wider"
                >
                  Create Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

