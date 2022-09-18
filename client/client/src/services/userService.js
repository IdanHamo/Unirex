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
export async function loginGoogleUser(user) {
  const { data } = await httpService.post("/auth/google", user);
  localStorage.setItem(tokenKey, data.token);
  setTokenHeader();
  return data;
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
export async function contactUs(info) {
  const { data } = await httpService.post("/contact", info);
  return data;
}

const usersService = {
  createUser,
  loginUser,
  getJWT,
  getUser,
  logoutUser,
  loginGoogleUser,
  contactUs,
};

export default usersService;
