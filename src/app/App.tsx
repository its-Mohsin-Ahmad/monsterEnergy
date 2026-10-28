import { Routes, Route } from 'react-router-dom'
import { LoadingScreen } from '../components/ui/LoadingScreen'
import { StoreLayout } from '../components/layout/StoreLayout'
import { AdminLayout } from '../components/layout/AdminLayout'

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
import DashboardPage from '../pages/DashboardPage'

import AdminDashboard from '../pages/admin/DashboardPage'
import AdminProducts from '../pages/admin/ProductsPage'
import AdminProductEditor from '../pages/admin/ProductEditorPage'
import AdminCustomers from '../pages/admin/CustomersPage'
import AdminCustomerDetails from '../pages/admin/CustomerDetailsPage'
import AdminAnalytics from '../pages/admin/AnalyticsPage'
import AdminInventory from '../pages/admin/InventoryPage'
import AdminMessages from '../pages/admin/MessagesPage'

export default function App() {
  return (
    <>
      <LoadingScreen />
      <Routes>
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
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminProductEditor />} />
          <Route path="products/:id/edit" element={<AdminProductEditor />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="customers/:id" element={<AdminCustomerDetails />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>
      </Routes>
    </>
  )
}
