import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    item:[], 
    loading:false,
    success:false,
    message:''
}

export const getProductDetails = createAsyncThunk('products/fetchProductDetails', async (id,thunkAPI)=>{
    return fetch(`http://localhost:8000/api/products/listings/${id}`)
    .then((res)=>res.json())
    
})
 
export const productDetailSlice = createSlice({
    name:"productDetails",
    initialState,
    reducers:{
        reset:(state)=>initialState
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getProductDetails.pending, (state)=>{
            state.loading = true
        })
        .addCase(getProductDetails.fulfilled, (state, action)=>{
            state.loading = false
            state.success = true
            state.item = action.payload
        })
        .addCase(getProductDetails.rejected, (state, action)=>{
            state.loading = false
            state.success = false
            state.message = action.payload
        })
    }
})

export const{reset} = productDetailSlice.actions

export default productDetailSlice.reducer