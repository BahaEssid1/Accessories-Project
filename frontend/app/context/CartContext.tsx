

"use client";
import { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string; // Assuming image URL is part of the cart item
  details: string; // Assuming details are part of the cart item
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string, title: string) => void; // Updated to accept both id and title
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // Get cart items from localStorage (if any)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Store cart items in localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cartItems");
    }
  }, [cartItems]);

  // Add item to cart (with quantity)
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      // Generate a unique ID by combining item ID and title (or just rely on ID if it’s unique enough)
      const uniqueItemId = `${item.id}_${item.title}`;

      const existingItem = prevItems.find(
        (i) => `${i.id}_${i.title}` === uniqueItemId
      );

      if (existingItem) {
        // If item exists, update its quantity
        return prevItems.map((i) =>
          `${i.id}_${i.title}` === uniqueItemId
            ? { ...i, quantity: i.quantity + item.quantity } // Increment quantity
            : i
        );
      } else {
        // If item does not exist, add it to the cart with quantity
        return [...prevItems, { ...item, quantity: item.quantity }];
      }
    });
  };

  // Remove item from cart based on both id and title
  const removeFromCart = (itemId: string, title: string) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter(
        (item) => !(item.id === itemId && item.title === title)
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Update localStorage after removal
      return updatedCart;
    });
  };

  // Get total number of items in the cart
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price of items in the cart
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, getTotalItems, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
