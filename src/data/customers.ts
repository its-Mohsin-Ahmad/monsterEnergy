import type { Customer } from '../types'

export const customers: Customer[] = [
  { id: 'cu1', name: 'Alex Carter', email: 'alex@example.com', registeredAt: '2026-08-01', status: 'active', ordersCount: 2, totalSpent: 32.5 },
  { id: 'cu2', name: 'Sam Rivera', email: 'sam@example.com', registeredAt: '2026-08-12', status: 'active', ordersCount: 1, totalSpent: 14.56 },
  { id: 'cu3', name: 'Jordan Lee', email: 'jordan@example.com', registeredAt: '2026-08-20', status: 'active', ordersCount: 1, totalSpent: 13.16 },
  { id: 'cu4', name: 'Taylor Kim', email: 'taylor@example.com', registeredAt: '2026-09-02', status: 'active', ordersCount: 1, totalSpent: 13.76 },
  { id: 'cu5', name: 'Morgan Blake', email: 'morgan@example.com', registeredAt: '2026-09-10', status: 'inactive', ordersCount: 0, totalSpent: 0 },
]
export default customers
