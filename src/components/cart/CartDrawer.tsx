import { X } from 'lucide-react'
import { useUIStore } from '../../store/uiStore'
import { useCartStore } from '../../store/cartStore'
import { useDemoStore } from '../../store/demoStore'
import { formatCurrency } from '../../utils/formatCurrency'
import { Link } from 'react-router-dom'

export function CartDrawer() {
  const open = useUIStore((s) => s.cartOpen)
  const close = useUIStore((s) => s.closeCart)
  const items = useCartStore((s) => s.items)
  const remove = useCartStore((s) => s.remove)
  const setQty = useCartStore((s) => s.setQty)
  const products = useDemoStore((s) => s.products)
  const subtotal = items.reduce((a, i) => {
    const p = products.find((x) => x.id === i.productId)
    return a + (p ? p.price * i.quantity : 0)
  }, 0)
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70" onClick={close} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-bg border-l border-border flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="font-display text-lg">Your Cart</div>
          <button onClick={close} className="text-text-2 hover:text-text"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 && <div className="text-center text-muted py-12">Cart is empty.</div>}
          {items.map((i) => {
            const p = products.find((x) => x.id === i.productId)
            if (!p) return null
            return (
              <div key={i.productId} className="flex gap-3">
                <img src={p.image} alt={p.name} className="w-16 h-16 object-contain drink-can" />
                <div className="flex-1">
                  <div className="text-sm font-semibold">{p.name}</div>
                  <div className="text-xs text-muted">{formatCurrency(p.price)}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => setQty(i.productId, i.quantity - 1)} className="w-7 h-7 rounded border border-border hover:border-neon">-</button>
                    <span className="text-sm">{i.quantity}</span>
                    <button onClick={() => setQty(i.productId, i.quantity + 1)} className="w-7 h-7 rounded border border-border hover:border-neon">+</button>
                    <button onClick={() => remove(i.productId)} className="ml-auto text-xs text-error">Remove</button>
                  </div>
                </div>
                <div className="text-sm font-semibold">{formatCurrency(p.price * i.quantity)}</div>
              </div>
            )
          })}
        </div>
        <div className="border-t border-border p-5 space-y-3">
          <div className="flex justify-between text-sm"><span className="text-text-2">Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
          <Link to="/cart" onClick={close} className="block text-center bg-card border border-border rounded-lg py-2.5 text-sm hover:border-neon">View Cart</Link>
          <Link to="/checkout" onClick={close} className="block text-center bg-neon text-black font-semibold rounded-lg py-2.5 text-sm hover:bg-neon-bright">Checkout</Link>
        </div>
      </aside>
    </div>
  )
}
