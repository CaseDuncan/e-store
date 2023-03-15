import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    reviews: [],
    review:[],
    loading: false,
    success: false,
    message: ''
}

export const addProduct = createAsyncThunk('product/review', async (id, ThunkAPI) => {
    
})

export const reviewSlice = createSlice({
    name: 'Review Product',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
        .addCase()
    }
})