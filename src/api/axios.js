import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://shop-backend-1-xctj.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
