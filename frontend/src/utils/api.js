// utils/api.js
import axios from 'axios';
import setupInterceptors from './setupInterceptors';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
});

// Apply interceptors to the axios instance
setupInterceptors(api);

export default api;
