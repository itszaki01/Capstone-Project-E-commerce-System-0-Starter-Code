import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cart: [],
    items: null,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        //*Add to cart - ruducer
        addToCar: (state, { payload }) => {
            const productIndex = state.cart.findIndex((item) => item.id == payload.id);
            if (productIndex >= 0) {
                if (state.cart[productIndex].remainingQty > 1) {
                    state.cart[productIndex].quantity += 1;
                    toast.info(`${payload.name} product quantity incrased by one`);
                } else {
                    toast.error("No Engouth Stock");
                }
            } else {
                state.cart.push(payload);
                toast.success(`${payload.name} Product Added To Cart`);
            }
        },
        //*Calculate Total Amount - Reducer ?! Called By useEffect
        calculateTotalAmount: (state) => {
            const total = state.cart.reduce((total, crr) => {
                return +total + +crr.price * +crr.quantity;
            }, 0);
            state.cartTotalAmount = total;
        },
        //*Delet Product From Cart - Reducer
        deleteCartItem: (state, { payload }) => {
            state.cart = state.cart.filter((item) => item.id != payload.id);
        },
        //*Clear All reducer
        clearAll: (state) => {
            state.cart = [];
            state.cartTotalAmount = 0;
            state.items = null;
        },
        //*Increase By One Reducer
        icreaseByOne: (state, { payload }) => {
            const productIndex = state.cart.findIndex((item) => item.id == payload.id);
            if (state.cart[productIndex].remainingQty == state.cart[productIndex].quantity) {
                toast.error("No Engouth Stock");
            } else {
                state.cart[productIndex].quantity += 1;
            }
        },
        //*Decreae By One Reducer
        decreaseByOne: (state, { payload }) => {
            const productIndex = state.cart.findIndex((item) => item.id == payload.id);
            if (state.cart[productIndex].quantity > 1) {
                state.cart[productIndex].quantity -= 1;
            }
        },
        //*Set Cart Items
        setCartItems: (state, { payload }) => {
            state.items = payload;
        },
    },
});

export const cartSliceSelector = (state) => state.cart;
export const { addToCar, calculateTotalAmount, deleteCartItem, clearAll, icreaseByOne, decreaseByOne, setCartItems } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
