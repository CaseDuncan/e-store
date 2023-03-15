import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    salesData: [],
    loading: false,
    success: false,
    error: false,
    message: '',
}

export const getSalesAnalysis = createAsyncThunk('dashboard/sales/analysis', async (thunkAPI) => {
    return fetch('http://localhost:8000/api/products/dashboard/sales/analysis')
        .then((res) => res.json())

})

const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSalesAnalysis.pending, (state) => {
                state.loading = true;
            })

            .addCase(getSalesAnalysis.fulfilled, (state, action) => {
                state.loading = false
                state.salesData = action.payload
                state.success = true
            })

            .addCase(getSalesAnalysis.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.message = action.payload
            })
    }
})

export const { reset } = salesSlice.actions;

export default salesSlice.reducer;