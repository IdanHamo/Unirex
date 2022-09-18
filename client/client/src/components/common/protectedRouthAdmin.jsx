import { Navigate } from "react-router-dom";

const ProtectedRouteAdmin = ({ children, admin = false }) => {
  if (!admin) {
    return <Navigate to="/home"></Navigate>;
  }
  return children;
};

export default ProtectedRouteAdmin;
