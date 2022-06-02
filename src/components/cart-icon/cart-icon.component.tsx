// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectCartItems, selectIsCartOpen } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.style.scss";



function CartIcon() {

    // const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext);
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartItems = useSelector(selectCartItems);

    const toggleIsCartOpen = () => {dispatch(setIsCartOpen(!isCartOpen))} 
    
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