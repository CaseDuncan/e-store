import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./common/footer/Footer";
import ItemDetails from "./components/itemDetails/ItemDetails";
import ItemsContainer from "./components/items/ItemsContainer";
import Cart from "./components/cart/Cart";
import Payment from "./components/payment/Payment";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Contact from "./pages/contact/Contact";
import Profile from "./components/profile/Profile";
import PlaceOrder from "./components/placeorder/PlaceOrder";
import CheckOutDetails from "./components/checkout/CheckOutDetails";
import Orders from "./components/orders/Orders";
import Dashboard from "./components/dashboard/Dashboard";
import Products from "./components/products/Products";
import QuickLinks from "./components/quicklinks/QuickLinks";
import OrderDetails from "./components/orderdetails/OrderDetails";
import Analytics from "./components/dashboard/analytics/Analytics";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ItemsContainer />} />
        <Route path="/products/admin" element={<Products />} />
        <Route path="/products/:id" element={<ItemDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/checkout" element={<CheckOutDetails />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        {/* <Route path="/analytics" element={<Analytics />} /> */}
      </Routes>
      {/* <QuickLinks/> */}
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
