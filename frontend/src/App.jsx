import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import TopNav from './components/TopNav';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import RestaurantPage from './pages/RestaurantPage';
import CheckoutPage from './pages/CheckoutPage';
import TrackingPage from './pages/TrackingPage';
import DineOutPage from './pages/DineOutPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import PassportPage from './pages/PassportPage';

// Pages that should not show the bottom nav
const NO_NAV_PAGES = ['/checkout', '/track', '/restaurant'];

function AppContent() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<><TopNav /><HomePage /></>} />
          <Route path="/explore" element={<><TopNav /><ExplorePage /></>} />
          <Route path="/orders" element={<><TopNav /><OrdersPage /></>} />
          <Route path="/dine-out" element={<><TopNav /><DineOutPage /></>} />
          <Route path="/profile" element={<><TopNav /><ProfilePage /></>} />
          <Route path="/restaurant/:id" element={<><TopNav /><RestaurantPage /></>} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/track/:orderId" element={<TrackingPage />} />
          <Route path="/passport" element={<PassportPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
