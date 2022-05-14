import { CART_ACTION_TYPE } from "./cart.type";

const addCartItem = (cartItems, productToAdd) => {
    //check if product has already exist    
    //if found, increment quantity
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    if (existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
        {...cartItem, quantity: cartItem.quantity + 1} :
        cartItem);
    }
    //return new array with modified carItem
    return [...cartItems, {...productToAdd, quantity:1}];
}

const removeCartItem = (cartItems, productToRemove, removeAllQuantity) => {
    const retVal = [...cartItems];
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === productToRemove.id) {
            if (cartItems[i].quantity > 1 && !removeAllQuantity) {
                retVal[i].quantity = cartItems[i].quantity - 1;
            } else {
                retVal.splice(i, 1);
            }
            break;
        }
    }
    return retVal;
}



const INITIAL_STATE = {
    isCartOpen:false,
    cartItems: []
}

export const cartReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;


    switch(type) {
        case CART_ACTION_TYPE.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen:payload
            };
        case CART_ACTION_TYPE.ADD_ITEM_TO_CART:
            return {
                ...state,
                cartItems: addCartItem(state.cartItems, payload.productToAdd)
            };
        case CART_ACTION_TYPE.REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: removeCartItem(state.cartItems, payload.productToRemove, payload.removeAllQuantity)
            };
        default:
            return state;
    }
}