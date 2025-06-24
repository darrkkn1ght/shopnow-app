import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Alert } from 'react-native';

// Cart Context
const CartContext = createContext();

// Cart Actions
const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  APPLY_DISCOUNT: 'APPLY_DISCOUNT',
  REMOVE_DISCOUNT: 'REMOVE_DISCOUNT',
};

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART: {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        // Add new item
        return {
          ...state,
          items: [...state.items, { product, quantity }],
        };
      }
    }
    
    case CART_ACTIONS.REMOVE_FROM_CART: {
      const { productId } = action.payload;
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== productId),
      };
    }
    
    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        return {
          ...state,
          items: state.items.filter(item => item.product.id !== productId),
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        ),
      };
    }
    
    case CART_ACTIONS.CLEAR_CART: {
      return {
        ...state,
        items: [],
        discount: null,
      };
    }
    
    case CART_ACTIONS.APPLY_DISCOUNT: {
      const { discount } = action.payload;
      return {
        ...state,
        discount,
      };
    }
    
    case CART_ACTIONS.REMOVE_DISCOUNT: {
      return {
        ...state,
        discount: null,
      };
    }
    
    default:
      return state;
  }
};

// Initial State
const initialState = {
  items: [],
  discount: null,
};

// Discount Codes (Mock data)
const DISCOUNT_CODES = {
  'WELCOME10': { code: 'WELCOME10', discount: 10, type: 'percentage' },
  'SAVE20': { code: 'SAVE20', discount: 20, type: 'percentage' },
  'FLAT50': { code: 'FLAT50', discount: 50, type: 'fixed' },
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Cart Actions
  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: CART_ACTIONS.ADD_TO_CART,
      payload: { product, quantity },
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_FROM_CART,
      payload: { productId },
    });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { productId, quantity },
    });
  };

  const clearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            dispatch({ type: CART_ACTIONS.CLEAR_CART });
          },
        },
      ]
    );
  };

  const applyDiscountCode = (code) => {
    const discount = DISCOUNT_CODES[code.toUpperCase()];
    
    if (discount) {
      dispatch({
        type: CART_ACTIONS.APPLY_DISCOUNT,
        payload: { discount },
      });
      return { success: true, message: `Discount code "${code}" applied successfully!` };
    } else {
      return { success: false, message: 'Invalid discount code. Please try again.' };
    }
  };

  const removeDiscount = () => {
    dispatch({ type: CART_ACTIONS.REMOVE_DISCOUNT });
  };

  // Calculated Values
  const getCartItemCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartSubtotal = () => {
    return state.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const getDiscountAmount = () => {
    if (!state.discount) return 0;
    
    const subtotal = getCartSubtotal();
    
    if (state.discount.type === 'percentage') {
      return (subtotal * state.discount.discount) / 100;
    } else {
      return Math.min(state.discount.discount, subtotal);
    }
  };

  const getCartTotal = () => {
    const subtotal = getCartSubtotal();
    const discountAmount = getDiscountAmount();
    const shipping = getShippingCost();
    const tax = getTaxAmount();
    
    return Math.max(0, subtotal - discountAmount + shipping + tax);
  };

  const getShippingCost = () => {
    const subtotal = getCartSubtotal();
    // Free shipping over $100
    return subtotal >= 100 ? 0 : 9.99;
  };

  const getTaxAmount = () => {
    const subtotal = getCartSubtotal();
    const discountAmount = getDiscountAmount();
    const taxableAmount = subtotal - discountAmount;
    
    // 8.5% tax rate
    return Math.max(0, taxableAmount * 0.085);
  };

  const isItemInCart = (productId) => {
    return state.items.some(item => item.product.id === productId);
  };

  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const getCartSummary = () => {
    const subtotal = getCartSubtotal();
    const discountAmount = getDiscountAmount();
    const shipping = getShippingCost();
    const tax = getTaxAmount();
    const total = getCartTotal();
    
    return {
      subtotal,
      discountAmount,
      shipping,
      tax,
      total,
      itemCount: getCartItemCount(),
      freeShippingThreshold: 100,
      freeShippingRemaining: Math.max(0, 100 - subtotal),
    };
  };

  // Context Value
  const contextValue = {
    // State
    items: state.items,
    discount: state.discount,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyDiscountCode,
    removeDiscount,
    
    // Calculated Values
    getCartItemCount,
    getCartSubtotal,
    getDiscountAmount,
    getCartTotal,
    getShippingCost,
    getTaxAmount,
    isItemInCart,
    getItemQuantity,
    getCartSummary,
    
    // Constants
    DISCOUNT_CODES: Object.keys(DISCOUNT_CODES),
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};

// HOC for components that need cart functionality
export const withCart = (Component) => {
  return (props) => {
    const cartContext = useCart();
    return <Component {...props} cart={cartContext} />;
  };
};

export default CartContext; 
