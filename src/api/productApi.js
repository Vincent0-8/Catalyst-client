import axiosInstance from './axiosInstance';

export const fetchProducts = (params) => axiosInstance.get('/products', { params });
export const fetchProductById = (id) => axiosInstance.get(`/products/${id}`);