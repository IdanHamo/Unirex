import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useState } from "react";

const LoginWithGoogle = () => {
  const google = () => {
    window.open("http://localhost:3001/passportAuth/google", "_self");
  };

  const [googleUser, setGoogleUser] = useState(null);

  return (
    <div onClick={google} className="google-btn bg-light">
      <div className="google-icon-wrapper">
        <img
          className="google-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        />
      </div>
      <p className="btn-text">
        <b>Sign in with google</b>
      </p>
    </div>
  );
};

export default LoginWithGoogle;
