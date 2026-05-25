import { createContext, useContext, useState, useCallback } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [restaurantId, setRestaurantId] = useState(null);
  const [restaurantName, setRestaurantName] = useState('');
  const { addToast } = useToast();

  const addItem = useCallback((item, restId, restName) => {
    if (restaurantId && restaurantId !== restId) {
      // Different restaurant - could prompt to clear
      if (!window.confirm(`Clear cart from ${restaurantName}?`)) return;
      setItems([]);
    }
    setRestaurantId(restId);
    setRestaurantName(restName);
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        addToast(`${item.name} quantity updated`, 'success', 1500);
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      addToast(`${item.name} added to cart 🛒`, 'success', 1500);
      return [...prev, { ...item, qty: 1 }];
    });
  }, [restaurantId, restaurantName, addToast]);

  const removeItem = useCallback((itemId) => {
    setItems(prev => {
      const updated = prev.map(i => i.id === itemId ? { ...i, qty: i.qty - 1 } : i).filter(i => i.qty > 0);
      if (updated.length === 0) setRestaurantId(null);
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setRestaurantId(null);
    setRestaurantName('');
  }, []);

  const getItemQty = useCallback((itemId) => {
    return items.find(i => i.id === itemId)?.qty || 0;
  }, [items]);

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  const deliveryFee = totalPrice > 0 ? 29 : 0;

  return (
    <CartContext.Provider value={{
      items,
      restaurantId,
      restaurantName,
      totalItems,
      totalPrice,
      deliveryFee,
      addItem,
      removeItem,
      clearCart,
      getItemQty
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
