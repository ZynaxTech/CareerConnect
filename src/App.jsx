import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AuthLayout from "./components/layout/AuthLayout";
import LoginProtectedRoutes from "./components/layout/LoginProtectedRoutes";
import MainLayout from "./components/layout/MainLayout";
import Community from "./components/pages/Community/Community.jsx";
import StartDiscussion from "./components/pages/Community/StartDiscussion.jsx";
import Counselor from "./components/pages/Counselor/Counselor.jsx";
import Exam from "./components/pages/Exam/Exam.jsx";
import ExamDetail from "./components/pages/ExamDetail/ExamDetail.jsx";
import ForgotPassword from "./components/pages/ForgotPassword";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import NewPassword from "./components/pages/NewPassword";
import NewPasswordSuccess from "./components/pages/NewPasswordSuccess";
import PageNotFound from "./components/pages/PageNotFound";
import ProtectedRoute from "./components/pages/ProtectedRoute";
import Signup from "./components/pages/Signup";
import UniversityDetail from "./components/pages/UniverisityDetail/UniversityDetail.jsx";
import University from "./components/pages/University/University.jsx";
import Verify from "./components/pages/Verify";
import VerifyEmail from "./components/pages/VerifyEmail";
import VerifyOTP from "./components/pages/VerifyOTP";
import Welcome from "./components/pages/Welcome";
function App() {
  const isEmailEntered = useSelector((state) => state.auth.emailEntered);
  const isPasswordReset = useSelector((state) => state.auth.passwordReset);
  const isOTPEntered = useSelector((state) => state.auth.otpEntered);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="verify" element={<VerifyEmail />} />
          <Route path="verify/:token" element={<Verify />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route
            path="verify-otp/:email"
            element={
              <ProtectedRoute
                condition={isEmailEntered}
                redirectTo="/auth/login"
              >
                <VerifyOTP />
              </ProtectedRoute>
            }
          />
          <Route
            path="update-password/:email"
            element={
              <ProtectedRoute condition={isOTPEntered} redirectTo="/auth/login">
                <NewPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="update-password/:email/success"
            element={
              <ProtectedRoute
                condition={isPasswordReset}
                redirectTo="/auth/login"
              >
                <NewPasswordSuccess />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route element={<LoginProtectedRoutes />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/exam" element={<Exam />} />
            <Route path="/exam/:id" element={<ExamDetail />} />
            <Route path="/universities" element={<University />} />
            <Route path="/universities/:id" element={<UniversityDetail />} />
            <Route path="/counselor" element={<Counselor />} />
            <Route path="/community" element={<Community />} />
            <Route
              path="/community/start-discussion"
              element={<StartDiscussion />}
            />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
