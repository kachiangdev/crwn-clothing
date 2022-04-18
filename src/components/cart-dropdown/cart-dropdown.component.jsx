import Button from "../custom-button/custom-button.component";

import "./cart-dropdown.style.scss";

function CartDropdown() {
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items" />
            <Button>CHECKOUT</Button>
        </div>
    );
}

export default CartDropdown;