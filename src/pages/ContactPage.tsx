import { useState } from 'react'
import { useUIStore } from '../store/uiStore'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', topic: 'general', order: '', message: '' })
  const [errors, setErrors] = useState<any>({})
  const [done, setDone] = useState(false)
  const showToast = useUIStore((s) => s.showToast)

  const validate = () => {
    const e: any = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    if (form.message.trim().length < 10) e.message = 'Min 10 characters'
    return e
  }

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    setDone(true)
    showToast('Message saved locally (demo)')
  }

  return (
    <div className="px-4 md:px-8 py-6 max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl md:text-4xl">LET'S TALK.</h1>
        <p className="text-sm text-text-2 mt-1">Find help with products, shopping, or general questions.</p>
      </div>
      {done ? (
        <div className="bg-card border border-neon rounded-card p-6 text-center">
          <div className="font-display text-xl text-neon mb-2">Message Received (Demo)</div>
          <p className="text-sm text-text-2">This is a frontend demonstration. No message was sent externally.</p>
          <button onClick={() => { setDone(false); setForm({ name: '', email: '', topic: 'general', order: '', message: '' }) }} className="mt-4 bg-neon text-black font-semibold px-6 py-2.5 rounded-lg">Send Another</button>
        </div>
      ) : (
        <form onSubmit={submit} className="bg-card border border-border rounded-card p-6 space-y-4">
          <div>
            <label className="text-xs text-muted block mb-1">Name *</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none" />
            {errors.name && <span className="text-xs text-error">{errors.name}</span>}
          </div>
          <div>
            <label className="text-xs text-muted block mb-1">Email *</label>
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none" />
            {errors.email && <span className="text-xs text-error">{errors.email}</span>}
          </div>
          <div>
            <label className="text-xs text-muted block mb-1">Topic</label>
            <select value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none">
              <option value="general">General</option>
              <option value="product">Product</option>
              <option value="order">Order</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted block mb-1">Order Reference (optional)</label>
            <input value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none" />
          </div>
          <div>
            <label className="text-xs text-muted block mb-1">Message * (max 500)</label>
            <textarea value={form.message} maxLength={500} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none" />
            {errors.message && <span className="text-xs text-error">{errors.message}</span>}
            <div className="text-xs text-muted text-right">{form.message.length}/500</div>
          </div>
          <button type="submit" className="bg-neon text-black font-semibold px-6 py-2.5 rounded-lg hover:bg-neon-bright">Send Message</button>
        </form>
      )}
    </div>
  )
}
