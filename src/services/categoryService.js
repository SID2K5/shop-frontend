// frontend/src/services/categoryService.js
import api from "../api/axios";

/* ================= GET ================= */
export const fetchCategories = async () => {
  const res = await api.get("/categories");
  return res.data;
};

/* ================= CREATE ================= */
export const createCategory = async (data) => {
  const res = await api.post("/categories", data);
  return res.data;
};

/* ================= UPDATE ================= */
export const updateCategory = async (id, data) => {
  const res = await api.put(`/categories/${id}`, data);
  return res.data;
};

/* ================= DELETE ================= */
export const deleteCategory = async (id) => {
  const res = await api.delete(`/categories/${id}`);
  return res.data;
};
