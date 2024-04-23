import { useEffect, useMemo, useState } from 'react';
import { db } from '../data/db';
import type { Guitar } from '../types';

export const useCart = () => {
  const initialCart = (): Guitar[] => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  // State
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MIN_ITEMS = 1;
  const MAX_ITEMS = 5;

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(item: Guitar): void {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExists >= 0) {
      if (cart[itemExists].quantity! >= MAX_ITEMS) return;
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity!++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart((prevCart) => [...prevCart, item]);
    }
  }

  function removeFromCart(id: number) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  function decreaseQuantity(id: number) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity! > MIN_ITEMS) {
        return { ...item, quantity: item.quantity! - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function increaseQuantity(id: number) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity! < MAX_ITEMS) {
        return { ...item, quantity: item.quantity! + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function cleanCart() {
    setCart([]);
  }

  // State Derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity! * item.price, 0),
    [cart]
  );

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    cleanCart,
    isEmpty,
    cartTotal,
  };
};
