import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./product-card.style.scss";

import Button from "../custom-button/custom-button.component";


function ProductCard({product}) {
    const {addItemToCart} = useContext(CartContext);
    const {name, price, imageUrl} = product;
    const addProductToCart = () => {
        addItemToCart(product);
    }
    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`}/>
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType='inverted' onClick={addProductToCart}>Add to Cart</Button>
        </div>
    );
}
export default ProductCard;