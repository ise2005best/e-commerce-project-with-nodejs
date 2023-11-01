import {PaystackButton} from 'react-paystack';
const PaystackCheckout = ({orderDetails}) =>{
    const publicKey = "pk_test_dd7f38ded6fef200ae04a55361f9ea1df57221ab";
    const email = orderDetails?.email;
    const usersFirstName = orderDetails?.firstName;
    const usersPhoneNumber = orderDetails?.phoneNumber;
    const storedAmount = localStorage.getItem('amount');

   const amount = parseFloat(storedAmount) * 100;
    // const amount = orderTotal * 100;
    //  console.log(orderTotal);
    // const amount = orderTotal * 100;
    const PaystackProps = {
        email,
        amount,
        metadata:{
            usersFirstName,
            usersPhoneNumber,
        },
        publicKey,
        text: "Pay Now",
        onSuccess: () => window.alert("Worked"),
        onClose: () => window.alert("User left"),
    }
    return(
        <div>
            <PaystackButton {...PaystackProps} />
        </div>
    )
}
export default PaystackCheckout;