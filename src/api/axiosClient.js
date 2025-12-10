// src/api/axiosClient.js
import axios from "axios";
import store from "../redux/store.js";
import { logout } from "../redux/authSlice.js";
import { getValidToken } from "../auth/authService";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: false,
});

// attach token
api.interceptors.request.use((config) => {
  const token = getValidToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// on 401 -> logout
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (
      err.response &&
      (err.response.status === 401 || err.response.status === 403)
    ) {
      store.dispatch(logout());
    }
    return Promise.reject(err);
  }
);

export default api;
