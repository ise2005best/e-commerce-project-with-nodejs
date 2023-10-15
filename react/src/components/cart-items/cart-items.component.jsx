import { useContext } from "react";
import {ReactComponent as PLUSICON} from '../../static/noun-plus-3796374.svg'
import {ReactComponent as MINUSICON} from '../../static/noun-minus-338134.svg'
import {CartContext} from '../../context/cart.context'
const CartItem = ({CartItem}) =>{
    const {title, quantity, price, imageUrl, id} = CartItem;
    const { removeItemFromCart, addItemsToCart} = useContext(CartContext)

    const productToRemove = {}
    productToRemove.id = id
    productToRemove.title = title
    productToRemove.quantity = quantity
    productToRemove.price = price
    productToRemove.imageUrl = imageUrl

    const handleAddToCart = () =>{
        addItemsToCart(productToRemove)
    }
    const handleRemoveItemFromCart =() =>{
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
            <PLUSICON  style={{height: 40, width: 30}} onClick={handleAddToCart}/>
            <MINUSICON style={{height: 40, width: 30}} onClick={handleRemoveItemFromCart}/>
        </div>
    )
}
export default CartItem;