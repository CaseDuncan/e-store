import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ItemAPIService from './ItemAPIService'


const initialState = {
    items: [],
    newItem:[],
    error: false,
    loading: false,
    success: false,
    message: ''

}
// fetch products
export const getProducts = createAsyncThunk('products/fetchAll', async (_, thunkAPI) => {
    try {
        return await ItemAPIService.fetchProducts()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message)
    }
})

// create product
export const createProduct = createAsyncThunk('products/create', async (data, thunkAPI) => {
    try {
        return await ItemAPIService.createProducts(data)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message)
    }
})

// delete  products
export const deleteProduct = createAsyncThunk('products/delete', async (id, thunkAPI) => {
    try {
        return await ItemAPIService.deleteProducts(id)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message)
    }
})
export const ItemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.items = action.payload
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.message = action.payload
            })
          
            //create
            .addCase(createProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.newItem = action.payload
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.message = action.payload
            })
        
            //delete
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.items = action.payload
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.message = action.payload
            })

    }
})

export const { reset } = ItemSlice.actions
export default ItemSlice.reducer