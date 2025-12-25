import api from "../api/axios";

/* ================= LOGIN ================= */
export const loginUser = async (email, password) => {
  const res = await api.post("/auth/login", {
    email,
    password,
  });

  // Save token + role
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("role", res.data.user.role);

  return res.data;
};

/* ================= LOGOUT ================= */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

/* ================= AUTH CHECK ================= */
export const isAuthenticated = () => {
  return Boolean(localStorage.getItem("token"));
};

/* ================= ROLE ================= */
export const getRole = () => {
  return localStorage.getItem("role");
};
