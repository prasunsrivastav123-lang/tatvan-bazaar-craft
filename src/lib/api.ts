import axios from "axios";

/* ===========================================
   Axios instance for Tatvan backend.
   Base URL points at your Express server root
   (no /api prefix — matches your existing
   server.js mount: app.use("/auth", authRoutes)).
   New file — does not touch any existing lib file.
=========================================== */

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT automatically if present
api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("tatvan_token") : null;

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;