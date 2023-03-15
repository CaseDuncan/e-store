import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: [],
    loading: false,
    success: false,
    message: ''
}

export const getProduct = createAsyncThunk('products/fetchProductDetails', async (id, thunkAPI) => {
    return fetch(`http://127.0.0.1:8000/api/products/listings/best_selling`)
        .then((res) => res.json())

})

export const bestProductSlice = createSlice({
    name: "productDetails",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.product = action.payload
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.message = action.payload
            })
    }
})

export const { reset } = productDetailSlice.actions

export default productDetailSlice.reducer