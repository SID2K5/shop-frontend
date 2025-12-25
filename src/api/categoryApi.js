import api from "./axios";

// Get all categories
export const getCategories = () => api.get("/categories");

// Create category
export const createCategory = (data) =>
  api.post("/categories", data);

// Update category
export const updateCategory = (id, data) =>
  api.put(`/categories/${id}`, data);

// Delete category
export const deleteCategory = (id) =>
  api.delete(`/categories/${id}`);
