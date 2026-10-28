import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useDemoStore } from '../store/demoStore'
import { useUIStore } from '../store/uiStore'
import { formatCurrency } from '../utils/formatCurrency'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const items = useCartStore((s) => s.items)
  const clear = useCartStore((s) => s.clear)
  const products = useDemoStore((s) => s.products)
  const profile = useDemoStore((s) => s.profile)
  const showToast = useUIStore((s) => s.showToast)

  const [step, setStep] = useState(0)
  const [info, setInfo] = useState({ name: profile.name, email: profile.email, phone: profile.phone })
  const [addr, setAddr] = useState({ street: '', apartment: '', city: '', region: '', postal: '', country: '' })
  const [payment, setPayment] = useState('demo-card')
  const [errors, setErrors] = useState<any>({})

  const subtotal = items.reduce((a, i) => { const p = products.find((x) => x.id === i.productId); return a + (p ? p.price * i.quantity : 0) }, 0)
  const shipping = items.length ? 4.99 : 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const validateInfo = () => {
    const e: any = {}
    if (!info.name.trim()) e.name = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) e.email = 'Invalid email'
    return e
  }
  const validateAddr = () => {
    const e: any = {}
    if (!addr.street.trim()) e.street = 'Required'
    if (!addr.city.trim()) e.city = 'Required'
    if (!addr.postal.trim()) e.postal = 'Required'
    if (!addr.country.trim()) e.country = 'Required'
    return e
  }

  const placeOrder = () => {
    clear()
    showToast('Demo order placed')
    navigate('/order-confirmation/demo')
  }

  const steps = ['Information', 'Delivery', 'Review', 'Confirmation']

  return (
    <div className="px-4 md:px-8 py-6 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <div className="flex gap-2">
          {steps.map((s, idx) => (
            <div key={s} className={`flex-1 text-center text-xs py-2 rounded-lg border ${idx === step ? 'bg-neon text-black border-neon' : idx < step ? 'border-neon text-neon' : 'border-border text-muted'}`}>{s}</div>
          ))}
        </div>

        {step === 0 && (
          <div className="bg-card border border-border rounded-card p-6 space-y-4">
            <h2 className="font-display text-xl">Information</h2>
            <div>
              <label className="text-xs text-muted block mb-1">Name *</label>
              <input value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none" />
              {errors.name && <span className="text-xs text-error">{errors.name}</span>}
            </div>
            <div>
              <label className="text-xs text-muted block mb-1">Email *</label>
              <input value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none" />
              {errors.email && <span className="text-xs text-error">{errors.email}</span>}
            </div>
            <div>
              <label className="text-xs text-muted block mb-1">Phone</label>
              <input value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none" />
            </div>
            <button onClick={() => { const e = validateInfo(); setErrors(e); if (!Object.keys(e).length) setStep(1) }} className="bg-neon text-black font-semibold px-6 py-2.5 rounded-lg">Continue</button>
          </div>
        )}

        {step === 1 && (
          <div className="bg-card border border-border rounded-card p-6 space-y-4">
            <h2 className="font-display text-xl">Delivery</h2>
            {['street', 'apartment', 'city', 'region', 'postal', 'country'].map((f) => (
              <div key={f}>
                <label className="text-xs text-muted block mb-1 capitalize">{f}</label>
                <input value={(addr as any)[f]} onChange={(e) => setAddr({ ...addr, [f]: e.target.value })} className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm focus:border-neon outline-none" />
                {(errors as any)[f] && <span className="text-xs text-error">{(errors as any)[f]}</span>}
              </div>
            ))}
            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="border border-border px-6 py-2.5 rounded-lg">Back</button>
              <button onClick={() => { const e = validateAddr(); setErrors(e); if (!Object.keys(e).length) setStep(2) }} className="bg-neon text-black font-semibold px-6 py-2.5 rounded-lg">Continue</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-card border border-border rounded-card p-6 space-y-4">
            <h2 className="font-display text-xl">Review</h2>
            <div className="text-sm text-text-2">
              <div><span className="text-muted">Name:</span> {info.name}</div>
              <div><span className="text-muted">Email:</span> {info.email}</div>
              <div><span className="text-muted">Address:</span> {addr.street}, {addr.city}, {addr.region} {addr.postal}, {addr.country}</div>
            </div>
            <div>
              <div className="text-sm font-semibold mb-2">Payment (Demo)</div>
              <label className="flex items-center gap-2 text-sm"><input type="radio" checked={payment === 'demo-card'} onChange={() => setPayment('demo-card')} /> Demo Card</label>
              <label className="flex items-center gap-2 text-sm"><input type="radio" checked={payment === 'cod'} onChange={() => setPayment('cod')} /> Pay on Delivery Demonstration</label>
            </div>
            <p className="text-xs text-muted">No real payment details are collected. This is a demonstration.</p>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="border border-border px-6 py-2.5 rounded-lg">Back</button>
              <button onClick={placeOrder} className="bg-neon text-black font-semibold px-6 py-2.5 rounded-lg">Place Order (Demo)</button>
            </div>
          </div>
        )}
      </div>
      <div className="bg-card border border-border rounded-card p-5 h-fit space-y-3">
        <div className="font-display text-lg">Summary</div>
        {items.map((i) => {
          const p = products.find((x) => x.id === i.productId)
          if (!p) return null
          return <div key={i.productId} className="flex justify-between text-sm"><span>{p.name} ×{i.quantity}</span><span>{formatCurrency(p.price * i.quantity)}</span></div>
        })}
        <div className="border-t border-border pt-3 space-y-1">
          <div className="flex justify-between text-sm"><span className="text-text-2">Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-text-2">Shipping (est.)</span><span>{formatCurrency(shipping)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-text-2">Tax (est.)</span><span>{formatCurrency(tax)}</span></div>
          <div className="flex justify-between font-semibold"><span>Total</span><span className="text-neon">{formatCurrency(total)}</span></div>
        </div>
      </div>
    </div>
  )
}
