import { useContext } from "react";
import {ReactComponent as PLUSICON} from '../../static/noun-plus-1088459.svg'
import {ReactComponent as MINUSICON} from '../../static/noun-minus-1088464.svg'
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
                <PLUSICON className="plus-icon" onClick={handleAddToCart}/>
                {quantity} 
                <MINUSICON className="minus-icon"  onClick={handleRemoveItemFromCart}/> x {price}
            </p>
        </div>
    )
}
export default CartItem;