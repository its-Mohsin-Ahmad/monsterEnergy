export interface Product {
  id: string
  name: string
  slug: string
  category: string
  variant: string
  price: number
  image: string
  gallery: string[]
  description: string
  stock: number
  status: 'published' | 'draft' | 'archived'
  isNew?: boolean
  isFeatured?: boolean
}

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  image: string
  accent: string
}

export interface CartItem {
  productId: string
  quantity: number
}

export interface OrderItem {
  productId: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  number: string
  date: string
  customerId: string
  customerName: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  paymentStatus: 'pending' | 'paid' | 'failed'
  fulfillmentStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
}

export interface Customer {
  id: string
  name: string
  email: string
  registeredAt: string
  status: 'active' | 'inactive'
  ordersCount: number
  totalSpent: number
}

export interface ChatMessage {
  id: string
  conversationId: string
  sender: 'customer' | 'agent'
  text: string
  timestamp: string
}

export interface Conversation {
  id: string
  customerName: string
  subject: string
  lastMessage: string
  timestamp: string
  unread: boolean
  messages: ChatMessage[]
}

export interface Profile {
  name: string
  email: string
  avatar: string
  phone: string
  address: string
  city: string
  region: string
  postal: string
  country: string
}
