import { useState } from 'react'
import { ShieldCheck, Plus, UserCheck, Shield, Key, CheckCircle2, X } from 'lucide-react'
import { useAdminStore } from '../../store/adminStore'
import type { AdminUser } from '../../types'

export default function AdminUsersPage() {
  const adminUsers = useAdminStore((s) => s.adminUsers)
  const addAdminUser = useAdminStore((s) => s.addAdminUser)
  const updateAdminUser = useAdminStore((s) => s.updateAdminUser)

  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'Product Manager' as AdminUser['role'],
  })

  const roles: AdminUser['role'][] = [
    'Super Admin',
    'Product Manager',
    'Inventory Manager',
    'Order Manager',
    'Read-Only Analyst',
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    addAdminUser({
      ...form,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      lastActive: 'Just invited',
      status: 'active',
    })
    setModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
            Admin Users & Role Permissions
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-1">
            Role-based access control (RBAC), security privileges, and authorized staff accounts.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-[#B7FF00] hover:bg-[#c6ff24] text-black font-bold uppercase tracking-wider text-xs px-4 py-2.5 rounded-xl transition shadow-[0_0_15px_rgba(183,255,0,0.3)] w-fit"
        >
          <Plus size={16} />
          <span>Invite Admin User</span>
        </button>
      </div>

      {/* Staff Users Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {adminUsers.map((u) => (
          <div
            key={u.id}
            className="bg-[#0B100C] border border-[#182619] rounded-2xl p-5 hover:border-[#B7FF00]/40 transition space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={u.avatar}
                  alt={u.name}
                  className="w-10 h-10 rounded-xl object-cover border border-white/10"
                />
                <div>
                  <div className="font-semibold text-white">{u.name}</div>
                  <div className="text-[11px] text-white/40">{u.email}</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 capitalize">
                {u.status}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
              <span className="text-white/50">Role:</span>
              <span className="font-bold text-[#B7FF00]">{u.role}</span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-white/40 pt-2 border-t border-white/5">
              <span>Active: {u.lastActive}</span>
              <button
                onClick={() => {
                  const newRole = u.role === 'Super Admin' ? 'Product Manager' : 'Super Admin'
                  updateAdminUser(u.id, { role: newRole })
                }}
                className="text-[#B7FF00] hover:underline font-semibold"
              >
                Change Role
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Role Matrix Reference Table */}
      <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-6">
        <h2 className="font-display text-lg text-white mb-4">Role Permission Matrix</h2>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-[11px]">
                <th className="py-2.5 font-semibold">Role Name</th>
                <th className="py-2.5 font-semibold">Products</th>
                <th className="py-2.5 font-semibold">Inventory & Stock</th>
                <th className="py-2.5 font-semibold">Orders & Fulfillment</th>
                <th className="py-2.5 font-semibold">Coupons</th>
                <th className="py-2.5 font-semibold">Staff & Security</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              <tr>
                <td className="py-2.5 font-bold text-[#B7FF00]">Super Admin</td>
                <td>Full Access</td>
                <td>Full Access</td>
                <td>Full Access</td>
                <td>Full Access</td>
                <td>Full Access</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-white">Product Manager</td>
                <td>Create / Edit / Archive</td>
                <td>View Only</td>
                <td>View Only</td>
                <td>Create & Edit</td>
                <td>No Access</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-white">Inventory Manager</td>
                <td>View Only</td>
                <td>Adjust / PO / Receiving</td>
                <td>View Stock Items</td>
                <td>No Access</td>
                <td>No Access</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-white">Order Manager</td>
                <td>View Only</td>
                <td>View Only</td>
                <td>Dispatch / Status / Returns</td>
                <td>View Only</td>
                <td>No Access</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-white">Read-Only Analyst</td>
                <td>View Only</td>
                <td>View Only</td>
                <td>View Reports Only</td>
                <td>View Only</td>
                <td>No Access</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-md bg-[#090E0A] border border-[#1E2E1F] rounded-2xl shadow-2xl p-6 z-10">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="font-display text-xl text-white">INVITE STAFF USER</h2>
              <button onClick={() => setModalOpen(false)} className="text-white/40 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block text-white/70 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Jordan Hunter"
                  className="w-full bg-[#0D140E] border border-[#1C2C1D] text-white rounded-xl px-3.5 py-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block text-white/70 font-semibold mb-1">Corporate Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jordan.h@monsterenergy.com"
                  className="w-full bg-[#0D140E] border border-[#1C2C1D] text-white rounded-xl px-3.5 py-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block text-white/70 font-semibold mb-1">Assigned Role *</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as any })}
                  className="w-full bg-[#0D140E] border border-[#1C2C1D] text-white rounded-xl px-3.5 py-2.5 outline-none"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
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
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
