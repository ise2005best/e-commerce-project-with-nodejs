import { createContext, useState, useEffect } from "react";
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
  
    if (existingCartItem.quantity === 1) {
      return cartItems.filter((item) => item.id !== cartItemToRemove.id);
    }
  
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
        const newCartTotal = cartItems.reduce(
          (total, cartItem) => total + cartItem.quantity,
          0
        );
        setCartCount(newCartTotal);
      }, [cartItems]);


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