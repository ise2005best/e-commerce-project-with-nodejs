import React, { useContext, useState } from "react";
import { CartContext } from "../../context/cart.context";
import { ReactComponent as PLUSICON } from "../../static/noun-plus-1088459.svg";
import { ReactComponent as MINUSICON } from "../../static/noun-minus-1088464.svg";
import {ReactComponent as CANCELICON} from "../../static/noun-cancel-1259617.svg";
import './checkout.styles.scss';

const ProductSection = () => {
    const { cartItems, removeEntireItemFromCart} = useContext(CartContext);

    const calculateTotal = (item) => {
        // remove the N from the price
        const itemsPrice = item.price.slice(1);
        return itemsPrice * item.quantity;
    };
    const handleRemoveItem = (cartItem) =>{
        removeEntireItemFromCart(cartItem)
    }
    return (
        <div className="product-section">
        <h2 className="main-texts">Your Shopping Cart</h2>
        <div className="product-list">
            {cartItems.map((cartItem) => (
                <div className="product-item" key={cartItem.id}>
                    <div className="product-details">
                        <img src={cartItem.imageUrl} alt={cartItem.title} />
                        <div>
                            <h3>{cartItem.title}</h3>
                            <p>Price: {cartItem.price}</p>
                            <p>
                                

                                Quantity: <PLUSICON className="plus-icon" />
                                {cartItem.quantity}
                                <MINUSICON className="minus-icon" />
                            </p>
                        </div>
                    </div>
                    <div>
                        <p>₦{calculateTotal(cartItem)}</p>
                        <span className="cancel-icon" onClick={ () => handleRemoveItem(cartItem)}>
                        <CANCELICON/>
                        </span>
                        
                    </div>
                </div>
            ))}
        </div>
    </div>
    
    );
};


const SummarySection = ({ cartTotal }) => {
    const [discountCode, setDiscountCode] = useState("");
    const Vat = 0.075 * cartTotal;
    const shipping = 3000;
    const estimatedTotal = cartTotal + Vat + shipping


    return (
        <div className="summary-section">
            <h2 className="main-text">Order Summary</h2>
            <div className="summary-details">
                <p>Subtotal: ₦{cartTotal}</p>
                <p>Shipping: ₦{shipping}</p>
                <p>VAT (7.5%): ₦{Vat}</p>
                
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
            <div className="estimated-total">
                <p >Estimated Total: ₦{estimatedTotal}</p>
                </div>
            
            <button className="checkout-button">Checkout</button>
         
        </div>
    );
};

const CheckOutComponent = () => {
    const { cartItems } = useContext(CartContext);

    const calculateTotal = (item) => {
        // remove the N from the price
        const itemsPrice = item.price.slice(1);
        return itemsPrice * item.quantity;
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
