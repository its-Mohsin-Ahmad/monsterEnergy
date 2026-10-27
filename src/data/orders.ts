import type { Order } from '../types'

const o = (id: string, num: string, date: string, cust: string, name: string, items: { productId: string; quantity: number; price: number }[], status: Order['status']): Order => ({
  id, number: num, date, customerId: cust, customerName: name,
  items: items.map((i) => ({ productId: i.productId, quantity: i.quantity, price: i.price })),
  subtotal: items.reduce((a, b) => a + b.price * b.quantity, 0),
  shipping: 4.99,
  tax: items.reduce((a, b) => a + b.price * b.quantity, 0) * 0.08,
  total: 0,
  paymentStatus: status === 'cancelled' ? 'failed' : 'paid',
  fulfillmentStatus: status,
  status,
})

const ordersRaw: Order[] = [
  o('o1', 'ORD-1001', '2026-09-12', 'cu1', 'Alex Carter', [{ productId: 'p1', quantity: 2, price: 2.99 }, { productId: 'p5', quantity: 1, price: 3.49 }], 'delivered'),
  o('o2', 'ORD-1002', '2026-09-18', 'cu2', 'Sam Rivera', [{ productId: 'p2', quantity: 3, price: 3.19 }], 'shipped'),
  o('o3', 'ORD-1003', '2026-09-25', 'cu3', 'Jordan Lee', [{ productId: 'p13', quantity: 1, price: 3.59 }, { productId: 'p16', quantity: 2, price: 3.19 }], 'processing'),
  o('o4', 'ORD-1004', '2026-10-01', 'cu1', 'Alex Carter', [{ productId: 'p10', quantity: 4, price: 3.09 }], 'pending'),
  o('o5', 'ORD-1005', '2026-10-05', 'cu4', 'Taylor Kim', [{ productId: 'p6', quantity: 2, price: 3.49 }, { productId: 'p8', quantity: 1, price: 3.29 }], 'delivered'),
]
ordersRaw.forEach((x) => { x.total = x.subtotal + x.shipping + x.tax })
export const orders: Order[] = ordersRaw
export default orders
