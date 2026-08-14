import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as orderApi from "../../api/orderApi"

// to create a new order
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, thunkAPI) => {
   try {
    const res = await orderApi.createOrder(orderData)
    return res.data
   } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message)
   }
  }
)

// to fetch all orders of the logged in user
export const fetchMyOrders = createAsyncThunk(
  'order/fetchMyOrders',
  async (_, thunkAPI) => {
    try {
      const res = await orderApi.fetchMyOrders()
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        loading: false,
        error: null,
        lastOrder: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false
                state.lastOrder = action.payload
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchMyOrders.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchMyOrders.fulfilled, (state, action) => {
                state.loading = false
                state.orders = action.payload
            })
            .addCase(fetchMyOrders.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default orderSlice.reducer

