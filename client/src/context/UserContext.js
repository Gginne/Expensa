import React, { useContext, useState } from "react";
import axios from "axios";
import { getSessionStorage, setSessionStorage } from "../helpers/utils";
const UserContext = React.createContext();

export function useAuth() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    getSessionStorage("user", null)
  );

  const login = async (data) => {
    try {
      const response = await axios.post("/api/login", data);

      const { access, refresh, user } = response.data;

      setSessionStorage("access", access);
      setSessionStorage("refresh", refresh);
      setSessionStorage("user", user);
      
      setCurrentUser(user);
    } catch (err) {
      console.log(err);
    }
  };
  
  const register = async (data) => {
    try {
      const response = await axios.post("/api/register", data);

      const { access, refresh, user } = response.data;

      setSessionStorage("access", access);
      setSessionStorage("refresh", refresh);
      setSessionStorage("user", user);

      setCurrentUser(user);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    register,
    login,
    logout
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
