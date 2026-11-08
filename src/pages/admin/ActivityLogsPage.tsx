import { useState } from 'react'
import { FileText, Download, Search, Filter, ShieldAlert, Clock, User } from 'lucide-react'
import { useAdminStore } from '../../store/adminStore'

export default function AdminActivityLogsPage() {
  const logs = useAdminStore((s) => s.activityLogs)
  const [query, setQuery] = useState('')

  const exportLogsCSV = () => {
    const csv =
      'Log ID,Timestamp,Actor,Role,Action,Entity,Details\n' +
      logs.map((l) => `"${l.id}","${l.timestamp}","${l.actor}","${l.role}","${l.action}","${l.entity}","${l.details}"`).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Monster_Energy_Audit_Log_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
  }

  const filtered = logs.filter(
    (l) =>
      l.actor.toLowerCase().includes(query.toLowerCase()) ||
      l.action.toLowerCase().includes(query.toLowerCase()) ||
      l.entity.toLowerCase().includes(query.toLowerCase()) ||
      l.details.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
            Activity Logs & Audit Trail
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-1">
            Tamper-resistant audit record of administrative actions, price adjustments, inventory updates, and order changes.
          </p>
        </div>

        <button
          onClick={exportLogsCSV}
          className="flex items-center gap-2 bg-[#0D140E] hover:bg-[#B7FF00] hover:text-black border border-[#1C2C1D] text-[#B7FF00] font-semibold text-xs px-4 py-2.5 rounded-xl transition w-fit"
        >
          <Download size={15} />
          <span>Export Audit Trail</span>
        </button>
      </div>

      <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-4 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search audit trail by actor, action, or entity..."
            className="w-full bg-[#0D140E] border border-[#1C2C1D] focus:border-[#B7FF00] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 outline-none"
          />
        </div>

        <span className="text-xs text-white/40">{filtered.length} total recorded events</span>
      </div>

      <div className="bg-[#0B100C] border border-[#182619] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-[11px] bg-white/[0.01]">
                <th className="py-3 px-4 font-semibold">Timestamp</th>
                <th className="py-3 px-4 font-semibold">Administrator</th>
                <th className="py-3 px-4 font-semibold">Role</th>
                <th className="py-3 px-4 font-semibold">Action</th>
                <th className="py-3 px-4 font-semibold">Target Entity</th>
                <th className="py-3 px-4 font-semibold">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 px-4 text-white/50 font-mono text-[11px] whitespace-nowrap">
                    {l.timestamp}
                  </td>
                  <td className="py-3 px-4 font-semibold text-white">{l.actor}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-[#B7FF00] font-mono text-[10px]">
                      {l.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-white">{l.action}</td>
                  <td className="py-3 px-4 text-white/80 font-medium">{l.entity}</td>
                  <td className="py-3 px-4 text-white/60 text-xs">{l.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
