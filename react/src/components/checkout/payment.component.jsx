import React, { useState } from "react";
import PaystackCheckout from "./paystack/paystack-checkout.component";
import card from "../../static/noun-card-6153121.svg"
import bank from "../../static/noun-bank-5486056.svg"
import ussd from "../../static/USSDAPI_Black_RVB_V1.png"
const Payment = ({orderDetails}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="payment-selector">
      <h2 className="text">Choose your payment option</h2>
      <form>
        <div className="pay-with-card">
        <label>
          <input
            type="radio"
            value="payWithCard"
            checked={selectedOption === 'payWithCard'}
            onChange={handleOptionChange}
          />
          Pay with PayStack
        </label>
        {selectedOption === 'payWithCard' && (
          <div className="payment-details">
            <div className="card-img"><img src={card} alt=""/> CARD</div>
            <div className="card-img"><img src={bank} alt=""/>BANK</div>
            <div className="card-imgs"><img src={ussd} alt=""/>USSD</div>
            <div className="paystack-button">
            <PaystackCheckout orderDetails={orderDetails} />
            </div>
            </div>
        )}
        </div>
        <div className="pay-on-delivery">
        <label>
          <input
            type="radio"
            value="payOnDelivery"
            checked={selectedOption === 'payOnDelivery'}
            onChange={handleOptionChange}
          />
          Pay on Delivery (Cash)
        </label>
        {selectedOption === 'payOnDelivery' && (
          /**put content for pay with cash  */
          <div className="payment-details">   
          content
          </div>
       ) }
       </div>
      </form>
    </div>
  )
};

export default Payment;
