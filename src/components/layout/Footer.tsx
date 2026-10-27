import { Link } from 'react-router-dom'
import logoImg from '../../images/logo/Monster_Energy_ragged_M_text_logo-removebg-preview.png'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border mt-16">
      <div className="px-4 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5 mb-3">
            <img
              src={logoImg}
              alt="Monster Energy"
              className="w-8 h-8 object-contain filter drop-shadow-[0_0_8px_rgba(183,255,0,0.6)]"
            />
            <div className="flex flex-col">
              <span className="font-display text-lg tracking-wider text-white leading-none">MONSTER</span>
              <span className="text-[9px] text-neon tracking-widest font-semibold uppercase">ENERGY</span>
            </div>
          </div>
          <p className="text-sm text-muted">Unleash the beast. Frontend demonstration.</p>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Shop</div>
          <div className="space-y-2 text-sm text-text-2">
            <Link to="/shop" className="block hover:text-neon">All Drinks</Link>
            <Link to="/categories" className="block hover:text-neon">Categories</Link>
            <Link to="/wishlist" className="block hover:text-neon">Wishlist</Link>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Company</div>
          <div className="space-y-2 text-sm text-text-2">
            <Link to="/about" className="block hover:text-neon">About</Link>
            <Link to="/energy" className="block hover:text-neon">Energy</Link>
            <Link to="/contact" className="block hover:text-neon">Contact</Link>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Account</div>
          <div className="space-y-2 text-sm text-text-2">
            <Link to="/profile" className="block hover:text-neon">Profile</Link>
            <Link to="/orders" className="block hover:text-neon">Orders</Link>
            <Link to="/settings" className="block hover:text-neon">Settings</Link>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-8 py-4 border-t border-border text-xs text-muted flex flex-col sm:flex-row gap-2 justify-between items-center text-center sm:text-left">
        <span>© {year} Monster Energy Website Demo. Frontend only.</span>
        <span>Not affiliated with Monster Beverage Corporation.</span>
      </div>
    </footer>
  )
}
