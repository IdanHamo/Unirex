import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignupWithGoogle = () => {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_APP_ID;
  const GOOGLE_CLIENT_SECRET = process.env.REACT_APP_GOOGLE_SECRET;

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginGoogle } = useAuth();

  async function handleCallbackResponse(response) {
    const details = jwt_decode(response.credential);
    try {
      const response = await loginGoogle({
        email: details.email,
        userName: details.name,
        isGoogleUser: true,
        image: details.picture,
        password: "abcd1234",
        premium: false,
        admin: false,
      });
      navigate("/home");
      toast(response.message);
    } catch ({ response }) {
      setError(response);
    }
  }

  // handle error if error

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signin"), {
      theme: "outline",
    });
    return () => {};
  }, []);

  return (
    <>
      <div id="signin"></div>
      {error ? <div>{error}</div> : null}
    </>
  );
};

export default SignupWithGoogle;
