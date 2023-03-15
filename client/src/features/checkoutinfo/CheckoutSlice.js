import { createSlice } from '@reduxjs/toolkit'

const checkoutdata = JSON.parse(localStorage.getItem('checkoutDetails'))
const initialState = {
    checkoutInformation: checkoutdata?checkoutdata:  null,
    error: false,
    success: false,
    message: ''
}

const checkOutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        checkoutReset: (state) => {
            state.error = false
            state.checkoutInformation = []
            state.success = false
            state.message = ''
        },

        checkoutInfo(state, action) {
            const checkoutData = action.payload
            state.checkoutInformation = action.payload
            localStorage.setItem("checkoutDetails", JSON.stringify(checkoutData))
        }
    }
})

export const { checkoutReset, checkoutInfo } = checkOutSlice.actions;
export default checkOutSlice.reducer;