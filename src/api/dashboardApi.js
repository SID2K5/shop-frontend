// frontend/src/services/dashboardService.js

import { getDashboardStats } from "../api/dashboardApi";
import api from "../api/axios";

// Fallback if backend dashboard endpoint is partial
export const fetchDashboardData = async () => {
  const [productsRes, categoriesRes] = await Promise.all([
    api.get("/products"),
    api.get("/categories"),
  ]);

  return {
    products: productsRes.data,
    categories: categoriesRes.data,
  };
};

// Preferred (when backend dashboard API is complete)
export const fetchDashboardFromBackend = async () => {
  return await getDashboardStats();
};
