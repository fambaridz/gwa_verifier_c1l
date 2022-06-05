import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

/**
 * Default values for the auth context
 */
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

/**
 * A provider for authentication purposes - it stores the committee's full name, email, and super user status
 * @param {{ children: JSX.Element }} param0
 * @returns A provider that you can use to wrap your app with in order to gain access to the auth credentials stored in this provider
 */
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(authContextDefaultValues.user);

  /**
   * On mount, get the stored credentials in the localStorage and save it in memory. In this app, we'll use localStorage to store all sensitive information. This option is vulnerable to attacks as user can just open the dev tools and inspect the information. To mitigate this, I disabled the users' capability to open the dev tools by catching the CTRL + SHIFT + I keyboard keys in main.js.
   */
  useEffect(() => {
    // get info stored in local storage
    const keys = [
      "firstName",
      "middleName",
      "lastName",
      "suffix",
      "superUser",
      "email",
    ];
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
   * Update the user credentials stored in localStorage and in memory
   * @param {{
   * firstName: string,
   * middleName: string,
   * lastName: string,
   * suffix: string,
   * superUser: boolean
   * }} payload
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

/**
 * A utility function that users can use to access the Auth context's state
 */
export function useAuth() {
  return useContext(AuthContext);
}
