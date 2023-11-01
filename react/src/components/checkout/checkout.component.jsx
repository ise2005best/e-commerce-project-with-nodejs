import React, { useContext, useState } from "react";
import { CartContext } from "../../context/cart.context";
import { ReactComponent as CANCELICON } from "../../static/noun-cancel-1259617.svg";
import './checkout.styles.scss';
import OrderSummary from "./order-summary.component";
import ProgressBar1 from "../progress-bar/progress-bar.component";
import DeliveryDetail from "./delivery-details/delivery-detail.component";
import Payment from "./payment.component";

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

    const handleNextPage = () => {
      if (page < 3) {
        setPage((prevPage) => prevPage + 1);
      }
    };
      
    return (
        <div className="product-section">
            <div className="left-side">
                <div className="progress-bar-ctn"> 
                <ProgressBar1 page={page} onNextPage={handleNextPage} /></div>
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
            <DeliveryDetail/>
        )}
        {page === 3 && (
           <Payment/>
        )}
                </div>
            </div>
            <div className="order-summary"> <OrderSummary /></div>
        </div>

    );
};



export default ProductSection;

