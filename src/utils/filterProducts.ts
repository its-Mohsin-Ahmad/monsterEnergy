import type { Product } from '../types'

export function filterProducts(products: Product[], opts: {
  category?: string
  search?: string
  sort?: string
}) {
  let list = [...products].filter((p) => p.status === 'published')
  if (opts.category && opts.category !== 'all') {
    list = list.filter((p) => p.category === opts.category)
  }
  if (opts.search) {
    const q = opts.search.toLowerCase()
    list = list.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.variant.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    )
  }
  switch (opts.sort) {
    case 'name-asc': list.sort((a, b) => a.name.localeCompare(b.name)); break
    case 'price-asc': list.sort((a, b) => a.price - b.price); break
    case 'price-desc': list.sort((a, b) => b.price - a.price); break
    case 'newest': list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
    default: break
  }
  return list
}
