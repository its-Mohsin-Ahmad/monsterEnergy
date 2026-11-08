import { Routes, Route, Navigate } from 'react-router-dom'
import { LoadingScreen } from '../components/ui/LoadingScreen'
import { StoreLayout } from '../components/layout/StoreLayout'
import { AdminLayout } from '../components/layout/AdminLayout'

// Storefront pages
import HomePage from '../pages/HomePage'
import ShopPage from '../pages/ShopPage'
import ProductDetailsPage from '../pages/ProductDetailsPage'
import CategoriesPage from '../pages/CategoriesPage'
import EnergyPage from '../pages/EnergyPage'
import AboutPage from '../pages/AboutPage'
import ContactPage from '../pages/ContactPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'
import OrderConfirmationPage from '../pages/OrderConfirmationPage'
import ChatPage from '../pages/ChatPage'
import ProfilePage from '../pages/ProfilePage'
import WishlistPage from '../pages/WishlistPage'

// Admin Dashboard pages
import AdminDashboard from '../pages/admin/DashboardPage'
import AdminProducts from '../pages/admin/ProductsPage'
import AdminInventory from '../pages/admin/InventoryPage'
import AdminStockMovements from '../pages/admin/StockMovementsPage'
import AdminSuppliers from '../pages/admin/SuppliersPage'
import AdminOrders from '../pages/admin/OrdersPage'
import AdminCustomers from '../pages/admin/CustomersPage'
import AdminCoupons from '../pages/admin/CouponsPage'
import AdminReports from '../pages/admin/ReportsPage'
import AdminWebsiteContent from '../pages/admin/WebsiteContentPage'
import AdminNotifications from '../pages/admin/NotificationsPage'
import AdminUsers from '../pages/admin/AdminUsersPage'
import AdminActivityLogs from '../pages/admin/ActivityLogsPage'
import AdminSettings from '../pages/admin/SettingsPage'
import AdminHelpSupport from '../pages/admin/HelpSupportPage'

export default function App() {
  return (
    <>
      <LoadingScreen />
      <Routes>
        {/* Public Storefront Routes */}
        <Route element={<StoreLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:slug" element={<ProductDetailsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/energy" element={<EnergyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Route>

        {/* Dedicated Admin Dashboard Routes (Protected by AdminLayout Auth) */}
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="stock-movements" element={<AdminStockMovements />} />
          <Route path="suppliers" element={<AdminSuppliers />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="content" element={<AdminWebsiteContent />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="logs" element={<AdminActivityLogs />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="help" element={<AdminHelpSupport />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* /admin alias redirecting to /dashboard */}
        <Route path="/admin/*" element={<Navigate to="/dashboard" replace />} />

        {/* Fallback to homepage */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
