import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const authContextDefaultValues = {
  user: {
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    superUser: false,
  },
  setUser: ({ firstName, middleName, lastName, suffix, superUser }) => {},
};

const AuthContext = createContext(authContextDefaultValues);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(authContextDefaultValues.user);
  useEffect(() => {
    // get info stored in local storage
    const keys = ["firstName", "middleName", "lastName", "suffix", "superUser"];
    const payload = {};
    keys.forEach((key) => {
      const res = localStorage.getItem([key]);
      Object.assign(payload, {
        [key]: res,
      });
    });

    setUser(payload);
  }, []);
  /**
   *
   * @param {{
   * firstName: string,
   * middleName: string,
   * lastName: string,
   * suffix: string,
   * superUser: boolean
   * } payload
   */
  function updateUser(payload) {
    setUser(payload);
    // localStorage.setItem("superUser", true);
    Object.keys(payload).forEach((key) => {
      localStorage.setItem([key], payload[key]);
    });
  }
  const value = {
    user,
    updateUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
