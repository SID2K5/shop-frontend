import api from "./api";

// GET PRODUCTS
export const getProducts = () => {
  return api.get("/products");
};

// CREATE PRODUCT
export const createProduct = (data) => {
  return api.post("/products", data);
};

// UPDATE PRODUCT
export const updateProduct = (id, data) => {
  return api.put(`/products/${id}`, data);
};

// DELETE PRODUCT
export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};

// GET STOCK HISTORY (optional standalone)
export const getProductHistory = (id) => {
  return api.get(`/products/${id}/history`);
};
