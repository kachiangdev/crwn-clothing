import { createAction } from "../../utils/reducer/reducer.utils";

import { CART_ACTION_TYPE } from "./cart.type";

export const setIsCartOpen = (val) => 
    createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, val);

export const addItemToCart = (productToAdd) => 
    createAction(CART_ACTION_TYPE.ADD_ITEM_TO_CART, {"productToAdd":productToAdd});

export const removeItemFromCart = (productToRemove, removeAllQuantity=false) => 
    createAction(CART_ACTION_TYPE.REMOVE_ITEM_FROM_CART, {"productToRemove":productToRemove,"removeAllQuantity":removeAllQuantity});
