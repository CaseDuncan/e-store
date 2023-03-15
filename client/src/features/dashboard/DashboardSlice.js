import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    content: [],
    loading: false,
    success: false,
    error: false,
    message: '',
}

export const getDashboardContent = createAsyncThunk('dashboard/content', async (thunkAPI) => {
    const { user } = JSON.parse(localStorage.getItem('user'))

    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${user.access}`
    //     }
    // }
    return fetch('http://localhost:8000/api/products/dashboard/summary/')
        .then((res) => res.json())

})

const dashboardSlice = createSlice({
    name: 'dashboard',
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
            .addCase(getDashboardContent.pending, (state) => {
                state.loading = true;
            })

            .addCase(getDashboardContent.fulfilled, (state, action) => {
                state.loading = false
                state.content = action.payload
                state.success = true
            })

            .addCase(getDashboardContent.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.message = action.payload
            })
    }
})

export const { reset } = dashboardSlice.actions;

export default dashboardSlice.reducer;