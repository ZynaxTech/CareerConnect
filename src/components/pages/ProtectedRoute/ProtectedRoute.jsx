import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ condition, redirectTo, children }) => {
  if (!condition) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
};

export default ProtectedRoute;
