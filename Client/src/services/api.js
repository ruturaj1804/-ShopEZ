import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.MODE === 'development'
    ? 'http://localhost:8000/api'
    : '/api',
});

API.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('userInfo');
    const userInfo = raw ? JSON.parse(raw) : null;
    if (userInfo?.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
  } catch {
    localStorage.removeItem('userInfo');
  }
  return config;
});

export default API;
