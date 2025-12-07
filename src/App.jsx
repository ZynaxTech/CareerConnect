import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import store from "../redux/store.js";

import { useEffect, useState } from "react";
import AuthLayout from "./components/layout/AuthLayout";
import MainLayout from "./components/layout/MainLayout";
import ForgotPassword from "./components/pages/ForgotPassword";
import Welcome from "./components/pages/Welcome";
import Login from "./components/pages/Login";
import NewPassword from "./components/pages/NewPassword";
import NewPasswordSuccess from "./components/pages/NewPasswordSuccess";
import ProtectedRoute from "./components/pages/ProtectedRoute";
import Signup from "./components/pages/Signup";
import LoginProtectedRoutes from "./components/layout/LoginProtectedRoutes";
import Home from "./components/pages/Home";
import PageNotFound from "./components/pages/PageNotFound";
import About from "./components/pages/About";

function App() {
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  useEffect(() => {
    const resetEmail = localStorage.getItem("resetEmail");
    setIsEmailEntered(!!resetEmail);

    const passwordResetSuccessful = localStorage.getItem(
      "passwordResetSuccessful"
    );
    console.log(
      "password reset successfull from appjs",
      passwordResetSuccessful
    );
    setIsPasswordReset(!!passwordResetSuccessful);
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route
              path="newpassword"
              element={
                <ProtectedRoute
                  condition={isEmailEntered}
                  redirectTo="/auth/login"
                >
                  <NewPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="newpassword/successful"
              element={
                <ProtectedRoute
                  condition={isPasswordReset}
                  redirectTo="/auth/newpassword"
                >
                  <NewPasswordSuccess />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route element={<LoginProtectedRoutes />}>
            <Route element={<MainLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
