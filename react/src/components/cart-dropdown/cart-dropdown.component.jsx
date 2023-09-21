import './cart-dropdown.styles.scss';

const CartDropdown = () =>{
    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'/>
            <span style={{textAlign: 'center'}}>
                Go to checkout
            </span>
        </div>
    )
}

export default CartDropdown;