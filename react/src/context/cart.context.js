import { createContext, useState, useEffect } from "react";


const addCartItem = (cartItems, productsToAdd) =>{
    const existingCartItems = (cartItems.find((cartItem) => cartItem.id === productsToAdd.id))

    if(existingCartItems){
        return cartItems.map((cartItem)=> 
        cartItem.id === productsToAdd.id
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
        )
    }

    return [...cartItems, {...productsToAdd, quantity: 1 }]
}

export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemsToCart: () => {}, 
    cartCount: 0
})

export const CartProvider = ({children}) =>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0)

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0)
        setCartCount(newCartCount)
    },[cartItems])

    const addItemsToCart = (productsToAdd)=>{
        setCartItems(addCartItem(cartItems, productsToAdd));
    }
    const value = {isCartOpen, setIsCartOpen, addItemsToCart, cartItems, cartCount}
    return(
       <CartContext.Provider value={value}>
                {children}
       </CartContext.Provider>
    )
}