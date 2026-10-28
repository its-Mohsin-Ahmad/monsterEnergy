import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, Package, Users, BarChart3, Boxes, MessageSquare } from 'lucide-react'

const nav = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/inventory', label: 'Inventory', icon: Boxes },
  { to: '/admin/messages', label: 'Messages', icon: MessageSquare },
]

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-bg flex">
      <aside className="hidden md:flex flex-col w-[220px] h-screen sticky top-0 bg-sidebar border-r border-border">
        <div className="px-5 py-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-neon flex items-center justify-center text-black font-bold text-sm">A</div>
          <div className="font-display text-base">ADMIN</div>
        </div>
        <nav className="flex-1 px-3 py-2 space-y-1">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${isActive ? 'bg-neon text-black font-semibold' : 'text-text-2 hover:text-text hover:bg-card'}`
              }>
              <n.icon size={16} />
              <span>{n.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <NavLink to="/" className="text-xs text-muted hover:text-neon">← Back to store</NavLink>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-border flex items-center px-6 justify-between bg-bg/80 backdrop-blur sticky top-0 z-20">
          <div className="font-display text-lg">Admin Dashboard (Demo)</div>
          <div className="text-xs text-muted">{new Date().toLocaleDateString()}</div>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
