import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderAPIService from './PlaceOrderAPIService'

const initialState = {
    items: [],
    orderItems: [],
    orderDetails: [],
    loading: false,
    success: false,
    error: false,
    message: '',
}

//create order
export const newOrder = createAsyncThunk("order/create", async (orderData, thunkAPI) => {
    try {
        return await orderAPIService.createOrder(orderData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message)
    }
})


//fetch orders
export const fetchOrders = createAsyncThunk("order/fetchAll", async ( thunkAPI) => {
    try {
        return await orderAPIService.getOrders()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message)
    }
})

//order details
export const getOrderDetails = createAsyncThunk("order/details", async (id, thunkAPI) => {
    try {
        return await orderAPIService.fetchOrderDetails(id)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message)
    }
})

export const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        orderReset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(newOrder.pending, (state) => {
                state.loading = true;
            })

            .addCase(newOrder.fulfilled, (state, action) => {
                state.loading = false
                state.orderItems = action.payload
                state.success = true
            })

            .addCase(newOrder.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.message = action.payload
                state.orderItems = null
            })

            //orders action creators
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.success = false
            })

            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
                state.success = true
                state.error = false
            })

            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false
                state.message = action.payload
                state.error = true
            })

            //order details action creators
            .addCase(getOrderDetails.pending, (state) => {
                state.loading = true;
                state.success = false
            })

            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.loading = false
                state.orderDetails = action.payload
                state.success = true
                state.error = false
            })

            .addCase(getOrderDetails.rejected, (state, action) => {
                state.loading = false
                state.message = action.payload
                state.error = true
            })

            
    }
})

export const { orderReset } = orderSlice.actions;

export default orderSlice.reducer;
