import { createSelector } from "reselect";
import { RootState } from "../store";
import { CartState } from "./cart.reducer";

const selectCartReducer = (state: RootState): CartState => state.cart;


// export const selectCartItems = (state) => state.cart.cartItems;

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
)

// export const selectIsCartOpen = (state) => state.cart.isCartOpen;

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
)