import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// 1. Configurar la URL base apuntando a tu backend local
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api', // Usa variable de entorno o fallback a localhost
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Interceptor de Petición: Adjunta automáticamente el JWT antes de salir al servidor
API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('sigep_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 3. Interceptor de Respuesta: Atrapa errores globales (como el 401 No Autorizado)
API.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      console.warn('Sesión expirada o token inválido.');
      //Corregido: Limpiamos las llaves exactas que usa tu AuthContext
      localStorage.removeItem('sigep_auth');
      localStorage.removeItem('sigep_token');
      localStorage.removeItem('sigep_role'); 
      localStorage.removeItem('sigep_username');
    }
    return Promise.reject(error);
  }
);

export default API;
