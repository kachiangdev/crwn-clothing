import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import { useNavigate } from "react-router-dom";

import Button from "../custom-button/custom-button.component";

import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.style.scss";

function CartDropdown() {
    const {cartItems, setIsCartOpen} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckout = () => {
        navigate("/checkout");
        setIsCartOpen(false);
    }
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)}
            </div>
            <Button onClick={goToCheckout}>CHECKOUT</Button>
        </div>
    );
}

export default CartDropdown;