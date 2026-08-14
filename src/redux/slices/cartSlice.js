import { createSlice } from '@reduxjs/toolkit';

const getCartKey = () => {
  const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      return `cart_${user.id}`;
    } catch {
      return 'cart_guest';
    }
  }
  return 'cart_guest';
};

const loadCartFromStorage = () => {
  const stored = localStorage.getItem(getCartKey());
  return stored ? JSON.parse(stored) : [];
};

const saveCart = (items) => {
  localStorage.setItem(getCartKey(), JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, size, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product._id === product._id && item.size === size
      );
      if (existingItem) {
        const newQty = existingItem.quantity + quantity;
        existingItem.quantity = Math.min(newQty, product.stock);
      } else {
        state.items.push({ product, size, quantity: Math.min(quantity, product.stock) });
      }
      saveCart(state.items);
    },
    removeFromCart: (state, action) => {
      const { productId, size } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.product._id === productId && item.size === size)
      );
      saveCart(state.items);
    },
    updateQuantity: (state, action) => {
      const { productId, size, quantity } = action.payload;
      const item = state.items.find(
        (item) => item.product._id === productId && item.size === size
      );
      if (item) {
        item.quantity = Math.min(quantity, item.product.stock);
      }
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCart([]);
    },
    loadCart: (state) => {
      state.items = loadCartFromStorage();
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, loadCart } = cartSlice.actions;
export default cartSlice.reducer;