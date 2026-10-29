import { Routes, Route } from 'react-router-dom'
import { LoadingScreen } from '../components/ui/LoadingScreen'
import { StoreLayout } from '../components/layout/StoreLayout'
// AdminLayout removed - using single unified dashboard

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
      </Routes>
    </>
  )
}
