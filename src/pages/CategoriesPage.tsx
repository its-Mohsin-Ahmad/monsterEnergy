import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useDemoStore } from '../store/demoStore'
import { categories } from '../data/categories'

export default function CategoriesPage() {
  const products = useDemoStore((s) => s.products)
  return (
    <div className="px-4 md:px-8 py-6 space-y-8">
      <div>
        <h1 className="font-display text-3xl md:text-4xl">EXPLORE THE COLLECTION</h1>
        <p className="text-sm text-text-2 mt-1">Browse drinks by collection and flavor.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((c) => {
          const count = products.filter((p) => p.category === c.slug).length
          return (
            <Link key={c.id} to={`/shop?category=${c.slug}`} className="group bg-card border border-border rounded-card overflow-hidden hover:border-neon transition">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-display text-xl">{c.name}</div>
                  <div className="text-xs text-muted">{c.description} · {count} products</div>
                </div>
                <ArrowRight className="text-text-2 group-hover:text-neon transition" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
