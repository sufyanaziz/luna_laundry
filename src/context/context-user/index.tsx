import React from "react";
import axios from "connection/axios";
import { History } from "history";

import {
  contextUser,
  CredentialsType,
  ErrorType,
  ResLogin,
  RegisDataType,
} from "./user-types";

import { formatDate } from "utils/date";

interface Props {}

const UserContext = React.createContext({} as contextUser);

export const UserProvider: React.FC<Props> = React.memo(({ children }) => {
  /** For Credentials user */
  const [credentials, setCredentials] = React.useState<CredentialsType>(
    {} as CredentialsType
  );
  /** For Loading User */
  const [loading, setLoading] = React.useState<boolean>(false);
  /** For Error */
  const [error, setError] = React.useState<ErrorType>({} as ErrorType);
  const initialMessageError = (path: string, type: "register" | "login") => {
    return {
      message: "Something went wrong!",
      error: "error",
      path,
      timestamp: formatDate().getTime(),
      status: 500,
      type,
    };
  };

  //  ----------------- Public page for login & registration ------------------
  // Register ------------------------------------------------------
  const register = React.useCallback(
    async (credentials: RegisDataType, history: History) => {
      setLoading(true);
      try {
        const res = await axios.post("/secured/register", credentials);
        if (res) {
          setLoading(false);
          history.push("/");
          setError({} as ErrorType);
        } else {
          setLoading(false);
          setError({} as ErrorType);
        }
      } catch (error) {
        setLoading(false);
        if (error.response) {
          setError({ ...error.response.data, type: "register" });
        } else {
          setError(initialMessageError("/secured/register", "register"));
        }
      }
    },
    []
  );
  // Login --------------------------------------------------------

  const setAuthorization = (token: string) => {
    const lunaLaundry = `Bearer ${token}`;
    localStorage.setItem("_authtkn", token);
    axios.defaults.headers.common["Authorization"] = lunaLaundry;
  };

  const login = async (username: string, password: string) => {
    setLoading(true);
    const req = { username, password };
    try {
      const res: ResLogin = await axios.post("/secured/authenticate", req);
      if (res) {
        setLoading(false);
        setAuthorization(res.data.token);
        setError({} as ErrorType);
        window.location.href = "/home";
      } else {
        setLoading(false);
        setError({} as ErrorType);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError({ ...error.response.data, type: "login" });
      } else {
        setError(initialMessageError("/secured/authenticate", "login"));
      }
    }
  };

  // Logout ----------------------------------------------------------
  const logout = () => {
    setCredentials({} as CredentialsType);
    setLoading(false);
    setError({} as ErrorType);
    localStorage.removeItem("_authtkn");
    delete axios.defaults.headers.common["Authorization"];
    window.location.href = "/";
  };
  // --------------------------------------------------------------------

  // Get Data user ---------------------------------------
  const getDataUserFromToken = (data: CredentialsType) => {
    if (Object.keys(data).length !== 0) {
      setCredentials(data);
    }
  };
  // -----------------------------------------------------

  // Clear Error -----------------------
  const clearError = () => {
    if (Object.keys(error).length !== 0) {
      setError({} as ErrorType);
    }
  };
  // ----------------------------------

  return (
    <UserContext.Provider
      value={{
        credentials,
        loading,
        error,
        event: {
          register,
          login,
          logout,
          getDataUserFromToken,
          clearError,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
});

export const useUser = () => React.useContext(UserContext);
