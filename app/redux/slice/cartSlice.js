import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: {},    
  }
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        buyVoucher: (state, action) => {
            state.cartItems = {};
            state.cartItems = action.payload;
        },      
        setVoucher: (state) => {
            return initialState; // Reset the state to its initial values
        },
    },
});

export const { buyVoucher, setVoucher } = cartSlice.actions;
export default cartSlice.reducer;