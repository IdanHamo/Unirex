import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { loginGoogleUser } from "../../services/userService";

const SignupWithGoogle = ({successCallback}) => {

  function handleCallbackResponse(response){
    console.log(jwt_decode(response.credential));
    const details = jwt_decode(response.credential);
    // handle error if error
    // call userService loginGoogleUser 
    loginGoogleUser({
      email:details.email,
      userName: details.name,
      // no need for password , make random one
    })
    // check if user exsists locally or create
    // either create a googleUsers collection or add a isGoogleUser flag to bypass password.
    //useAuth to set authentication data...
  }

  useEffect(() => {
    // CHANGE CLIENT_ID TO YOUR CLIENT ID
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
