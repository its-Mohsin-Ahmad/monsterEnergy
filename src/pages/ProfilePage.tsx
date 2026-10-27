import { useDemoStore } from '../store/demoStore'
import { useWishlistStore } from '../store/wishlistStore'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/formatCurrency'

export default function ProfilePage() {
  const profile = useDemoStore((s) => s.profile)
  const orders = useDemoStore((s) => s.orders)
  const wl = useWishlistStore()
  const recent = orders.slice(0, 3)
  return (
    <div className="px-4 md:px-8 py-6 space-y-6 max-w-3xl">
      <div className="bg-card border border-border rounded-card p-6 flex items-center gap-4">
        <img src={profile.avatar} alt="avatar" className="w-16 h-16 rounded-full object-cover" />
        <div>
          <div className="font-display text-2xl">{profile.name}</div>
          <div className="text-sm text-text-2">{profile.email}</div>
          <div className="text-xs text-muted">Demo account (no real authentication)</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card border border-border rounded-card p-4 text-center">
          <div className="font-display text-2xl text-neon">{recent.length}</div>
          <div className="text-xs text-muted">Recent Orders</div>
        </div>
        <div className="bg-card border border-border rounded-card p-4 text-center">
          <div className="font-display text-2xl text-neon">{wl.ids.length}</div>
          <div className="text-xs text-muted">Wishlist</div>
        </div>
        <div className="bg-card border border-border rounded-card p-4 text-center">
          <div className="font-display text-2xl text-neon">{orders.length}</div>
          <div className="text-xs text-muted">Total Orders</div>
        </div>
      </div>
      <div>
        <h2 className="font-display text-xl mb-3">Recent Orders</h2>
        {recent.map((o) => (
          <Link key={o.id} to={`/orders/${o.id}`} className="block bg-card border border-border rounded-card p-4 mb-2 hover:border-neon">
            <div className="flex justify-between"><span>{o.number}</span><span className="text-neon">{formatCurrency(o.total)}</span></div>
            <div className="text-xs text-muted">{o.date} · {o.status}</div>
          </Link>
        ))}
      </div>
      <Link to="/settings" className="inline-flex border border-border px-6 py-2.5 rounded-lg hover:border-neon">Edit Settings</Link>
    </div>
  )
}

