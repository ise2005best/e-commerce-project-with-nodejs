import { useState } from "react";
// import PaystackCheckout from "./paystack/paystack-checkout.component";
const SummarySection = ({ cartTotal }) => {
    const [discountCode, setDiscountCode] = useState("");
    const Vat = 0.075 * cartTotal;
    const shipping = 3000;
    const estimatedTotal = cartTotal + Vat + shipping;
    localStorage.setItem("amount", estimatedTotal.toString());


    return (
        <div className="summary-container">
            {/* <PaystackCheckout orderTotal={estimatedTotal} /> */}
        <div className="summary-section">
            <h2 className="main-text">Order Summary</h2>
            <div>
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
            
        </div>
       
        </div>
    );
};

export default SummarySection;