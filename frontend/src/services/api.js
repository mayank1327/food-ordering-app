import axios from 'axios';
import { API_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_URL
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile')
};

// Restaurant APIs
export const restaurantAPI = {
  getAll: () => api.get('/restaurants'),
  getById: (id) => api.get(`/restaurants/${id}`)
};

// Menu Item APIs
export const menuItemAPI = {
  getByRestaurant: (restaurantId) => api.get(`/menu-items/restaurant/${restaurantId}`)
};

// Order APIs
export const orderAPI = {
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  create: (orderData) => api.post('/orders', orderData),
  place: (id, paymentMethodId) => api.post(`/orders/${id}/place`, { paymentMethodId }),
  cancel: (id) => api.post(`/orders/${id}/cancel`)
};

// Payment APIs
export const paymentAPI = {
  getAll: () => api.get('/payments'),
  add: (paymentData) => api.post('/payments', paymentData)
};

export default api;