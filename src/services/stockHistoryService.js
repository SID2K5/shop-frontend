import api from "../api/axios";

export const fetchStockHistory = async (productId) => {
  const res = await api.get(`/stock-history/${productId}`);
  return res.data.history; // ✅ THIS IS CRITICAL
};
