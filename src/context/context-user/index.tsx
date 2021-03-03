import React from "react";
import axios from "connection/axios";

import { contextUser, Credentials } from "./contextUser-types";

interface Props {}

const UserContext = React.createContext({} as contextUser);

export const UserProvider: React.FC<Props> = ({ children }) => {
  /** For Credentials user */
  const [credentials, setCredentials] = React.useState<Credentials>(
    {} as Credentials
  );
  /** For Loading User */
  const [loading, setLoading] = React.useState<boolean>(false);
  /** For Error */
  const [error, setError] = React.useState<object>({});

  const register = async (credentials: Credentials) => {
    setLoading(true);
    try {
      const userRegistration: Credentials = await axios.post(
        "/secured/register",
        credentials
      );
      if (userRegistration) {
        setLoading(false);
        setCredentials(userRegistration);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        credentials,
        loading,
        error,
        event: {
          register,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
