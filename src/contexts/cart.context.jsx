import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

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
    console.log(cartItems)
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


export const CartContext = createContext({
    isCartOpen:false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () =>{}
});

export const CART_ACTION_TYPE = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
    REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
}

const cartReducer = (state, action) => {
    console.log(action);
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
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }


}

const INITIAL_STATE = {
    isCartOpen:false,
    cartItems: []
}


export const CartProvider = ({ children }) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    const [{isCartOpen, cartItems}, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const setIsCartOpen = (val) => {
        dispatch(createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, val));
    }
    const addItemToCart = (productToAdd) => {
        // setCartItems(addCartItem(cartItems, productToAdd));
        dispatch(
            createAction(CART_ACTION_TYPE.ADD_ITEM_TO_CART, {"productToAdd":productToAdd}));
    }
    const removeItemFromCart = (productToRemove, removeAllQuantity=false) => {
        // setCartItems(removeCartItem(cartItems, productToRemove, removeAllQuantity));
        dispatch(createAction(CART_ACTION_TYPE.REMOVE_ITEM_FROM_CART, {"productToRemove":productToRemove,"removeAllQuantity":removeAllQuantity}));
    }
    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart};
    return (
        <CartContext.Provider value={value}> {children} </CartContext.Provider>
    );
}