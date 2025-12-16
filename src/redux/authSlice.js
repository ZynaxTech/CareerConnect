// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  clearUser,
  saveUser,
  getTokenUser,
  saveAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../auth/authService";

const initialState = {
  accessToken: getAccessToken(),
  user: getTokenUser() || null,
  emailEntered: "",
  passwordReset: false,
  otpEntered: false,
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
    setOTPEntered: (state, action) => {
      state.otpEntered = action.payload;
    },
    loginSuccess: (state, action) => {
      const { user, accessToken } = action.payload;
      saveUser(user);
      saveAccessToken(accessToken);
      state.user = user;
      state.accessToken = accessToken;
    },
    logout: (state) => {
      clearUser();
      clearAccessToken();
      state.accessToken = null;
      state.user = null;
      state.emailEntered = "";
      state.passwordReset = false;
    },
  },
});

export const {
  setEmailEntered,
  setPasswordReset,
  setOTPEntered,
  loginSuccess,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
