import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  Product,
  Order,
  StockMovement,
  Supplier,
  PurchaseOrder,
  Coupon,
  AdminUser,
  ActivityLog,
  AdminNotification,
  StoreSettings,
} from '../types'
import { products as seedProducts } from '../data/products'

interface AdminState {
  // Auth
  isAuthenticated: boolean
  currentUser: AdminUser
  login: (email: string, pass: string) => boolean
  logout: () => void

  // Products
  products: Product[]
  addProduct: (p: Omit<Product, 'id'>) => Product
  updateProduct: (id: string, patch: Partial<Product>) => void
  archiveProduct: (id: string) => void
  deleteProduct: (id: string) => void

  // Inventory & Stock Movements
  stockMovements: StockMovement[]
  adjustStock: (
    productId: string,
    delta: number,
    type: StockMovement['type'],
    reason: string,
    referenceId?: string
  ) => void

  // Orders
  orders: Order[]
  updateOrderStatus: (
    orderId: string,
    status: Order['status'],
    fulfillmentStatus: Order['fulfillmentStatus']
  ) => void
  updatePaymentStatus: (orderId: string, paymentStatus: Order['paymentStatus']) => void
  addOrder: (order: Omit<Order, 'id'>) => Order

  // Suppliers & Purchasing
  suppliers: Supplier[]
  addSupplier: (s: Omit<Supplier, 'id'>) => void
  updateSupplier: (id: string, patch: Partial<Supplier>) => void
  purchaseOrders: PurchaseOrder[]
  createPurchaseOrder: (po: Omit<PurchaseOrder, 'id'>) => void
  receivePurchaseOrder: (poId: string, receivedMap: Record<string, number>) => void

  // Coupons
  coupons: Coupon[]
  addCoupon: (c: Omit<Coupon, 'id'>) => void
  toggleCoupon: (id: string) => void
  deleteCoupon: (id: string) => void

  // Admin Users
  adminUsers: AdminUser[]
  addAdminUser: (u: Omit<AdminUser, 'id'>) => void
  updateAdminUser: (id: string, patch: Partial<AdminUser>) => void

  // Activity Logs
  activityLogs: ActivityLog[]
  logAction: (action: string, entity: string, details: string) => void

  // Notifications
  notifications: AdminNotification[]
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void

  // Settings
  settings: StoreSettings
  updateSettings: (patch: Partial<StoreSettings>) => void
}

const defaultAdminUser: AdminUser = {
  id: 'adm-1',
  name: 'Admin',
  email: 'admin@monsterenergy.com',
  role: 'Super Admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  lastActive: 'Just now',
  status: 'active',
}

const initialSuppliers: Supplier[] = [
  {
    id: 'sup-1',
    name: 'Monster Beverage Bottling Co.',
    contactPerson: 'David Miller',
    email: 'd.miller@monsterbottling.com',
    phone: '+1 (951) 555-0144',
    address: 'Corona, California, USA',
    status: 'active',
    leadTimeDays: 5,
  },
  {
    id: 'sup-2',
    name: 'Ball Metal Beverage Packaging',
    contactPerson: 'Sarah Jensen',
    email: 's.jensen@ballpackaging.com',
    phone: '+1 (303) 555-0182',
    address: 'Westminster, Colorado, USA',
    status: 'active',
    leadTimeDays: 7,
  },
  {
    id: 'sup-3',
    name: 'Flavorcraft Ingredients Global',
    contactPerson: 'Marcus Vance',
    email: 'marcus@flavorcraft.net',
    phone: '+1 (415) 555-0199',
    address: 'San Francisco, CA, USA',
    status: 'active',
    leadTimeDays: 10,
  },
]

const initialOrders: Order[] = [
  {
    id: 'ord-10432',
    number: '#ME-10432',
    date: 'Apr 30, 2025',
    customerId: 'cust-1',
    customerName: 'John Smith',
    customerEmail: 'john.smith@gmail.com',
    customerPhone: '+1 (555) 234-5678',
    shippingAddress: '742 Evergreen Terrace, Springfield, OR',
    items: [
      { productId: 'p1', productName: 'Monster Energy Original', quantity: 12, price: 2.99 },
      { productId: 'p5', productName: 'Monster Mango Loco', quantity: 2, price: 3.29 },
    ],
    subtotal: 42.46,
    shipping: 0.04,
    tax: 0,
    total: 42.5,
    paymentStatus: 'paid',
    fulfillmentStatus: 'processing',
    status: 'processing',
    notes: 'Leave at front door with security code.',
  },
  {
    id: 'ord-10431',
    number: '#ME-10431',
    date: 'Apr 30, 2025',
    customerId: 'cust-2',
    customerName: 'Sarah Miller',
    customerEmail: 'sarah.m@outlook.com',
    customerPhone: '+1 (555) 876-5432',
    shippingAddress: '100 Sunset Blvd, Los Angeles, CA',
    items: [{ productId: 'p2', productName: 'Monster Ultra (16oz)', quantity: 9, price: 3.19 }],
    subtotal: 28.71,
    shipping: 0.28,
    tax: 0,
    total: 28.99,
    paymentStatus: 'paid',
    fulfillmentStatus: 'shipped',
    status: 'shipped',
  },
  {
    id: 'ord-10430',
    number: '#ME-10430',
    date: 'Apr 29, 2025',
    customerId: 'cust-3',
    customerName: 'David Wilson',
    customerEmail: 'd.wilson@corp.com',
    customerPhone: '+1 (555) 345-6789',
    shippingAddress: '450 Lexington Ave, New York, NY',
    items: [
      { productId: 'p1', productName: 'Monster Energy Original', quantity: 20, price: 2.99 },
      { productId: 'p3', productName: 'Monster Energy Zero Sugar', quantity: 5, price: 3.28 },
    ],
    subtotal: 76.2,
    shipping: 0,
    tax: 0,
    total: 76.2,
    paymentStatus: 'paid',
    fulfillmentStatus: 'delivered',
    status: 'delivered',
  },
  {
    id: 'ord-10429',
    number: '#ME-10429',
    date: 'Apr 29, 2025',
    customerId: 'cust-4',
    customerName: 'Emily Davis',
    customerEmail: 'emily.d@icloud.com',
    customerPhone: '+1 (555) 456-7890',
    shippingAddress: '12 Austin Way, Austin, TX',
    items: [
      { productId: 'p5', productName: 'Monster Mango Loco', quantity: 8, price: 3.29 },
      { productId: 'p4', productName: 'Monster Rehab Tea + Lemon', quantity: 3, price: 3.14 },
    ],
    subtotal: 35.75,
    shipping: 0,
    tax: 0,
    total: 35.75,
    paymentStatus: 'pending',
    fulfillmentStatus: 'pending',
    status: 'pending',
  },
  {
    id: 'ord-10428',
    number: '#ME-10428',
    date: 'Apr 28, 2025',
    customerId: 'cust-5',
    customerName: 'Michael Brown',
    customerEmail: 'mbrown99@gmail.com',
    customerPhone: '+1 (555) 567-8901',
    shippingAddress: '88 Michigan Ave, Chicago, IL',
    items: [{ productId: 'p6', productName: 'Monster Java (15oz)', quantity: 15, price: 3.47 }],
    subtotal: 52.1,
    shipping: 0,
    tax: 0,
    total: 52.1,
    paymentStatus: 'paid',
    fulfillmentStatus: 'processing',
    status: 'processing',
  },
]

const initialNotifications: AdminNotification[] = [
  {
    id: 'notif-1',
    title: 'Out of Stock Alert',
    message: 'Monster Ultra (16oz) reached 0 available stock. Immediate reorder needed.',
    type: 'out_of_stock',
    timestamp: '15 minutes ago',
    read: false,
    link: '/dashboard/inventory',
  },
  {
    id: 'notif-2',
    title: 'Low Stock Warning',
    message: 'Monster Energy Original has only 12 units remaining (threshold: 20).',
    type: 'low_stock',
    timestamp: '1 hour ago',
    read: false,
    link: '/dashboard/inventory',
  },
  {
    id: 'notif-3',
    title: 'New High-Value Order #ME-10432',
    message: 'Order received from John Smith for $42.50 awaiting dispatch.',
    type: 'order',
    timestamp: '2 hours ago',
    read: false,
    link: '/dashboard/orders',
  },
  {
    id: 'notif-4',
    title: 'Payment Verification Required',
    message: 'Order #ME-10429 payment authorization pending customer bank clearance.',
    type: 'payment',
    timestamp: '4 hours ago',
    read: true,
    link: '/dashboard/orders',
  },
  {
    id: 'notif-5',
    title: '12 Orders Awaiting Shipment',
    message: 'Fulfillment batch scheduled for 4:00 PM Pacific Time.',
    type: 'shipping',
    timestamp: '6 hours ago',
    read: true,
    link: '/dashboard/orders',
  },
]

const initialStockMovements: StockMovement[] = [
  {
    id: 'SM-8091',
    productId: 'p1',
    productName: 'Monster Energy Original',
    sku: 'MNST-OG-500',
    type: 'Order Fulfillment',
    quantity: -12,
    previousStock: 24,
    resultingStock: 12,
    reason: 'Fulfilled order #ME-10432',
    referenceId: '#ME-10432',
    actor: 'Admin',
    timestamp: 'Apr 30, 2025 09:15 AM',
  },
  {
    id: 'SM-8090',
    productId: 'p2',
    productName: 'Monster Ultra (16oz)',
    sku: 'MNST-ULT-16',
    type: 'Manual Decrease',
    quantity: -5,
    previousStock: 5,
    resultingStock: 0,
    reason: 'Damaged cans written off during warehouse inspection',
    referenceId: 'INSP-2025-04',
    actor: 'Admin',
    timestamp: 'Apr 29, 2025 04:30 PM',
  },
  {
    id: 'SM-8089',
    productId: 'p3',
    productName: 'Monster Energy Zero Sugar',
    sku: 'MNST-ZS-500',
    type: 'Stock Received',
    quantity: 120,
    previousStock: 45,
    resultingStock: 165,
    reason: 'Batch received from PO-2025-01',
    referenceId: 'PO-2025-01',
    actor: 'Admin',
    timestamp: 'Apr 28, 2025 11:20 AM',
  },
  {
    id: 'SM-8088',
    productId: 'p5',
    productName: 'Monster Mango Loco',
    sku: 'MNST-ML-500',
    type: 'Inventory Correction',
    quantity: +3,
    previousStock: 5,
    resultingStock: 8,
    reason: 'Cycle count physical audit recount',
    referenceId: 'AUD-APR',
    actor: 'Admin',
    timestamp: 'Apr 27, 2025 02:40 PM',
  },
]

const initialCoupons: Coupon[] = [
  {
    id: 'c-1',
    code: 'UNLEASH10',
    type: 'percentage',
    value: 10,
    minOrderValue: 25,
    startDate: '2025-04-01',
    endDate: '2025-12-31',
    usageLimit: 500,
    timesUsed: 142,
    active: true,
    description: '10% off for all orders over $25',
  },
  {
    id: 'c-2',
    code: 'BEAST20',
    type: 'percentage',
    value: 20,
    minOrderValue: 50,
    startDate: '2025-04-15',
    endDate: '2025-06-30',
    usageLimit: 200,
    timesUsed: 67,
    active: true,
    description: '20% off high-volume energy packs',
  },
  {
    id: 'c-3',
    code: 'FREESHIP',
    type: 'fixed',
    value: 4.99,
    minOrderValue: 30,
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    usageLimit: 1000,
    timesUsed: 388,
    active: true,
    description: 'Free standard shipping discount ($4.99 value)',
  },
]

const initialSettings: StoreSettings = {
  general: {
    siteName: 'Monster Energy Official Store',
    contactEmail: 'support@monsterenergy.com',
    currency: 'USD',
    currencySymbol: '$',
    timeZone: 'America/Los_Angeles (PST)',
    dateFormat: 'MMM DD, YYYY',
  },
  inventory: {
    defaultLowStockThreshold: 15,
    preventOverselling: true,
    autoReserveStock: true,
    notifyOnLowStock: true,
  },
  security: {
    sessionTimeoutMinutes: 120,
    require2FA: false,
    auditLogging: true,
  },
}

// Prepare products with enhanced inventory fields
function prepareInitialProducts(): Product[] {
  return seedProducts.map((p, idx) => {
    // Exact values to match reference image for key products
    let stock = p.stock || 45
    let reserved = 0
    let minStock = 15

    if (p.slug === 'monster-energy-original') {
      stock = 12
      minStock = 20
    } else if (p.slug === 'monster-energy-ultra-white' || p.category === 'ultra') {
      if (idx === 1) {
        stock = 0
        minStock = 15
      }
    } else if (p.slug.includes('mango')) {
      stock = 8
      minStock = 12
    } else if (p.slug.includes('rehab')) {
      stock = 15
      minStock = 20
    } else if (p.slug.includes('java')) {
      stock = 0
      minStock = 10
    }

    return {
      ...p,
      sku: p.sku || `MNST-${p.slug.slice(0, 4).toUpperCase()}-${idx + 100}`,
      costPrice: p.costPrice || +(p.price * 0.45).toFixed(2),
      stock,
      reservedStock: reserved,
      availableStock: Math.max(0, stock - reserved),
      minStock,
      incomingStock: stock === 0 ? 150 : 0,
      damagedStock: 0,
      status: p.status || 'published',
      lastUpdated: 'Apr 30, 2025',
    }
  })
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isAuthenticated: true, // Authenticated for instant preview, can be toggled via logout
      currentUser: defaultAdminUser,

      login: (email, pass) => {
        if (
          (email === 'admin' || email === 'admin@monsterenergy.com' || email.includes('admin')) &&
          pass.length > 0
        ) {
          set({ isAuthenticated: true, currentUser: defaultAdminUser })
          get().logAction('Admin Login', 'Security', `Logged in from IP 192.168.1.10`)
          return true
        }
        return false
      },

      logout: () => {
        get().logAction('Admin Logout', 'Security', `Session ended`)
        set({ isAuthenticated: false })
      },

      products: prepareInitialProducts(),

      addProduct: (p) => {
        const id = 'p-' + Date.now()
        const newProduct: Product = {
          ...p,
          id,
          stock: p.stock ?? 50,
          reservedStock: 0,
          availableStock: p.stock ?? 50,
          minStock: p.minStock ?? 15,
          status: p.status || 'published',
          lastUpdated: 'Just now',
        }
        set((s) => ({ products: [newProduct, ...s.products] }))
        get().logAction('Create Product', 'Catalog', `Added product "${newProduct.name}"`)
        return newProduct
      },

      updateProduct: (id, patch) => {
        set((s) => ({
          products: s.products.map((p) => {
            if (p.id !== id) return p
            const updated = { ...p, ...patch, lastUpdated: 'Just now' }
            if (patch.stock !== undefined || patch.reservedStock !== undefined) {
              const stock = patch.stock !== undefined ? patch.stock : p.stock
              const reserved = patch.reservedStock !== undefined ? patch.reservedStock : (p.reservedStock || 0)
              updated.availableStock = Math.max(0, stock - reserved)
            }
            return updated
          }),
        }))
        const p = get().products.find((x) => x.id === id)
        get().logAction('Update Product', 'Catalog', `Updated details for "${p?.name || id}"`)
      },

      archiveProduct: (id) => {
        set((s) => ({
          products: s.products.map((p) =>
            p.id === id ? { ...p, status: 'archived', lastUpdated: 'Just now' } : p
          ),
        }))
        const p = get().products.find((x) => x.id === id)
        get().logAction('Archive Product', 'Catalog', `Archived product "${p?.name || id}"`)
      },

      deleteProduct: (id) => {
        const p = get().products.find((x) => x.id === id)
        set((s) => ({ products: s.products.filter((x) => x.id !== id) }))
        get().logAction('Delete Product', 'Catalog', `Deleted product "${p?.name || id}"`)
      },

      stockMovements: initialStockMovements,

      adjustStock: (productId, delta, type, reason, referenceId) => {
        const prod = get().products.find((p) => p.id === productId)
        if (!prod) return

        const previousStock = prod.stock
        const resultingStock = Math.max(0, previousStock + delta)
        const resultingAvailable = Math.max(0, resultingStock - (prod.reservedStock || 0))

        // 1. Update product
        set((s) => ({
          products: s.products.map((p) =>
            p.id === productId
              ? {
                  ...p,
                  stock: resultingStock,
                  availableStock: resultingAvailable,
                  lastUpdated: 'Just now',
                }
              : p
          ),
        }))

        // 2. Append to stock movement ledger (append-only)
        const movement: StockMovement = {
          id: 'SM-' + Math.floor(1000 + Math.random() * 9000),
          productId,
          productName: prod.name,
          sku: prod.sku || 'SKU-001',
          type,
          quantity: delta,
          previousStock,
          resultingStock,
          reason,
          referenceId,
          actor: get().currentUser.name,
          timestamp: new Date().toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        }

        set((s) => ({ stockMovements: [movement, ...s.stockMovements] }))
        get().logAction(
          'Stock Adjustment',
          'Inventory',
          `${type}: ${delta > 0 ? '+' : ''}${delta} units for "${prod.name}" (${reason})`
        )

        // 3. Trigger low-stock / out-of-stock notification if needed
        if (resultingStock === 0) {
          set((s) => ({
            notifications: [
              {
                id: 'notif-' + Date.now(),
                title: 'Out of Stock Alert',
                message: `"${prod.name}" is now out of stock. Immediate reorder recommended.`,
                type: 'out_of_stock',
                timestamp: 'Just now',
                read: false,
                link: '/dashboard/inventory',
              },
              ...s.notifications,
            ],
          }))
        } else if (resultingStock <= (prod.minStock || 15)) {
          set((s) => ({
            notifications: [
              {
                id: 'notif-' + Date.now(),
                title: 'Low Stock Alert',
                message: `"${prod.name}" has reached low stock (${resultingStock} units left).`,
                type: 'low_stock',
                timestamp: 'Just now',
                read: false,
                link: '/dashboard/inventory',
              },
              ...s.notifications,
            ],
          }))
        }
      },

      orders: initialOrders,

      updateOrderStatus: (orderId, status, fulfillmentStatus) => {
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  status,
                  fulfillmentStatus,
                }
              : o
          ),
        }))
        get().logAction(
          'Order Status Update',
          'Orders',
          `Order ${orderId} marked as ${status} / ${fulfillmentStatus}`
        )
      },

      updatePaymentStatus: (orderId, paymentStatus) => {
        set((s) => ({
          orders: s.orders.map((o) => (o.id === orderId ? { ...o, paymentStatus } : o)),
        }))
        get().logAction('Payment Status Update', 'Orders', `Order ${orderId} payment marked as ${paymentStatus}`)
      },

      addOrder: (orderData) => {
        const id = 'ord-' + Date.now()
        const orderNumber = '#ME-' + Math.floor(10000 + Math.random() * 90000)
        const newOrder: Order = {
          ...orderData,
          id,
          number: orderNumber,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        }

        set((s) => ({ orders: [newOrder, ...s.orders] }))
        get().logAction('New Order', 'Orders', `Received order ${orderNumber} for $${newOrder.total.toFixed(2)}`)

        // Reserve stock for items
        newOrder.items.forEach((item) => {
          const prod = get().products.find((p) => p.id === item.productId)
          if (prod) {
            get().updateProduct(item.productId, {
              reservedStock: (prod.reservedStock || 0) + item.quantity,
            })
          }
        })

        return newOrder
      },

      suppliers: initialSuppliers,
      addSupplier: (s) => {
        const id = 'sup-' + Date.now()
        set((state) => ({ suppliers: [...state.suppliers, { ...s, id }] }))
        get().logAction('Add Supplier', 'Purchasing', `Registered supplier "${s.name}"`)
      },
      updateSupplier: (id, patch) => {
        set((state) => ({
          suppliers: state.suppliers.map((s) => (s.id === id ? { ...s, ...patch } : s)),
        }))
        get().logAction('Update Supplier', 'Purchasing', `Updated supplier ${id}`)
      },

      purchaseOrders: [
        {
          id: 'po-1',
          poNumber: 'PO-2025-01',
          supplierId: 'sup-1',
          supplierName: 'Monster Beverage Bottling Co.',
          date: 'Apr 24, 2025',
          expectedDelivery: 'May 04, 2025',
          items: [
            { productId: 'p1', productName: 'Monster Energy Original', quantity: 200, receivedQuantity: 0, unitCost: 1.35 },
            { productId: 'p2', productName: 'Monster Ultra (16oz)', quantity: 150, receivedQuantity: 0, unitCost: 1.45 },
          ],
          subtotal: 487.5,
          status: 'ordered',
        },
      ],

      createPurchaseOrder: (po) => {
        const id = 'po-' + Date.now()
        set((state) => ({ purchaseOrders: [ { ...po, id }, ...state.purchaseOrders ] }))
        get().logAction('Create PO', 'Purchasing', `Created purchase order ${po.poNumber}`)
      },

      receivePurchaseOrder: (poId, receivedMap) => {
        const po = get().purchaseOrders.find((p) => p.id === poId)
        if (!po) return

        Object.entries(receivedMap).forEach(([productId, qty]) => {
          if (qty > 0) {
            get().adjustStock(
              productId,
              qty,
              'Stock Received',
              `Received against ${po.poNumber}`,
              po.poNumber
            )
          }
        })

        set((state) => ({
          purchaseOrders: state.purchaseOrders.map((p) =>
            p.id === poId ? { ...p, status: 'received' } : p
          ),
        }))
        get().logAction('Stock Receiving', 'Purchasing', `Received shipments for PO ${po.poNumber}`)
      },

      coupons: initialCoupons,
      addCoupon: (c) => {
        const id = 'c-' + Date.now()
        set((s) => ({ coupons: [...s.coupons, { ...c, id }] }))
        get().logAction('Create Coupon', 'Promotions', `Created coupon ${c.code}`)
      },
      toggleCoupon: (id) => {
        set((s) => ({
          coupons: s.coupons.map((c) => (c.id === id ? { ...c, active: !c.active } : c)),
        }))
      },
      deleteCoupon: (id) => {
        set((s) => ({ coupons: s.coupons.filter((c) => c.id !== id) }))
      },

      adminUsers: [
        defaultAdminUser,
        {
          id: 'adm-2',
          name: 'Marcus Vance',
          email: 'marcus.v@monsterenergy.com',
          role: 'Inventory Manager',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
          lastActive: '2 hours ago',
          status: 'active',
        },
        {
          id: 'adm-3',
          name: 'Elena Rostova',
          email: 'elena.r@monsterenergy.com',
          role: 'Product Manager',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
          lastActive: 'Yesterday',
          status: 'active',
        },
      ],
      addAdminUser: (u) => {
        const id = 'adm-' + Date.now()
        set((s) => ({ adminUsers: [...s.adminUsers, { ...u, id }] }))
        get().logAction('Create Staff User', 'Security', `Created staff account for ${u.name}`)
      },
      updateAdminUser: (id, patch) => {
        set((s) => ({
          adminUsers: s.adminUsers.map((u) => (u.id === id ? { ...u, ...patch } : u)),
        }))
      },

      activityLogs: [
        {
          id: 'log-1',
          actor: 'Admin',
          role: 'Super Admin',
          action: 'Stock Adjustment',
          entity: 'Monster Energy Original',
          details: 'Fulfilled order #ME-10432 (-12 units)',
          timestamp: 'Apr 30, 2025 09:15 AM',
        },
        {
          id: 'log-2',
          actor: 'Admin',
          role: 'Super Admin',
          action: 'Price Change',
          entity: 'Monster Ultra (16oz)',
          details: 'Updated selling price to $3.19',
          timestamp: 'Apr 29, 2025 05:10 PM',
        },
        {
          id: 'log-3',
          actor: 'Marcus Vance',
          role: 'Inventory Manager',
          action: 'Receiving Confirmed',
          entity: 'PO-2025-01',
          details: 'Stock received from Monster Beverage Bottling Co.',
          timestamp: 'Apr 28, 2025 11:20 AM',
        },
      ],
      logAction: (action, entity, details) => {
        const newLog: ActivityLog = {
          id: 'log-' + Date.now(),
          actor: get().currentUser.name,
          role: get().currentUser.role,
          action,
          entity,
          details,
          timestamp: new Date().toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        }
        set((s) => ({ activityLogs: [newLog, ...s.activityLogs.slice(0, 99)] }))
      },

      notifications: initialNotifications,
      markNotificationRead: (id) => {
        set((s) => ({
          notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        }))
      },
      markAllNotificationsRead: () => {
        set((s) => ({
          notifications: s.notifications.map((n) => ({ ...n, read: true })),
        }))
      },

      settings: initialSettings,
      updateSettings: (patch) => {
        set((s) => ({ settings: { ...s.settings, ...patch } }))
        get().logAction('Update Settings', 'Configuration', `Updated system configuration`)
      },
    }),
    {
      name: 'monster-admin-control-center-v1',
    }
  )
)

