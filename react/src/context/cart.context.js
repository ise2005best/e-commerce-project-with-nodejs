import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
      (item) => item.id === productToAdd.id
    );
    if (existingCartItem) {
      return cartItems.map((item) =>
        item.id === productToAdd.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  };

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
      (item) => item.id === cartItemToRemove.id
    );
      
    // remove from cart item when quantity is null
    if (existingCartItem.quantity === 1) {
      return cartItems.filter((item) => item.id !== cartItemToRemove.id);
    }
    
    // map over new cartItems
    return cartItems.map((item) =>
      item.id === cartItemToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  };

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemsToCart: () => { },
    cartCount: 0,
    removeItemFromCart: () => { }
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
      // get total sum of cartItems quantity whenever cartItems changes
        const newCartTotal = cartItems.reduce(
          (total, cartItem) => total + cartItem.quantity,
          0
        );
        setCartCount(newCartTotal);
      }, [cartItems]);
      
      var location = useLocation()
      useEffect(() =>{
        // close the cart when the user leaves the current page
        setIsCartOpen(false)
      },[location.pathname])


    const addItemsToCart = (productsToAdd) => {
        setCartItems(addCartItem(cartItems, productsToAdd));
    }
    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }
    const value = { isCartOpen, setIsCartOpen, addItemsToCart, cartItems, cartCount, removeItemFromCart }
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}