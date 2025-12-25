import api from "./axios";

// Dashboard statistics
export const getDashboardStats = () =>
  api.get("/dashboard/stats");
