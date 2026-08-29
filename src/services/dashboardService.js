// frontend/src/services/dashboardService.js

import api from "../api/axios";

/**
 * Fetch dashboard analytics from backend
 * Backend is the single source of truth
 */
export const fetchDashboardData = async () => {
  const res = await api.get("/dashboard");
  return res.data;
};
