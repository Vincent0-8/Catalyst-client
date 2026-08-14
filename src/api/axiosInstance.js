import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/slices/authSlice';

// this axios instance is used to send requests to the backend
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// interceptor: attach token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// SECURITY: interceptor — auto-logout when server returns 401 (token expired or invalid)
// This keeps Redux state in sync with server's auth reality
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;