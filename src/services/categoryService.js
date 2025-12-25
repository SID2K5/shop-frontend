import api from "./api";

export const getCategories = () => api.get("/categories/");
export const createCategory = (data) => api.post("/categories/", data);
export const deleteCategory = (id) => api.delete(`/categories/${id}/`);

// LOGIN
export const login = (credentials) => {
  return api.post("/auth/login", credentials);
};

// REGISTER (optional)
export const register = (data) => {
  return api.post("/auth/register", data);
};

// LOGOUT
export const logout = () => {
  return api.post("/auth/logout");
};

// GET CURRENT USER
export const getCurrentUser = () => {
  return api.get("/auth/me");
};
