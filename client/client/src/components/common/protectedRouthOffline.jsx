import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";

const ProtectedRouteOffline = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return children;
  }
  toast("You can not get access this page while you logged in");
  return <Navigate to="/home"></Navigate>;
};

export default ProtectedRouteOffline;
