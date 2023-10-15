import React, {useContext} from "react";
import { CartContext } from "../../context/cart.context";
import {ReactComponent as NextArrow } from '../../static/noun-next-arrow-3565425.svg'
import './checkout.styles.scss';
const CheckOutComponent = () =>{
    const {cartItems} = useContext(CartContext)
    return(
        <div>
             <h2 className='main-text'>
                Your shopping cart
            </h2>
            <div className='checkout-container'>
            {
                cartItems.map((cartItemsId)=>(
                    <div key={cartItemsId.id} >
                        <h2 className='products-title'>
                            {cartItemsId.title}
                        </h2>
                        <img src={cartItemsId.imageUrl} alt={`${cartItemsId.title}`}  className='products-image'/>
                        <h4 className='products-price'>
                            {cartItemsId.price}
                        </h4>
                        <span className='products-quantity'>
                            {cartItemsId.quantity}
                        </span>
                        </div>
                    
                ))
            }
            </div>
        </div>
    )
}

export default CheckOutComponent;