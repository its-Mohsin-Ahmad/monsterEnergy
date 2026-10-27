import { useWishlistStore } from '../store/wishlistStore'
import { useDemoStore } from '../store/demoStore'
import { ProductCard } from '../components/products/ProductCard'

export default function WishlistPage() {
  const wl = useWishlistStore()
  const products = useDemoStore((s) => s.products)
  const wished = products.filter((p) => wl.ids.includes(p.id))
  return (
    <div className="px-4 md:px-8 py-6 space-y-6">
      <h1 className="font-display text-3xl">YOUR WISHLIST</h1>
      {wished.length === 0 ? (
        <div className="text-center py-16">
          <div className="font-display text-2xl mb-2">EMPTY WISHLIST</div>
          <p className="text-sm text-muted mb-6">Save drinks you love.</p>
          <a href="/shop" className="bg-neon text-black font-semibold px-6 py-2.5 rounded-lg">Browse Products</a>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wished.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
