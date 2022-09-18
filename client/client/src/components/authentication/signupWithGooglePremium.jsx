import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { loginGoogleUser } from "../../services/userService";
import { toast } from "react-toastify";

const SignupWithGooglePremium = ({ successCallback }) => {
  const GOOGLE_CLIENT_ID =
    "198087395591-11ku4q6238js5a4j55dijmnb67nckujk.apps.googleusercontent.com";
  const GOOGLE_CLIENT_SECRET = "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";

  const [error, setError] = useState("");
  const { loginGoogle } = useAuth();

  async function handleCallbackResponse(response) {
    console.log(jwt_decode(response.credential));
    const details = jwt_decode(response.credential);
    // call userService loginGoogleUser
    try {
      await loginGoogle({
        email: details.email,
        userName: details.name,
        isGoogleUser: true,
        image: details.picture,
        password: "abcd1234",
        premium: true,
        admin: false,
      });
      toast("account created successfully");
      window.location.reload();
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

export default SignupWithGooglePremium;
