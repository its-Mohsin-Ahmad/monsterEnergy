import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  Clock,
  Filter,
  Trash2,
  ExternalLink,
} from 'lucide-react'
import { useAdminStore } from '../../store/adminStore'

export default function AdminNotificationsPage() {
  const notifications = useAdminStore((s) => s.notifications)
  const markNotificationRead = useAdminStore((s) => s.markNotificationRead)
  const markAllNotificationsRead = useAdminStore((s) => s.markAllNotificationsRead)

  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'stock' | 'orders'>('all')

  const filtered = notifications.filter((n) => {
    if (activeTab === 'unread') return !n.read
    if (activeTab === 'stock') return n.type === 'out_of_stock' || n.type === 'low_stock'
    if (activeTab === 'orders') return n.type === 'order' || n.type === 'shipping'
    return true
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
            Notifications Center
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-1">
            Real-time critical inventory thresholds, new storefront order alerts, and operational events.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="flex items-center gap-2 bg-[#0D140E] hover:bg-[#B7FF00] hover:text-black border border-[#1C2C1D] text-[#B7FF00] font-semibold text-xs px-4 py-2.5 rounded-xl transition w-fit"
          >
            <CheckCircle2 size={15} />
            <span>Mark All as Read ({unreadCount})</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        {[
          { id: 'all', label: `All Alerts (${notifications.length})` },
          { id: 'unread', label: `Unread (${unreadCount})` },
          { id: 'stock', label: 'Inventory Alerts' },
          { id: 'orders', label: 'Orders & Shipments' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition ${
              activeTab === tab.id
                ? 'bg-[#B7FF00] text-black font-bold shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-[#0B100C] border border-[#182619] rounded-2xl overflow-hidden divide-y divide-white/5">
        {filtered.map((n) => {
          const isOut = n.type === 'out_of_stock'
          const isLow = n.type === 'low_stock'

          return (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-4 transition flex items-start justify-between gap-4 cursor-pointer ${
                n.read ? 'hover:bg-white/[0.02] opacity-75' : 'bg-white/[0.02] hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isOut
                      ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                      : isLow
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      : 'bg-[#B7FF00]/15 text-[#B7FF00] border border-[#B7FF00]/30'
                  }`}
                >
                  {isOut ? <AlertCircle size={18} /> : isLow ? <AlertTriangle size={18} /> : <Info size={18} />}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">{n.title}</span>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-[#B7FF00] shadow-[0_0_6px_#B7FF00]" />
                    )}
                  </div>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">{n.message}</p>
                  <div className="text-[10px] text-white/40 mt-1.5 flex items-center gap-1.5">
                    <Clock size={11} />
                    <span>{n.timestamp}</span>
                  </div>
                </div>
              </div>

              {n.link && (
                <Link
                  to={n.link}
                  className="px-3 py-1.5 rounded-lg bg-[#0D140E] hover:bg-white/10 text-white/70 hover:text-white border border-[#1C2C1D] text-xs font-semibold shrink-0 flex items-center gap-1"
                >
                  <span>Resolve</span>
                  <ExternalLink size={12} />
                </Link>
              )}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="p-12 text-center text-white/40 text-xs">
            <Bell size={32} className="mx-auto mb-2 text-white/20" />
            No notifications in this view.
          </div>
        )}
      </div>
    </div>
  )
}

