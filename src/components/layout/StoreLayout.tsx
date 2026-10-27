import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { StoreSidebar } from './StoreSidebar'
import { StoreTopbar } from './StoreTopbar'
import { MobileNavDock } from './MobileNavDock'
import { CartDrawer } from '../cart/CartDrawer'
import { Toast } from '../ui/Toast'
import { Footer } from './Footer'
import { useUIStore } from '../../store/uiStore'

export function StoreLayout() {
  const collapsed = useUIStore((s) => s.sidebarCollapsed)
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  )

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Sidebar offset is 80px (collapsed) or 232px (expanded) on desktop, exactly 0px on mobile
  const sidebarWidth = isDesktop ? (collapsed ? 80 : 232) : 0

  return (
    <div className="min-h-screen bg-[#050705] text-[#F5F7F4] relative selection:bg-[#B7FF00] selection:text-black overflow-x-hidden">
      {/* Collapsible Left Sidebar (Desktop Only) */}
      <StoreSidebar />

      {/* Main Content — shifts with desktop sidebar, 0px offset on mobile */}
      <div
        className="store-main-container flex flex-col min-h-screen pb-20 md:pb-0 w-full max-w-full min-w-0 overflow-x-hidden"
        style={{
          paddingLeft: isDesktop ? `${sidebarWidth}px` : 0,
          transition: 'padding-left 300ms ease-in-out',
        }}
      >
        {/* Floating Minimal Top-Right Utilities */}
        <StoreTopbar />

        {/* Page Content */}
        <main className="flex-1 -mt-16 w-full max-w-full min-w-0 overflow-x-hidden">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Floating Mobile Bottom Navigation Dock */}
      <MobileNavDock />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <Toast />
    </div>
  )
}

