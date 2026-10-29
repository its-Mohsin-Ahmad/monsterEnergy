export interface Product {
  id: string
  name: string
  slug: string
  category: string
  variant: string
  price: number
  costPrice?: number
  salePrice?: number
  sku?: string
  barcode?: string
  image: string
  gallery: string[]
  description: string
  shortDescription?: string
  stock: number // Total physical on-hand
  reservedStock?: number // Allocated to pending orders
  availableStock?: number // stock - reservedStock
  minStock?: number // Low-stock threshold
  incomingStock?: number
  damagedStock?: number
  status: 'published' | 'draft' | 'archived'
  isNew?: boolean
  isFeatured?: boolean
  homepageVisible?: boolean
  shopCarouselVisible?: boolean
  flavor?: string
  canSize?: string
  packQty?: string
  seoTitle?: string
  seoDescription?: string
  lastUpdated?: string
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
  productName?: string
  productImage?: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  number: string
  date: string
  customerId: string
  customerName: string
  customerEmail?: string
  customerPhone?: string
  shippingAddress?: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  fulfillmentStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  notes?: string
  timeline?: { status: string; date: string; note: string }[]
}

export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  city?: string
  registeredAt: string
  status: 'active' | 'inactive'
  ordersCount: number
  totalSpent: number
  notes?: string
}

export type StockAdjustmentType =
  | 'Stock Received'
  | 'Manual Increase'
  | 'Manual Decrease'
  | 'Damaged Goods'
  | 'Expired Goods'
  | 'Returned Goods'
  | 'Inventory Correction'
  | 'Lost / Missing'
  | 'Order Fulfillment'
  | 'Order Cancellation'

export interface StockMovement {
  id: string
  productId: string
  productName: string
  sku: string
  type: StockAdjustmentType
  quantity: number // positive for additions, negative for deductions
  previousStock: number
  resultingStock: number
  reason: string
  referenceId?: string
  actor: string
  timestamp: string
}

export interface Supplier {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
  notes?: string
  status: 'active' | 'inactive'
  leadTimeDays?: number
}

export interface PurchaseOrderItem {
  productId: string
  productName: string
  quantity: number
  receivedQuantity: number
  unitCost: number
}

export interface PurchaseOrder {
  id: string
  poNumber: string
  supplierId: string
  supplierName: string
  date: string
  expectedDelivery: string
  items: PurchaseOrderItem[]
  subtotal: number
  status: 'ordered' | 'partially_received' | 'received' | 'cancelled'
  notes?: string
}

export interface Coupon {
  id: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
  minOrderValue: number
  startDate: string
  endDate: string
  usageLimit: number
  timesUsed: number
  active: boolean
  description?: string
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: 'Super Admin' | 'Product Manager' | 'Inventory Manager' | 'Order Manager' | 'Read-Only Analyst'
  avatar: string
  lastActive: string
  status: 'active' | 'inactive'
}

export interface ActivityLog {
  id: string
  actor: string
  role: string
  action: string
  entity: string
  details: string
  timestamp: string
  ip?: string
}

export interface AdminNotification {
  id: string
  title: string
  message: string
  type: 'out_of_stock' | 'low_stock' | 'order' | 'payment' | 'shipping' | 'system'
  timestamp: string
  read: boolean
  link?: string
}

export interface StoreSettings {
  general: {
    siteName: string
    contactEmail: string
    currency: string
    currencySymbol: string
    timeZone: string
    dateFormat: string
  }
  inventory: {
    defaultLowStockThreshold: number
    preventOverselling: boolean
    autoReserveStock: boolean
    notifyOnLowStock: boolean
  }
  security: {
    sessionTimeoutMinutes: number
    require2FA: boolean
    auditLogging: boolean
  }
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
