import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// const initialState = {
//     cartItems: [],
//     error: false,
//     success: false,
//     loading: false,
//     message: ''
// }

// export const addToCart = createAsyncThunk('item/addToCart', async (id, thunkAPI) => {
//     return fetch(`http://127.0.0.1:8000/api/products/listings/${id}`)
//         .then((res) => res.json())

// })

// export const getItem = createAsyncThunk('cart/addcartItem', async (id, quantity) => {
//     const data = await fetch(`http://127.0.0.1:8000/api/products/listings/${id}`)
//         .then((res) => res.json())
//     // console.log(data);
//     dispatch(addItemToCart({
//         id: data.id,
//         name: data.name,
//         quantity
//     }))
// })
export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        totalQuantity: 0,
    },
    reducers: {
        // addItemToCart(state, action) {
        //     const newItem = action.payload;
        //     const existingItem = state.cartItems.find((item) => item.id === newItem.id)
        //     state.totalQuantity++;
        //     if (!existingItem) {
        //         state.cartItems.push({
        //             id: newItem.id,
        //             name: newItem.name,
        //             price: newItem.price,
        //             quantity: newItem.quantity,
        //             totalPrice: newItem.price,
        //         })
        //     } else {
        //         existingItem.quantity++;
        //         existingItem.totalPrice = existingItem.totalPrice + newItem.price
        //     }
        // },
        addItemToCart(state, action) {
            // const newItem = action.payload;
            // const existingItem = state.cartItems.find((product) => product.id === newItem.id)

            // if (existingItem) {
            //     state.cartItems = cartItems.map((product) => {
            //         product.id === existingItem.id ? newItem : product
            //     })
            // } else {
            //     state.cartItems = newItem
            // }

            const newItem = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === newItem.id)
            if (!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: Number(newItem.price),
                    quantity: 1,
                    totalPrice: newItem.price,
                })
            } else {
                existingItem.quantity++;
                existingItem.price += newItem.price
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            console.log(newItem);
        },
        removeItemFromCart(state, action) {
            const itemId = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === itemId)
            state.totalQuantity--;

            if (existingItem.quantity = 1) {
                state.cartItems = state.cartItems.filter((item) => item.id != itemId)
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price
                state.cartItems.totalAmount = existingItem.totalPrice - existingItem.price
            }
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         // .addCase(addToCart.pending, (state) => {
    //         //     state.loading = true
    //         //     state.error = false
    //         // })

    //         // .addCase(addToCart.fulfilled, (state, action) => {
    //         //     state.loading = false;
    //         //     state.cartItems = action.payload
    //         //     state.success = true
    //         //     state.error = false
    //         //     state.message = "item added to cart successfully"
    //         // })

    //         // .addCase(addToCart.rejected, (state, action) => {
    //         //     state.loading = false
    //         //     state.success = false
    //         //     state.error = action.payload

    //         // })

    //         .addCase(getItem.pending, (state) => {
    //             state.loading = true
    //             state.error = false
    //         })

    //         .addCase(getItem.fulfilled, (state, action) => {
    //             state.loading = false;
    //             state.cartItems = [action.payload]
    //             state.success = true
    //             state.error = false
    //         })

    //         .addCase(getItem.rejected, (state, action) => {
    //             state.loading = false
    //             state.success = false
    //             state.error = action.payload

    //         })
    // }
})

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;