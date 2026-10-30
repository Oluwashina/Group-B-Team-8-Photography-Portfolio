import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import AuthProvider from "./context/AuthProvider.jsx";
import CartProvider from "./context/CartProvider.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import OrderDetailPage from "./pages/OrderDetailPage.jsx";
import OrdersListPage from "./pages/OrdersListPage.jsx";
import PrintDetailPage from "./pages/PrintDetailPage.jsx";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/prints/:id" element={<PrintDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
            <Route path="/orders" element={<OrdersListPage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
