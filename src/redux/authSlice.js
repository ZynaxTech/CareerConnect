// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getUserFromToken,
  getToken,
  saveToken,
  clearToken,
} from "../auth/authService";

const initialState = {
  token: getToken(),
  user: getUserFromToken(),
  emailEntered: "",
  passwordReset: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmailEntered: (state, action) => {
      state.emailEntered = action.payload;
    },
    setPasswordReset: (state, action) => {
      state.passwordReset = action.payload;
    },
    loginSuccess: (state, action) => {
      const { token } = action.payload;
      saveToken(token);
      state.token = token;
      state.user = getUserFromToken();
    },
    logout: (state) => {
      clearToken();
      state.token = null;
      state.user = null;
    },
  },
});

export const { setEmailEntered, setPasswordReset, loginSuccess, logout } =
  authSlice.actions;
export default authSlice.reducer;
