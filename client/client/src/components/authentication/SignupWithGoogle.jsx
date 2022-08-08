import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useAuth } from "../../context/authContext";

const SignupWithGoogle = ({successCallback}) => {

  function handleCallbackResponse(response){
    console.log(jwt_decode(response.credential));
    // call userService loginGoogleUser sds
    // check if user exsists locally or create
    // either create a googleUsers collection or add a isGoogleUser flag to bypass password.
    //useAuth to set authentication data...
  }

  useEffect(() => {
    /* global google */
  google.accounts.id.initialize({
    client_id:"276039924901-q5fejpbk9njka679p16rtnvhnvbl7qis.apps.googleusercontent.com",
    callback:handleCallbackResponse
  })
  // google.accounts.id.prompt()
  google.accounts.id.renderButton(
    document.getElementById('signin'),
    {
      theme:"outline"
    }
  )
    return () => {
    }
  }, [])


  return (
    <div id="signin">
     
    </div>
  );
};

export default SignupWithGoogle;
