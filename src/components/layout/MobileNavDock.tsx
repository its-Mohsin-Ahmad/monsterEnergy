import { NavLink } from 'react-router-dom'
import { Home, ShoppingBag, LayoutGrid, Zap, ShoppingCart } from 'lucide-react'
import { useUIStore } from '../../store/uiStore'
import { useCartStore } from '../../store/cartStore'

export function MobileNavDock() {
  const openCart = useUIStore((s) => s.openCart)
  const cartCount = useCartStore((s) => s.totalQty())

  const NAV_ITEMS = [
    { to: '/', label: 'Home', icon: Home, exact: true },
    { to: '/shop', label: 'Shop', icon: ShoppingBag },
    { to: '/categories', label: 'Explore', icon: LayoutGrid },
    { to: '/energy', label: 'Energy', icon: Zap },
  ]

  return (
    <nav
      className="md:hidden fixed bottom-3 left-3 right-3 z-40 max-w-lg mx-auto bg-[#070b07]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.85)] px-2 py-2 flex items-center justify-around select-none"
      aria-label="Mobile Navigation Dock"
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'text-[#B7FF00]'
                  : 'text-white/60 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={20} className="stroke-[2] transition-transform duration-200" />
                <span className="text-[10px] font-bold tracking-wider mt-0.5 uppercase">
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#B7FF00] shadow-[0_0_8px_#B7FF00]" />
                )}
              </>
            )}
          </NavLink>
        )
      })}

      {/* Cart Button */}
      <button
        onClick={openCart}
        aria-label="Open Cart"
        className="relative flex flex-col items-center justify-center py-1 px-3 rounded-xl text-white/60 hover:text-white transition-all duration-200 active:scale-95"
      >
        <div className="relative">
          <ShoppingCart size={20} className="stroke-[2]" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-[#B7FF00] text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_8px_#B7FF00] animate-pulse">
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-bold tracking-wider mt-0.5 uppercase">
          Bag
        </span>
      </button>
    </nav>
  )
}
