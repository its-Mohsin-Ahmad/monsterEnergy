import { Link } from 'react-router-dom'

export default function OrderConfirmationPage() {
  return (
    <div className="px-4 md:px-8 py-6 max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-neon/20 border border-neon flex items-center justify-center mx-auto mb-4 text-neon text-2xl">✓</div>
        <h1 className="font-display text-3xl">ORDER CONFIRMED (DEMO)</h1>
        <p className="text-sm text-muted mt-1">Thank you for your purchase!</p>
      </div>
      <div className="bg-card border border-border rounded-card p-6 space-y-3">
        <div className="text-xs text-muted">Payment: paid · Fulfillment: pending (simulated)</div>
        <p className="text-sm text-text-2">No real payment was processed. This is a frontend demonstration.</p>
      </div>
      <div className="flex gap-3 justify-center">
        <Link to="/shop" className="bg-neon text-black font-semibold px-6 py-2.5 rounded-lg">Continue Shopping</Link>
      </div>
    </div>
  )
}
