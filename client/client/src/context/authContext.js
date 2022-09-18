import React, { useEffect, useState } from "react";
import usersService from "../services/userService";

export const authContext = React.createContext(null);
authContext.displayName = "Auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(usersService.getUser());

  const refreshUser = () => {
    setUser(usersService.getUser());
  };
  const createUser = (user) => {
    return usersService.createUser(user);
  };

  const login = async (details) => {
    const response = await usersService.loginUser(details);
    refreshUser();
    return response;
  };

  const loginGoogle = async (details) => {
    const response = await usersService.loginGoogleUser(details);
    refreshUser();
    return response;
  };

  const logout = async () => {
    usersService.logoutUser();
    refreshUser();
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <authContext.Provider
      value={{ user, loginGoogle, login, logout, createUser }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(authContext);
};
