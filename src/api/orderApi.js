import axiosInstance from "./axiosInstance";

// create new order
export const createOrder = (data) => axiosInstance.post('/orders', data)

// get my orders
export const fetchMyOrders = () => axiosInstance.get('/orders/my-orders')

