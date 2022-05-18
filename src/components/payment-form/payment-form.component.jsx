import { useState } from "react";
import { useSelector } from "react-redux";
import { CardElement, useElements } from "@stripe/react-stripe-js";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartItems } from "../../store/cart/cart.selector";
import { useStripe } from "@stripe/react-stripe-js";
import Button from "../custom-button/custom-button.component";

import "./payment-form.style.scss";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const currentUser = useSelector(selectCurrentUser);
    const cartItems = useSelector(selectCartItems);
    const amount = cartItems.reduce(
        (runningTotal, next) => 
            runningTotal + (next.price * next.quantity)
        , 0) * 100;

    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const paymentHandler = async (e) => {
        e.preventDefault();

        if(!stripe || !elements) return;


        setIsProcessingPayment(true);
        const response = await fetch("/.netlify/functions/create-payment-intent", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount })
        }).then(res => res.json())
        
        const {paymentIntent: {client_secret}} = response;

        console.log(client_secret);

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest',
                }
            }
        });

        setIsProcessingPayment(false);

        if (paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if(paymentResult.paymentIntent.status === 'succeeded') {
                alert("Payment successful");
            }
        }
    }
    const paymentButtonStyle = {
        'margin-left': 'auto', 
        'margin-top':'30px'
    };

    return (
        <div className="payment-form-container">
            <form className="form-container" onSubmit={paymentHandler}>
                <h2>Credit Card Payment:</h2>
                <CardElement />
                <Button style={paymentButtonStyle} buttonType='inverted' isLoading={isProcessingPayment}>Pay Now</Button>
            </form>
        </div>
    );
}

export default PaymentForm;