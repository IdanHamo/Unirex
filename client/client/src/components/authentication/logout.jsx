import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Logout = ({ redirect }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    toast("logged out");
    redirect && navigate(redirect);
  }, []);

  return null;
};

export default Logout;
