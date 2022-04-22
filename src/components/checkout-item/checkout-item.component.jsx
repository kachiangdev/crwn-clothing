import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.style.scss";

const CheckoutItem = ({item}) =>{
    const {addItemToCart, removeItemFromCart} = useContext(CartContext);

    const removeItemHandler = () => removeItemFromCart(item);
    const addItemHandler = () => addItemToCart(item);
    const clearItemHandler = () => removeItemFromCart(item, true)

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