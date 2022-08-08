import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext"; 

const ProtectedRoute = ({ children, prem = false }) => {
  const { user } = useAuth();
  if (!user || (prem && !user.premium)) {
    return <Navigate to="/home"></Navigate>;
  }
  return children;
};

export default ProtectedRoute;
