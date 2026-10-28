import { NavLink } from 'react-router-dom'
import {
  Home,
  ShoppingBag,
  LayoutGrid,
  Zap,
  MessageSquare,
  User,
  LogOut,
  X,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react'
import { useUIStore } from '../../store/uiStore'

// Real Monster Energy claw logo
import logoImg from '../../images/logo/Monster_Energy_ragged_M_text_logo-removebg-preview.png'

interface NavItemDef {
  to: string
  label: string
  icon: LucideIcon
  exact?: boolean
}

const PRIMARY_NAV: NavItemDef[] = [
  { to: '/', label: 'Home', icon: Home, exact: true },
  { to: '/shop', label: 'Shop', icon: ShoppingBag },
  { to: '/categories', label: 'Collections', icon: LayoutGrid },
  { to: '/energy', label: 'Energy', icon: Zap },
  { to: '/chat', label: 'Community', icon: MessageSquare },
]

export function StoreSidebar() {
  const close = useUIStore((s) => s.closeMobileNav)
  const open = useUIStore((s) => s.mobileNavOpen)
  const collapsed = useUIStore((s) => s.sidebarCollapsed)
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)
  const showToast = useUIStore((s) => s.showToast)

  const handleSignOut = () => {
    showToast('Demo account session ended. Welcome to Monster Energy!', 'info')
  }

  return (
    <>
      {/* ── DESKTOP COLLAPSIBLE SIDEBAR ────────────────────────────── */}
      <aside
        style={{ width: collapsed ? '68px' : '220px' }}
        className="hidden md:flex flex-col fixed left-3 top-3 bottom-3 z-50
          bg-[#080c08]/90 backdrop-blur-xl border border-white/10 rounded-2xl
          py-4 shadow-[0_8px_32px_rgba(0,0,0,0.6)] select-none
          transition-[width] duration-300 ease-in-out overflow-hidden"
        aria-label="Sidebar Navigation"
      >
        {/* ── TOP: Logo + Toggle ── */}
        <div className={`flex items-center px-3 mb-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          <NavLink
            to="/"
            className="flex items-center gap-2.5 shrink-0 group"
            title="Monster Energy Home"
            aria-label="Monster Energy Home"
          >
            <img
              src={logoImg}
              alt="Monster Energy"
              className="w-8 h-8 object-contain shrink-0 filter drop-shadow-[0_0_8px_rgba(183,255,0,0.6)] group-hover:scale-110 transition-transform"
            />
            {!collapsed && (
              <div className="overflow-hidden whitespace-nowrap">
                <div className="font-display text-sm tracking-wider text-white leading-tight">MONSTER</div>
                <div className="text-[9px] text-[#B7FF00] tracking-widest font-semibold uppercase">ENERGY</div>
              </div>
            )}
          </NavLink>

          {/* Toggle chevron — always visible */}
          {!collapsed && (
            <button
              onClick={toggleSidebar}
              aria-label="Collapse sidebar"
              className="ml-auto flex items-center justify-center w-7 h-7 rounded-lg text-white/40 hover:text-[#B7FF00] hover:bg-white/10 transition-all duration-200 shrink-0"
            >
              <ChevronRight size={15} className="rotate-180 transition-transform duration-300" />
            </button>
          )}
        </div>

        {/* Collapsed-mode toggle button (sits below logo icon) */}
        {collapsed && (
          <button
            onClick={toggleSidebar}
            aria-label="Expand sidebar"
            className="mx-auto mb-3 flex items-center justify-center w-8 h-8 rounded-lg text-white/40 hover:text-[#B7FF00] hover:bg-white/10 transition-all duration-200"
          >
            <ChevronRight size={15} className="transition-transform duration-300" />
          </button>
        )}

        {/* Divider */}
        <div className="mx-3 mb-4 h-px bg-white/10" />

        {/* ── CENTER: Main Nav ── */}
        <nav className="flex flex-col gap-1 flex-1 px-2">
          {PRIMARY_NAV.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                aria-label={item.label}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `group relative flex items-center gap-2.5 rounded-xl transition-all duration-200 shrink-0
                  ${collapsed ? 'justify-center w-9 h-9 mx-auto' : 'px-2.5 py-2 w-full'}
                  ${
                    isActive
                      ? 'bg-[#B7FF00] text-black shadow-[0_0_14px_rgba(183,255,0,0.5)]'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={15}
                      className={`shrink-0 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8] group-hover:scale-110 transition-transform'}`}
                    />
                    {!collapsed && (
                      <span className="text-sm font-medium whitespace-nowrap overflow-hidden">
                        {item.label}
                      </span>
                    )}
                    {/* Tooltip in collapsed mode */}
                    {collapsed && (
                      <span className="pointer-events-none absolute left-[58px] px-2.5 py-1 rounded-lg bg-[#0a120a] border border-[#1c2e1c] text-white text-xs font-medium whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50 shadow-xl">
                        {item.label}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* ── BOTTOM: Profile & Sign Out ── */}
        <div className={`pt-3 border-t border-white/10 flex flex-col gap-1 px-2 mt-2`}>
          {/* Profile */}
          <NavLink
            to="/profile"
            aria-label="Profile"
            title={collapsed ? 'Account Profile' : undefined}
            className={({ isActive }) =>
              `group relative flex items-center gap-2.5 rounded-xl transition-all duration-200 shrink-0
              ${collapsed ? 'justify-center w-9 h-9 mx-auto' : 'px-2.5 py-2 w-full'}
              ${
                isActive
                  ? 'bg-[#B7FF00] text-black shadow-[0_0_14px_rgba(183,255,0,0.5)]'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`
            }
          >
            <User size={15} className="shrink-0 stroke-[1.8] group-hover:scale-110 transition-transform" />
            {!collapsed && <span className="text-sm font-medium whitespace-nowrap">Profile</span>}
            {collapsed && (
              <span className="pointer-events-none absolute left-[58px] px-2.5 py-1 rounded-lg bg-[#0a120a] border border-[#1c2e1c] text-white text-xs font-medium whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50 shadow-xl">
                Account Profile
              </span>
            )}
          </NavLink>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            aria-label="Sign Out"
            title={collapsed ? 'Sign Out' : undefined}
            className={`group relative flex items-center gap-2.5 rounded-xl transition-all duration-200 shrink-0 text-white/50 hover:text-[#FF5555] hover:bg-red-500/10
              ${collapsed ? 'justify-center w-9 h-9 mx-auto' : 'px-2.5 py-2 w-full'}`}
          >
            <LogOut size={15} className="shrink-0 stroke-[1.8] group-hover:scale-110 transition-transform" />
            {!collapsed && <span className="text-sm font-medium whitespace-nowrap">Sign Out</span>}
            {collapsed && (
              <span className="pointer-events-none absolute left-[58px] px-2.5 py-1 rounded-lg bg-[#0a120a] border border-[#1c2e1c] text-[#FF5555] text-xs font-medium whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50 shadow-xl">
                Sign Out
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* ── MOBILE SLIDE-OUT DRAWER ──────────────────────────────── */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />
          <aside className="relative w-[280px] max-w-[80vw] h-full bg-[#080c08] border-r border-white/10 flex flex-col justify-between p-5 z-10 shadow-2xl">
            {/* Top Brand & Close */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <NavLink to="/" onClick={close} className="flex items-center gap-3">
                  <img src={logoImg} alt="Monster Energy" className="w-8 h-8 object-contain" />
                  <div>
                    <div className="font-display text-base tracking-wider text-white">MONSTER</div>
                    <div className="text-[10px] text-[#B7FF00] tracking-widest font-semibold uppercase">ENERGY</div>
                  </div>
                </NavLink>
                <button
                  onClick={close}
                  aria-label="Close navigation"
                  className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex flex-col gap-1.5 mt-5">
                {PRIMARY_NAV.map((item) => {
                  const Icon = item.icon
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.exact}
                      onClick={close}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                          isActive
                            ? 'bg-[#B7FF00] text-black font-bold shadow-[0_0_15px_rgba(183,255,0,0.5)]'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`
                      }
                    >
                      <Icon size={19} />
                      <span>{item.label}</span>
                    </NavLink>
                  )
                })}
              </nav>
            </div>

            {/* Bottom: Profile & Logout */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <NavLink
                to="/profile"
                onClick={close}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition"
              >
                <User size={19} />
                <span>My Profile</span>
              </NavLink>
              <button
                onClick={() => { handleSignOut(); close() }}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition text-left"
              >
                <LogOut size={19} />
                <span>Sign Out Demo</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
