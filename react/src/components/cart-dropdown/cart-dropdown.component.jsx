import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import CartItem from '../cart-items/cart-items.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext)
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems.map(cartItem => (
                        <CartItem key={cartItem.id} CartItem={cartItem} />
                    ))
                }

            </div>
            <span style={{ textAlign: 'center' }}>
                Go to checkout
            </span>
        </div>
    )
}

export default CartDropdown;