import { useContext } from "react";
import { Link } from "react-router-dom";
import {CartContext} from '../../context/cart.context'
const CartItem = ({CartItem}) =>{
    const {title, quantity, price, imageUrl, id} = CartItem;
    const { removeItemFromCart} = useContext(CartContext)

    const handleRemoveItemFromCart =() =>{
        const productToRemove = {}
        productToRemove.id = id
        productToRemove.title = title
        productToRemove.quantity = quantity
        productToRemove.price = price
        productToRemove.imageUrl = imageUrl
        removeItemFromCart(productToRemove)
    }
    return(
        <div className="cart-item-container" key={id}>
            <img src={imageUrl} alt={`${title}`} style={{height: 80, width: 80}}/>
            <br/>
            <span>
                {title}
            </span>
            <p>
                {quantity} x {price}
            </p>
            <button onClick={handleRemoveItemFromCart} type='button'>
                remove
            </button>
        </div>
    )
}
export default CartItem;