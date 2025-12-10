// src/auth/authService.js
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getValidToken() {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      clearToken();
      return null;
    }
    return token;
  } catch (e) {
    clearToken();
    return null;
  }
}

export function getUserFromToken() {
  const token = getValidToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (e) {
    clearToken();
    return null;
  }
}
