import { configureStore } from '@reduxjs/toolkit';
import ItemReducer from '../features/items/itemSlice'
import ItemDetailsReducer from '../features/itemDetails/ItemDetailSlice'
import cartReducer from '../features/cart/cartSlice';
import productSlice from '../features/cart/productSlice';
import authReducer from '../features/auth/AuthSlice'
import CheckoutSlice from '../features/checkoutinfo/CheckoutSlice';
import orderSlice from '../features/order/PlaceOrderSlice';
import dashboardSlice from '../features/dashboard/DashboardSlice';
import SalesSlice from '../features/sales/SalesSlice';




const store = configureStore({
  reducer: {
    items: ItemReducer,
    itemDetails: ItemDetailsReducer,
    productCart: productSlice,
    auth: authReducer,
    checkout: CheckoutSlice,
    orders: orderSlice,
    dashboardContent: dashboardSlice,
    salesAnalysis:SalesSlice,
  },
});

export default store