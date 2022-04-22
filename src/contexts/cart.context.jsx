import { createContext, useState } from "react";

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

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    const removeItemFromCart = (productToRemove, removeAllQuantity=false) => {
        setCartItems(removeCartItem(cartItems, productToRemove, removeAllQuantity));
    }
    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart};
    return (
        <CartContext.Provider value={value}> {children} </CartContext.Provider>
    );
}