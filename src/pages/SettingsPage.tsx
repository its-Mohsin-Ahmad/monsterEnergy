import { useState } from 'react'
import { useDemoStore } from '../store/demoStore'
import { useUIStore } from '../store/uiStore'

export default function SettingsPage() {
  const profile = useDemoStore((s) => s.profile)
  const setProfile = useDemoStore((s) => s.setProfile)
  const reset = useDemoStore((s) => s.reset)
  const showToast = useUIStore((s) => s.showToast)
  const [p, setP] = useState(profile)
  const save = () => { setProfile(p); showToast('Settings saved (demo)') }
  return (
    <div className="px-4 md:px-8 py-6 max-w-2xl space-y-6">
      <h1 className="font-display text-3xl">SETTINGS</h1>
      <div className="bg-card border border-border rounded-card p-6 space-y-4">
        <h2 className="font-display text-xl">Profile Preferences</h2>
        <input value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none" placeholder="Name" />
        <input value={p.email} onChange={(e) => setP({ ...p, email: e.target.value })} className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none" placeholder="Email" />
        <button onClick={save} className="bg-neon text-black font-semibold px-6 py-2.5 rounded-lg">Save</button>
      </div>
      <div className="bg-card border border-border rounded-card p-6 space-y-4">
        <h2 className="font-display text-xl">Display Preferences</h2>
        <p className="text-sm text-text-2">Dark theme (default). Frontend demo.</p>
      </div>
      <div className="bg-card border border-border rounded-card p-6 space-y-4">
        <h2 className="font-display text-xl">Shipping Address (Demo)</h2>
        <input value={p.address} onChange={(e) => setP({ ...p, address: e.target.value })} className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none" placeholder="Street" />
        <div className="grid grid-cols-2 gap-2">
          <input value={p.city} onChange={(e) => setP({ ...p, city: e.target.value })} className="bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none" placeholder="City" />
          <input value={p.postal} onChange={(e) => setP({ ...p, postal: e.target.value })} className="bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none" placeholder="Postal" />
        </div>
        <button onClick={save} className="bg-neon text-black font-semibold px-6 py-2.5 rounded-lg">Save Address</button>
      </div>
      <div className="bg-card border border-error/40 rounded-card p-6 space-y-3">
        <h2 className="font-display text-xl text-error">Reset Demo Data</h2>
        <p className="text-sm text-text-2">Restores seeded products, orders, customers.</p>
        <button onClick={() => { reset(); showToast('Demo data reset') }} className="border border-error text-error px-6 py-2.5 rounded-lg hover:bg-error/10">Reset</button>
      </div>
      <p className="text-xs text-muted">Account security and server-side privacy controls are not implemented in this frontend-only version.</p>
    </div>
  )
}
