'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Cart, CartItem, Note } from '@/types';

interface CartContextType {
  cart: Cart;
  addToCart: (note: Note, quantity?: number) => void;
  removeFromCart: (noteId: string) => void;
  updateQuantity: (noteId: string, quantity: number) => void;
  clearCart: () => void;
  applyDiscountCode: (code: string, discountPercentage: number) => void;
  removeDiscountCode: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { note: Note; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { noteId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_DISCOUNT_CODE'; payload: { code: string; discountPercentage: number } }
  | { type: 'REMOVE_DISCOUNT_CODE' }
  | { type: 'LOAD_CART'; payload: Cart };

const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { note, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.note._id === note._id);
      
      let newItems;
      if (existingItemIndex >= 0) {
        // If item already exists, don't increase quantity (limit to 1 per note)
        newItems = [...state.items];
        newItems[existingItemIndex].quantity = 1;
      } else {
        // Add new item with quantity of 1 (regardless of requested quantity)
        newItems = [...state.items, { note, quantity: 1 }];
      }
      
      const total = newItems.reduce((sum, item) => sum + (item.note.price * item.quantity), 0);
      const discountAmount = state.discountCode ? (total * (state.discountAmount! / 100)) : 0;
      const finalTotal = total - discountAmount;
      
      return {
        ...state,
        items: newItems,
        total,
        discountAmount,
        finalTotal,
      };
    }
    
    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.note._id !== action.payload);
      const total = newItems.reduce((sum, item) => sum + (item.note.price * item.quantity), 0);
      const discountAmount = state.discountCode ? (total * (state.discountAmount! / 100)) : 0;
      const finalTotal = total - discountAmount;
      
      return {
        ...state,
        items: newItems,
        total,
        discountAmount,
        finalTotal,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { noteId, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: noteId });
      }
      
      const newItems = state.items.map(item =>
        item.note._id === noteId ? { ...item, quantity } : item
      );
      
      const total = newItems.reduce((sum, item) => sum + (item.note.price * item.quantity), 0);
      const discountAmount = state.discountCode ? (total * (state.discountAmount! / 100)) : 0;
      const finalTotal = total - discountAmount;
      
      return {
        ...state,
        items: newItems,
        total,
        discountAmount,
        finalTotal,
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        finalTotal: 0,
      };
    
    case 'APPLY_DISCOUNT_CODE': {
      const { code, discountPercentage } = action.payload;
      const discountAmount = state.total * (discountPercentage / 100);
      const finalTotal = state.total - discountAmount;
      
      return {
        ...state,
        discountCode: code,
        discountAmount,
        finalTotal,
      };
    }
    
    case 'REMOVE_DISCOUNT_CODE': {
      return {
        ...state,
        discountCode: undefined,
        discountAmount: undefined,
        finalTotal: state.total,
      };
    }
    
    case 'LOAD_CART':
      return action.payload;
    
    default:
      return state;
  }
};

const initialState: Cart = {
  items: [],
  total: 0,
  finalTotal: 0,
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  const addToCart = (note: Note, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { note, quantity } });
  };
  
  const removeFromCart = (noteId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: noteId });
  };
  
  const updateQuantity = (noteId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { noteId, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const applyDiscountCode = (code: string, discountPercentage: number) => {
    dispatch({ type: 'APPLY_DISCOUNT_CODE', payload: { code, discountPercentage } });
  };
  
  const removeDiscountCode = () => {
    dispatch({ type: 'REMOVE_DISCOUNT_CODE' });
  };
  
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyDiscountCode,
        removeDiscountCode,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};