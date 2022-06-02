// import { useContext } from "react";

// import { CartContext } from "../../contexts/cart.context";

import { useDispatch } from "react-redux";
import { addItemToCart, deleteItemFromCart, removeItemFromCart } from "../../store/cart/cart.action";
import { CartItem } from "../../store/cart/cart.type";

import "./checkout-item.style.scss";

type CheckoutItemProp = {
    item: CartItem;
}

const CheckoutItem = ({item}: CheckoutItemProp) =>{
    // const {addItemToCart, removeItemFromCart} = useContext(CartContext);
    const dispatch = useDispatch();

    const removeItemHandler = () => dispatch(removeItemFromCart(item));
    const addItemHandler = () => dispatch(addItemToCart(item));
    const clearItemHandler = () => dispatch(deleteItemFromCart(item));

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={item.imageUrl} alt={item.name}/>
            </div>
            <span className="name">{item.name}</span>
            <span className="quantity">
                <div onClick={removeItemHandler} className="arrow">
                    &#10094;
                </div>
                <span className="value">{item.quantity}</span>
                <div  onClick={addItemHandler} className="arrow">
                    &#10095;
                </div>
            </span>
            <span className="price">${item.price}</span>
            <span className="remove-button" onClick={clearItemHandler}>&#10005;</span>
        </div>
    );
}

export default CheckoutItem;