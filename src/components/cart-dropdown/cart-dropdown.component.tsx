// import { useContext } from "react";

// import { CartContext } from "../../contexts/cart.context";

import { useNavigate } from "react-router-dom";

import Button from "../custom-button/custom-button.component";

import CartItem from "../cart-item/cart-item.component";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";

import "./cart-dropdown.style.scss";

function CartDropdown() {

    // const {cartItems, setIsCartOpen} = useContext(CartContext);
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const navigate = useNavigate();

    const goToCheckout = () => {
        navigate("/checkout");
        dispatch(setIsCartOpen(false));
    }
    return (
        <div className="cart-dropdown-container">
            {cartItems.length === 0 && <div className="empty-message"> Your Cart is Empty </div>
            }
            <div className="cart-items">
                {cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)}
            </div>
            <Button onClick={goToCheckout}>CHECKOUT</Button>
        </div>
    );
}

export default CartDropdown;