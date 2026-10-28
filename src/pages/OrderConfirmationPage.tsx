import { useParams, Link } from 'react-router-dom'
import { useDemoStore } from '../store/demoStore'
import { formatCurrency } from '../utils/formatCurrency'

export default function OrderConfirmationPage() {
  const { orderId } = useParams()
  const orders = useDemoStore((s) => s.orders)
  const products = useDemoStore((s) => s.products)
  const order = orders.find((o) => o.id === orderId)
  if (!order) return <div className="px-8 py-12">Order not found.</div>
  return (
    <div className="px-4 md:px-8 py-6 max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-neon/20 border border-neon flex items-center justify-center mx-auto mb-4 text-neon text-2xl">✓</div>
        <h1 className="font-display text-3xl">ORDER CONFIRMED (DEMO)</h1>
        <p className="text-sm text-muted mt-1">Order {order.number}</p>
      </div>
      <div className="bg-card border border-border rounded-card p-6 space-y-3">
        {order.items.map((i) => {
          const p = products.find((x) => x.id === i.productId)
          return <div key={i.productId} className="flex justify-between text-sm"><span>{p?.name} ×{i.quantity}</span><span>{formatCurrency(i.price * i.quantity)}</span></div>
        })}
        <div className="border-t border-border pt-3 flex justify-between font-semibold"><span>Total</span><span className="text-neon">{formatCurrency(order.total)}</span></div>
        <div className="text-xs text-muted">Payment: {order.paymentStatus} · Fulfillment: {order.fulfillmentStatus} (simulated)</div>
      </div>
      <div className="flex gap-3 justify-center">
        <Link to="/shop" className="bg-neon text-black font-semibold px-6 py-2.5 rounded-lg">Continue Shopping</Link>
      </div>
    </div>
  )
}
