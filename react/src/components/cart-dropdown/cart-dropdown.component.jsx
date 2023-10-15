import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart.context';
import CartItem from '../cart-items/cart-items.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    const navigate = useNavigate();
    const handleCheckout = () =>{
        navigate('/product/checkout')
    }
    const { cartItems } = useContext(CartContext);

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems.map(cartItem => (
                        <CartItem key={cartItem.id} CartItem={cartItem} />
                    ))
                }

            </div>
            <button style={{ textAlign: 'center' }} onClick={handleCheckout}>
                Go to checkout
            </button>
        </div>
    )
}

export default CartDropdown;