import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const LoginProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  const isLoggedIn = token ? jwtDecode(token) : "Not logged in";
  return isLoggedIn && isLoggedIn.role === "customer" ? (
    <Outlet />
  ) : isLoggedIn && isLoggedIn.role === "admin" ? (
    <Navigate to="/menu" />
  ) : (
    <Navigate to="/auth/login" />
  );
};
export default LoginProtectedRoutes;
