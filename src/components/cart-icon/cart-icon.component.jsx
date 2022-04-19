import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.style.scss";



function CartIcon() {

    const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext);

    const toggleIsCartOpen = () => {setIsCartOpen(!isCartOpen)} 
    
    const getTotalItemsInCart = () => {
        if(cartItems === null) return 0;
        
        return cartItems.reduce((previousValue, currentValue)=>
            previousValue + currentValue.quantity, 0);
    }

    return (
        <div className="cart-icon-container" onClick={toggleIsCartOpen}>
            <ShoppingIcon />
            <span className="item-count">{getTotalItemsInCart()}</span>
        </div>
    );
}

export default CartIcon;