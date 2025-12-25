import axios from "axios";

/**
 * Axios instance using Vercel / Vite environment variable
 * Make sure VITE_API_BASE_URL exists in:
 *  - .env (local)
 *  - Vercel Environment Variables (production)
 */
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  withCredentials: true,
  timeout: 15000, // prevents infinite hanging
});

/**
 * Attach JWT token automatically if present
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Handle auth expiration globally
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");

      // Prevent infinite redirect loops
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
