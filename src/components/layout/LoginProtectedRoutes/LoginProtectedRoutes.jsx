import { Navigate, Outlet } from "react-router-dom";
import { getTokenUser } from "../../../auth/authService.js";
import { useSelector } from "react-redux";

const LoginProtectedRoutes = () => {
  const reduxUser = useSelector((state) => state.auth.user);
  const user = reduxUser || getTokenUser();
  if (!user) return <Navigate to="/auth/login" replace />;
  if (user.role === "customer") return <Outlet />;
  if (user.role === "admin") return <Navigate to="/menu" replace />;
  return <Navigate to="/auth/login" replace />;
};
export default LoginProtectedRoutes;
