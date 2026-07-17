import { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) return;
    try {
      const { data } = await API.get('/cart');
      if (data.success) setCart(data.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  useEffect(() => {
    if (user) fetchCart();
    else setCart({ items: [], totalPrice: 0 });
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    const { data } = await API.post('/cart/add', { productId, quantity });
    if (data.success) setCart(data.data);
    return data;
  };

  const updateQuantity = async (itemId, quantity) => {
    const { data } = await API.put(`/cart/${itemId}`, { quantity });
    if (data.success) setCart(data.data);
    return data;
  };

  const removeItem = async (itemId) => {
    const { data } = await API.delete(`/cart/${itemId}`);
    if (data.success) setCart(data.data);
    return data;
  };

  const clearCart = async () => {
    const { data } = await API.delete('/cart/clear/all');
    if (data.success) setCart(data.data);
    return data;
  };

  const cartCount = cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <CartContext.Provider value={{ cart, cartCount, fetchCart, addToCart, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
