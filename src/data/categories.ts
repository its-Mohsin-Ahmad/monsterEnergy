import type { Category } from '../types'
import collectionImg1 from '../images/about/collection 1.jpg'
import collectionImg2 from '../images/about/collection 2.jpg'

export const categories: Category[] = [
  { id: 'c1', slug: 'original', name: 'Original', description: 'The classic Monster taste.', image: collectionImg1, accent: '#B7FF00' },
  { id: 'c2', slug: 'ultra', name: 'Ultra', description: 'Zero sugar, crisp refreshment.', image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=600&q=80', accent: '#D1FF4D' },
  { id: 'c3', slug: 'zero-sugar', name: 'Zero Sugar', description: 'All energy, no sugar.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80', accent: '#B7FF00' },
  { id: 'c4', slug: 'juiced', name: 'Juiced', description: 'Fruit-forward flavors.', image: collectionImg2, accent: '#FFB547' },
  { id: 'c5', slug: 'other', name: 'Other Flavors', description: 'Rehab, reserve and more.', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80', accent: '#A1ABA3' },
]

export default categories
