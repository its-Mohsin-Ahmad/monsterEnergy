import { useDemoStore } from '../store/demoStore'
import { useWishlistStore } from '../store/wishlistStore'

export default function ProfilePage() {
  const profile = useDemoStore((s) => s.profile)
  const wl = useWishlistStore()
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
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card border border-border rounded-card p-4 text-center">
          <div className="font-display text-2xl text-neon">{wl.ids.length}</div>
          <div className="text-xs text-muted">Wishlist</div>
        </div>
      </div>
    </div>
  )
}

