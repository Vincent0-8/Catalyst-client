import { createSlice } from '@reduxjs/toolkit';

const getWishlistKey = () => {
  const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      return `wishlist_${user.id}`;
    } catch {
      return 'wishlist_guest';
    }
  }
  return 'wishlist_guest';
};

const loadWishlistFromStorage = () => {
  const stored = localStorage.getItem(getWishlistKey());
  return stored ? JSON.parse(stored) : [];
};

const saveWishlist = (items) => {
  localStorage.setItem(getWishlistKey(), JSON.stringify(items));
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: loadWishlistFromStorage(),
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.find((item) => item._id === product._id);
      if (exists) {
        state.items = state.items.filter((item) => item._id !== product._id);
      } else {
        state.items.push(product);
      }
      saveWishlist(state.items);
    },
    loadWishlist: (state) => {
      state.items = loadWishlistFromStorage();
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { toggleWishlist, loadWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;