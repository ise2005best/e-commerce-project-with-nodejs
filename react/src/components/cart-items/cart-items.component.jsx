

const CartItem = ({CartItem}) =>{
    const {title, quantity, price, imageUrl} = CartItem;
    return(
        <div>
            <img src={imageUrl} alt={`${title}`} style={{height: 80, width: 80}}/>
            <br/>
            <span>
                {title}
            </span>
            <p>
                {quantity} x {price}
            </p>
        </div>
    )
}
export default CartItem;