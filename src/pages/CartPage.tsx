import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useDemoStore } from '../store/demoStore'
import { formatCurrency } from '../utils/formatCurrency'
import { ShoppingCart } from 'lucide-react'

export default function CartPage() {
  const items = useCartStore((s) => s.items)
  const remove = useCartStore((s) => s.remove)
  const setQty = useCartStore((s) => s.setQty)
  const products = useDemoStore((s) => s.products)
  const subtotal = items.reduce((a, i) => { const p = products.find((x) => x.id === i.productId); return a + (p ? p.price * i.quantity : 0) }, 0)
  const shipping = items.length ? 4.99 : 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="px-4 md:px-8 py-6">
        <div className="flex flex-col items-center py-16">
          <ShoppingCart size={48} className="text-muted mb-4" />
          <div className="font-display text-2xl mb-2">YOUR CART IS EMPTY</div>
          <p className="text-sm text-muted mb-6">Add some drinks to get started.</p>
          <Link to="/shop" className="bg-neon text-black font-semibold px-6 py-2.5 rounded-lg">Explore Products</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 md:px-8 py-6 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-3">
        {items.map((i) => {
          const p = products.find((x) => x.id === i.productId)
          if (!p) return null
          return (
            <div key={i.productId} className="bg-card border border-border rounded-card p-4 flex gap-4">
              <img src={p.image} alt={p.name} className="w-20 h-20 object-contain drink-can" />
              <div className="flex-1">
                <div className="font-semibold">{p.name}</div>
                <div className="text-xs text-muted">{p.variant}</div>
                <div className="text-sm text-neon mt-1">{formatCurrency(p.price)}</div>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => setQty(i.productId, i.quantity - 1)} className="w-7 h-7 rounded border border-border hover:border-neon">-</button>
                  <span className="text-sm">{i.quantity}</span>
                  <button onClick={() => setQty(i.productId, i.quantity + 1)} className="w-7 h-7 rounded border border-border hover:border-neon">+</button>
                  <button onClick={() => remove(i.productId)} className="ml-4 text-xs text-error">Remove</button>
                </div>
              </div>
              <div className="font-semibold">{formatCurrency(p.price * i.quantity)}</div>
            </div>
          )
        })}
      </div>
      <div className="bg-card border border-border rounded-card p-5 h-fit space-y-3">
        <div className="font-display text-lg">Order Summary</div>
        <div className="flex justify-between text-sm"><span className="text-text-2">Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
        <div className="flex justify-between text-sm"><span className="text-text-2">Shipping (est.)</span><span>{formatCurrency(shipping)}</span></div>
        <div className="flex justify-between text-sm"><span className="text-text-2">Tax (est.)</span><span>{formatCurrency(tax)}</span></div>
        <div className="flex justify-between font-semibold border-t border-border pt-3"><span>Total</span><span className="text-neon">{formatCurrency(total)}</span></div>
        <Link to="/checkout" className="block text-center bg-neon text-black font-semibold py-2.5 rounded-lg hover:bg-neon-bright">Proceed to Checkout</Link>
        <Link to="/shop" className="block text-center border border-border rounded-lg py-2.5 text-sm hover:border-neon">Continue Shopping</Link>
      </div>
    </div>
  )
}
