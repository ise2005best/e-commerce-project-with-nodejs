import React, { useContext, useState } from "react";
import { CartContext } from "../../context/cart.context";
import { ReactComponent as CANCELICON } from "../../static/noun-cancel-1259617.svg";
import './checkout.styles.scss';
import OrderSummary from "./order-summary.component";
import ProgressBar1 from "../progress-bar/progress-bar.component 2";
import DeliveryDetail from "./delivery-detail.component";
import Payment from "./payment.component";
import { useNavigate, useSearchParams } from 'react-router-dom';

const ProductSection = () => {
    const { cartItems, removeEntireItemFromCart } = useContext(CartContext);

    const calculateTotal = (item) => {
        const itemsPrice = item.price.slice(1);
        return itemsPrice * item.quantity;
    };
    const handleRemoveItem = (cartItem) => {
        removeEntireItemFromCart(cartItem)
    }

    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    const handleNextPage = () => {
      if (page < 3) {
        setPage((prevPage) => prevPage + 1);
        const url = new URL(window.location);
        url.searchParams.set("tab", page +1);
        window.history.pushState({}, "", url);
      }
    };
      
    return (
        <div className="product-section">
            <div className="left-side">
                <div className="progress-bar-ctn"> 
                <ProgressBar1 page={page} onNextPage={handleNextPage} />
                </div>
                <div className="product-list">
                {page === 1 && (
                    <div>
                    <h2 className="main-texts">Your Shopping Cart</h2>
                    {cartItems.map((cartItem) => (
                        <div className="product-item" key={cartItem.id}>
                            <div className="product-details">
                                <img src={cartItem.imageUrl} alt={cartItem.title} />
                                <div>
                                    <h3>{cartItem.title}</h3>
                                    <p>Price: {cartItem.price}</p>
                                    <p>


                                        Quantity: {cartItem.quantity}

                                    </p>
                                </div>
                            </div>
                            <div>
                                <p>₦{calculateTotal(cartItem)}</p>
                                <span className="cancel-icon" onClick={() => handleRemoveItem(cartItem)}>
                                    <CANCELICON />
                                </span>

                            </div>

                        </div>
                    ))}
                    </div>
                )}
                {page === 2 && (
          <div className="delivery-details">
            <h2 className="main-texts">Step 2: Delivery Details</h2>
            <DeliveryDetail/>
          </div>
        )}
        {page === 3 && (
          <div className="payment">
            <h2 className="main-texts">Step 3: Payment</h2>
           <Payment/>
          </div>
        )}
                </div>
            </div>
            <div className="order-summary"> <OrderSummary /></div>
        </div>

    );
};



export default ProductSection;

