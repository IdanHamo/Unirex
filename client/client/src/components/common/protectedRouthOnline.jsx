import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const ProtectedRouteOnline = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/home"></Navigate>;
  }
  return children;
};

export default ProtectedRouteOnline;
