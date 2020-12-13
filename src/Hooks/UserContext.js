import React, { createContext, useState } from "react";
import { TOKEN_POST, USER_GET } from "../api";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await (await fetch(url, options)).json();
    setData(response);
    setLogin(true);
    console.log(response);
  }

  async function userLogin(username, password) {
    const { url, options } = TOKEN_POST({ username, password });

    const { token } = await (await fetch(url, options)).json();
    window.localStorage.setItem("token", token);
    getUser(token);
  }

  return (
    <UserContext.Provider value={{ userLogin, data }}>
      {children}
    </UserContext.Provider>
  );
};
