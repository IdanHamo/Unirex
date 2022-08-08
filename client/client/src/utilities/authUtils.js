import jwtDecode from "jwt-decode";
const tokenKey = "token";

//set auth token

//get auth token

// getCurrentUser

export const getJWT = () => {
  return localStorage.getItem(tokenKey);
};

export function getUser() {
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch {
    return null;
  }
}
