import api from "./axios";

// Get all products
export const getProducts = () => api.get("/products");

// Create product
export const createProduct = (data) => api.post("/products", data);

// Update product
export const updateProduct = (id, data) =>
  api.put(`/products/${id}`, data);

// Delete product
export const deleteProduct = (id) =>
  api.delete(`/products/${id}`);
