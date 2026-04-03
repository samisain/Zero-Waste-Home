'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from './types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, isSubscription: boolean) => void;
  removeFromCart: (productId: string, isSubscription: boolean) => void;
  updateQuantity: (productId: string, isSubscription: boolean, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  plasticSavedTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number, isSubscription: boolean) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.isSubscription === isSubscription
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.isSubscription === isSubscription
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, isSubscription }];
    });
  };

  const removeFromCart = (productId: string, isSubscription: boolean) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.isSubscription === isSubscription))
    );
  };

  const updateQuantity = (productId: string, isSubscription: boolean, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, isSubscription);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.isSubscription === isSubscription
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => {
    const price = item.isSubscription ? item.product.price * 0.9 : item.product.price; // 10% off for subscription
    return total + price * item.quantity;
  }, 0);

  const plasticSavedTotal = cart.reduce((total, item) => {
    // Assuming plasticSaved is per item
    // If it's a subscription, maybe we calculate annual savings? Let's keep it simple: per order savings.
    return total + item.product.plasticSaved * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        plasticSavedTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
