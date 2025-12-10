import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import AuthLayout from "./components/layout/AuthLayout";
import LoginProtectedRoutes from "./components/layout/LoginProtectedRoutes";
import MainLayout from "./components/layout/MainLayout";
import About from "./components/pages/About";
import ForgotPassword from "./components/pages/ForgotPassword";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import NewPassword from "./components/pages/NewPassword";
import NewPasswordSuccess from "./components/pages/NewPasswordSuccess";
import PageNotFound from "./components/pages/PageNotFound";
import ProtectedRoute from "./components/pages/ProtectedRoute";
import Signup from "./components/pages/Signup";
import Welcome from "./components/pages/Welcome";

function App() {
  const isEmailEntered = useSelector((state) => state.auth.emailEntered);
  const isPasswordReset = useSelector((state) => state.auth.passwordReset);

  return (
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
  );
}

export default App;
