import { useParams, Link } from 'react-router-dom'
import { useDemoStore } from '../../store/demoStore'
import { formatCurrency } from '../../utils/formatCurrency'

export default function AdminOrderDetails() {
  const { orderId } = useParams()
  const orders = useDemoStore((s) => s.orders)
  const products = useDemoStore((s) => s.products)
  const updateOrder = useDemoStore((s) => s.updateOrder)
  const order = orders.find((o) => o.id === orderId)
  if (!order) return <div className="px-8 py-12">Order not found.</div>
  return (
    <div className="space-y-6 max-w-3xl">
      <Link to="/admin/orders" className="text-sm text-neon">← Back</Link>
      <h1 className="font-display text-2xl">{order.number}</h1>
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
        <div className="text-xs text-muted">Customer: {order.customerName} · Payment: {order.paymentStatus} · Fulfillment: {order.fulfillmentStatus}</div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Status:</span>
          <select value={order.status} onChange={(e) => updateOrder(order.id, { status: e.target.value as any })} className="bg-bg border border-border rounded-lg px-3 py-1.5 text-sm">
            {['pending','processing','shipped','delivered','cancelled'].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <p className="text-xs text-muted">Demo only — no real fulfillment integrations.</p>
      </div>
    </div>
  )
}
