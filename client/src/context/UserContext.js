import React, { useContext, useState } from "react";
import axios from "axios";

const UserContext = React.createContext();

export function useAuth() {
  return useContext(UserContext);
}

const getSessionStorage = (key, initialValue) => {
  try {
    const value = window.sessionStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    // if error, return initial value
    return initialValue;
  }
};

const setSessionStorage = (key, value) => {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    getSessionStorage("user", null)
  );

  const login = async (data) => {
    try {
   
        const response = await axios.post("/api/login", data);
        
        //TODO
        // 1. Modify backend to send both auth and refresh tokens to frontend
        // 2. Store both auth and refresh in session
        // 3. Use apiClient interface to handle access token appending and refreshing once expired
        
        const { token } = response.data;

        console.log(response)



        const access = null;

      //setSessionStorage('access', access)
      //setSessionStorage('refresh', refresh)
      //setSessionStorage('user', user)
      //setCurrentUser(user)
    } catch (err) {
      console.log(err);
    }
  };
  const register = async (data) => {
    try {
      console.log(data);

      const access = null;
      const refresh = null;

      //setSessionStorage('access', access)
      //setSessionStorage('refresh', refresh)
      //setSessionStorage('user', user)
      //setCurrentUser(user)
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
    getAccessToken: () => getSessionStorage("access", null),
    register,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
