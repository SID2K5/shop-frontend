import axios from "axios";

const API = "http://localhost:5000/api";

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API}/auth/login`, {
    email,
    password,
  });

  // Save token + role
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("role", res.data.user.role);

  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const getRole = () => {
  return localStorage.getItem("role");
};
