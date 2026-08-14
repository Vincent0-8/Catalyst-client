import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as productApi from '../../api/productApi';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (params, thunkAPI) => {
    try {
      const res = await productApi.fetchProducts(params);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message || 'Failed to fetch products');
    }
  }
);

export const getProductById = createAsyncThunk(
  'products/getProductById',
  async (id, thunkAPI) => {
    try {
      const res = await productApi.fetchProductById(id);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [], selectedProduct: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;