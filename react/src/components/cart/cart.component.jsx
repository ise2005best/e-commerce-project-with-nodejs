import {ReactComponent as CartImage} from '../../static/shopping-bag.svg';
import { CartContext } from '../../context/cart.context';
import { useContext } from 'react';

import './cart.styles.scss';

const CartIcon =()=>{
    const {isCartOpen ,setIsCartOpen, cartCount} = useContext(CartContext)
    const toogleCart = ()=>{setIsCartOpen(!isCartOpen)}
    return(
        <div className='cart-icon-container'>
            <CartImage className='shopping-icon' onClick={toogleCart}  />
            <span className='item-count'>
                {cartCount}
            </span>
        </div>
    )
}

export default CartIcon;