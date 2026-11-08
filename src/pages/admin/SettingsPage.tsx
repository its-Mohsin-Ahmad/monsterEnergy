import { useState } from 'react'
import {
  Settings,
  Save,
  Globe,
  Shield,
  Layers,
  Bell,
  CheckCircle2,
  Lock,
} from 'lucide-react'
import { useAdminStore } from '../../store/adminStore'

export default function AdminSettingsPage() {
  const settings = useAdminStore((s) => s.settings)
  const updateSettings = useAdminStore((s) => s.updateSettings)

  const [activeTab, setActiveTab] = useState<'general' | 'inventory' | 'security'>('general')
  const [savedToast, setSavedToast] = useState(false)

  // Local editable state
  const [general, setGeneral] = useState(settings.general)
  const [inventory, setInventory] = useState(settings.inventory)
  const [security, setSecurity] = useState(settings.security)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateSettings({ general, inventory, security })
    setSavedToast(true)
    setTimeout(() => setSavedToast(false), 2500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
            System & Store Settings
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-1">
            Configure regional preferences, default inventory warning thresholds, and security parameters.
          </p>
        </div>

        {savedToast && (
          <div className="flex items-center gap-2 bg-[#B7FF00]/15 border border-[#B7FF00]/40 text-[#B7FF00] px-4 py-2 rounded-xl text-xs font-bold animate-in fade-in">
            <CheckCircle2 size={15} />
            <span>Settings successfully saved!</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        {[
          { id: 'general', label: 'General & Localization', icon: Globe },
          { id: 'inventory', label: 'Inventory Policies', icon: Layers },
          { id: 'security', label: 'Security & Access', icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition ${
                activeTab === tab.id
                  ? 'bg-[#B7FF00] text-black shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {activeTab === 'general' && (
          <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-lg text-white">General Storefront Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-white/70 font-semibold mb-1">Store / Website Name</label>
                <input
                  type="text"
                  value={general.siteName}
                  onChange={(e) => setGeneral({ ...general, siteName: e.target.value })}
                  className="w-full bg-[#0D140E] border border-[#1C2C1D] text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-[#B7FF00]"
                />
              </div>

              <div>
                <label className="block text-white/70 font-semibold mb-1">Support Contact Email</label>
                <input
                  type="email"
                  value={general.contactEmail}
                  onChange={(e) => setGeneral({ ...general, contactEmail: e.target.value })}
                  className="w-full bg-[#0D140E] border border-[#1C2C1D] text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-[#B7FF00]"
                />
              </div>

              <div>
                <label className="block text-white/70 font-semibold mb-1">Currency Code & Symbol</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={general.currency}
                    onChange={(e) => setGeneral({ ...general, currency: e.target.value })}
                    className="w-full bg-[#0D140E] border border-[#1C2C1D] text-white rounded-xl px-3.5 py-2.5 outline-none font-mono"
                  />
                  <input
                    type="text"
                    value={general.currencySymbol}
                    onChange={(e) => setGeneral({ ...general, currencySymbol: e.target.value })}
                    className="w-full bg-[#0D140E] border border-[#1C2C1D] text-white rounded-xl px-3.5 py-2.5 outline-none font-bold text-center"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 font-semibold mb-1">Operating Time Zone</label>
                <input
                  type="text"
                  value={general.timeZone}
                  onChange={(e) => setGeneral({ ...general, timeZone: e.target.value })}
                  className="w-full bg-[#0D140E] border border-[#1C2C1D] text-white rounded-xl px-3.5 py-2.5 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-lg text-white">Inventory Safeguards & Thresholds</h2>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-white/70 font-semibold mb-1">
                  Default Low-Stock Warning Threshold (Units)
                </label>
                <input
                  type="number"
                  value={inventory.defaultLowStockThreshold}
                  onChange={(e) =>
                    setInventory({ ...inventory, defaultLowStockThreshold: parseInt(e.target.value) || 15 })
                  }
                  className="w-48 bg-[#0D140E] border border-[#1C2C1D] text-white rounded-xl px-3.5 py-2.5 outline-none font-bold"
                />
                <p className="text-[11px] text-white/40 mt-1">
                  Products reaching this physical unit level will immediately trigger an Operational Alert.
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-white/5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inventory.preventOverselling}
                    onChange={(e) => setInventory({ ...inventory, preventOverselling: e.target.checked })}
                    className="accent-[#B7FF00] w-4 h-4"
                  />
                  <div>
                    <div className="font-semibold text-white">Prevent Overselling</div>
                    <div className="text-[11px] text-white/40">Disable public storefront purchase when available stock reaches 0.</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inventory.autoReserveStock}
                    onChange={(e) => setInventory({ ...inventory, autoReserveStock: e.target.checked })}
                    className="accent-[#B7FF00] w-4 h-4"
                  />
                  <div>
                    <div className="font-semibold text-white">Automatic Stock Reservation</div>
                    <div className="text-[11px] text-white/40">Immediately allocate physical stock to pending customer checkout orders.</div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-lg text-white">Session Security & Audit Compliance</h2>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-white/70 font-semibold mb-1">Admin Inactivity Timeout (Minutes)</label>
                <input
                  type="number"
                  value={security.sessionTimeoutMinutes}
                  onChange={(e) =>
                    setSecurity({ ...security, sessionTimeoutMinutes: parseInt(e.target.value) || 60 })
                  }
                  className="w-48 bg-[#0D140E] border border-[#1C2C1D] text-white rounded-xl px-3.5 py-2.5 outline-none font-bold"
                />
              </div>

              <div className="space-y-3 pt-3 border-t border-white/5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={security.auditLogging}
                    onChange={(e) => setSecurity({ ...security, auditLogging: e.target.checked })}
                    className="accent-[#B7FF00] w-4 h-4"
                  />
                  <div>
                    <div className="font-semibold text-white">Comprehensive Audit Trail Logging</div>
                    <div className="text-[11px] text-white/40">Record all price updates, stock movements, and staff activities.</div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#B7FF00] hover:bg-[#c6ff24] text-black font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-xl transition shadow-[0_0_15px_rgba(183,255,0,0.3)] active:scale-95"
          >
            <Save size={16} />
            <span>Save Configuration Changes</span>
          </button>
        </div>
      </form>
    </div>
  )
}

