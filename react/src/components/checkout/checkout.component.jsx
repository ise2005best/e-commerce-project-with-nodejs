import React, { useContext, useState } from "react";
import { CartContext } from "../../context/cart.context";
import { ReactComponent as PLUSICON } from "../../static/noun-plus-1088459.svg";
import { ReactComponent as MINUSICON } from "../../static/noun-minus-1088464.svg";
import './checkout.styles.scss';

const ProductSection = () => {
    const { cartItems } = useContext(CartContext);

    const calculateTotal = (item) => {
        return item.price * item.quantity;
    };

    return (
        <div className="product-section">
        <h2 className="main-text">Your Shopping Cart</h2>
        <div className="product-list">
            {cartItems.map((cartItem) => (
                <div className="product-item" key={cartItem.id}>
                    <div className="product-details">
                        <img src={cartItem.imageUrl} alt={cartItem.title} />
                        <div>
                            <h3>{cartItem.title}</h3>
                            <p>Price: ₦{cartItem.price}</p>
                            <p>
                                Quantity: <PLUSICON className="plus-icon" />
                                {cartItem.quantity}
                                <MINUSICON className="minus-icon" />
                            </p>
                        </div>
                    </div>
                    <div>
                        <p>₦{calculateTotal(cartItem)}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
    
    );
};


const SummarySection = ({ cartTotal }) => {
    const [discountCode, setDiscountCode] = useState("");


    return (
        <div className="summary-section">
            <h2 className="main-text">Order Summary</h2>
            <div className="summary-details">
                <p>Subtotal: ₦{cartTotal}</p>
                <p>Shipping: ₦{3000}</p>
                <p>VAT (7.5%): ₦{0.075*cartTotal}</p>
                <p>Estimated Total: ₦{}</p>
            </div>
            <div className="discount-section">
                <input
                    type="text"
                    placeholder="Discount/Voucher Code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button className="discount-button">Apply</button>
            </div>
            <button className="checkout-button">Checkout</button>
         
        </div>
    );
};

const CheckOutComponent = () => {
    const { cartItems } = useContext(CartContext);

    const calculateTotal = (item) => {
        return item.price * item.quantity;
    };

    const cartTotal = cartItems.reduce((acc, item) => acc + calculateTotal(item), 0);

    return (
        <div className="checkout-container">
            <ProductSection cartTotal={cartTotal} />
            <div className="divider"></div>
            <hr/>
            <SummarySection cartTotal={cartTotal} />
        </div>
    );
};

export default CheckOutComponent;
