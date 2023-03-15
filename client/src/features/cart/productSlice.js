import { createSlice } from "@reduxjs/toolkit";

const cart = JSON.parse(localStorage.getItem("cartItems"))
const totalQuantity = JSON.parse(localStorage.getItem('cartQuantity'))

export const productSlice = createSlice({
    name: 'productCart',
    initialState: {
        cartItems: cart ? cart : [],
        totalQuantity: totalQuantity ? totalQuantity : 0,
        totalPrice: 0
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === newItem.id)

            if (existingItem) {
                existingItem.totalPrice += newItem.price
                existingItem.quantity++;
            } else {
                state.cartItems.push({
                    id: newItem.id,
                    totalPrice: newItem.price,
                    name: newItem.name,
                    image: newItem.image,
                    quantity: 1,
                    price: newItem.price,
                    instock: newItem.instock
                })
                state.totalQuantity++;
                
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            localStorage.setItem('cartQuantity', JSON.stringify(state.totalQuantity))
        },


        incrementQuantity: (state, action) => {
            const data = action.payload
            const item = state.cartItems.find((item) => item.id === data.id);
            item.quantity++;
            item.totalPrice +=item.price
        },
        decrementQuantity(state, action) {
            const data = action.payload
            const item = state.cartItems.find((item) => item.id === data.id);
            if (item.quantity === 1) {
                item.quantity = 1
            } else {
                item.quantity--;
                item.totalPrice -= item.price
            }
        },
        removeItem: (state, action) => {
            const data = action.payload
            const remove = state.cartItems.filter((item) => item.id !== data.id);
            state.cartItems = remove;
            state.totalQuantity -= 1
        },

    }
})

export const cartActions = productSlice.actions;
export default productSlice.reducer;