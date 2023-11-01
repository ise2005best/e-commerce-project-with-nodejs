import SummarySection from "./summary-section.component";
import { CartContext } from "../../context/cart.context";
import { useContext } from "react";
const OrderSummary = () => {
    const { cartItems} = useContext(CartContext);
    const calculateTotal = (item) => {

        const itemsPrice = item.price.slice(1);
        return itemsPrice * item.quantity;
    };
    const cartTotal = cartItems.reduce((acc, item) => acc + calculateTotal(item), 0);

    return (
        <div className="checkout-container">
            <SummarySection cartTotal={cartTotal} />
        </div>
    );
};

export default OrderSummary;