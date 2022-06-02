// import { useContext } from "react";

// import { CartContext } from "../../contexts/cart.context";

import { useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import PaymentForm from "../../components/payment-form/payment-form.component";

import "./checkout.style.scss";

function Checkout() {
    // const {cartItems} = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);

    const getTotal = () => {
        return cartItems.reduce(
            (runningTotal, next) => 
                runningTotal + (next.price * next.quantity)
            , 0);
    }

    return (
        <div className="checkout-container">
            <div className='checkout-header'>
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>                
            </div>
            {cartItems.map((item) => 
                <CheckoutItem key={item.id} item={item} />
            )}
            <span className="total">Total: ${getTotal()}</span>

            <PaymentForm />
        </div>
    )
}

export default Checkout;