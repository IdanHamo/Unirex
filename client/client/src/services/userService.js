import httpService from "./httpService";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

export function setTokenHeader() {
  httpService.setCommonHeader("x-auth-token", tokenKey);
}

export async function createUser(user) {
  return await httpService.post("/users/createUser", user);
}

export async function loginUser(user) {
  const { data } = await httpService.post("/auth/login", user);
  localStorage.setItem(tokenKey, data);
  setTokenHeader();
}

/** find user by email, create if not exsists */
export async function loginGoogleUser(user) {
  const { data } = await httpService.post("/auth/google", user);
  localStorage.setItem(tokenKey, data);
  setTokenHeader();
}

export function getJWT() {
  return localStorage.getItem(tokenKey);
}

export function getUser() {
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem(tokenKey);
  setTokenHeader();
}

const usersService = {
  createUser,
  loginUser,
  getJWT,
  getUser,
  logoutUser,
};

export default usersService;
