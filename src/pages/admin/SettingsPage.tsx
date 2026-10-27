import { useState } from 'react'
import { useDemoStore } from '../../store/demoStore'
import { useUIStore } from '../../store/uiStore'

export default function AdminSettings() {
  const profile = useDemoStore((s) => s.profile)
  const reset = useDemoStore((s) => s.reset)
  const showToast = useUIStore((s) => s.showToast)
  const [storeName, setStoreName] = useState('Monster Energy Store (Demo)')
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-display text-2xl">Settings</h1>
      <div className="bg-card border border-border rounded-card p-6 space-y-4">
        <h2 className="font-display text-lg">Store Info</h2>
        <input value={storeName} onChange={(e) => setStoreName(e.target.value)} className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none" />
        <button onClick={() => showToast('Saved (demo)')} className="bg-neon text-black font-semibold px-6 py-2.5 rounded-lg">Save</button>
      </div>
      <div className="bg-card border border-border rounded-card p-6 space-y-4">
        <h2 className="font-display text-lg">Admin Profile</h2>
        <div className="text-sm text-text-2">{profile.name} · {profile.email}</div>
      </div>
      <div className="bg-card border border-border rounded-card p-6 space-y-4">
        <h2 className="font-display text-lg">Demo Controls</h2>
        <button onClick={() => { reset(); showToast('Demo data reset') }} className="border border-error text-error px-6 py-2.5 rounded-lg hover:bg-error/10">Reset Demo Data</button>
      </div>
      <p className="text-xs text-muted">No real authentication or server-side persistence.</p>
    </div>
  )
}
