import { useParams, Link } from 'react-router-dom'
import { useDemoStore } from '../store/demoStore'
import { formatCurrency } from '../utils/formatCurrency'

export default function OrderDetailsPage() {
  const { orderId } = useParams()
  const orders = useDemoStore((s) => s.orders)
  const products = useDemoStore((s) => s.products)
  const order = orders.find((o) => o.id === orderId)
  if (!order) return <div className="px-8 py-12">Order not found.</div>
  return (
    <div className="px-4 md:px-8 py-6 space-y-6 max-w-3xl">
      <Link to="/orders" className="text-sm text-neon">← Back</Link>
      <h1 className="font-display text-3xl">{order.number}</h1>
      <div className="bg-card border border-border rounded-card p-6 space-y-3">
        {order.items.map((i) => {
          const p = products.find((x) => x.id === i.productId)
          return <div key={i.productId} className="flex justify-between text-sm"><span>{p?.name} ×{i.quantity}</span><span>{formatCurrency(i.price * i.quantity)}</span></div>
        })}
        <div className="border-t border-border pt-3 space-y-1">
          <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatCurrency(order.subtotal)}</span></div>
          <div className="flex justify-between text-sm"><span>Shipping</span><span>{formatCurrency(order.shipping)}</span></div>
          <div className="flex justify-between text-sm"><span>Tax</span><span>{formatCurrency(order.tax)}</span></div>
          <div className="flex justify-between font-semibold"><span>Total</span><span className="text-neon">{formatCurrency(order.total)}</span></div>
        </div>
        <div className="text-xs text-muted">Status: {order.status} · Payment: {order.paymentStatus} · Fulfillment: {order.fulfillmentStatus}</div>
      </div>
    </div>
  )
}
