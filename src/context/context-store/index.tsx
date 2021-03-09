import React, { useState } from "react";
import axios from "connection/axios";

import {
  ResponseType,
  StoreContext,
  StoreInfoType,
  ErrorType,
} from "./store-types";
import { formatDate } from "utils/date";
import { AxiosResponse } from "axios";

const CreateContextStore = React.createContext({} as StoreContext);

interface Props {}
interface ResStoreInfo extends AxiosResponse {
  data: StoreInfoType;
}

export const StoreProvider: React.FC<Props> = ({ children }) => {
  const [storeInfo, setStoreInfo] = useState<StoreInfoType>(
    {} as StoreInfoType
  );
  const [response, setResponse] = useState<ResponseType>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<ErrorType>({} as ErrorType);
  const initialMessageError = (path: string) => {
    return {
      message: "Something went wrong!",
      error: "error",
      path,
      timestamp: formatDate().getTime(),
      status: 500,
    };
  };

  //   Get Store Info ---------------
  const getStoreInfo = async () => {
    setLoading(true);
    try {
      const res: ResStoreInfo = await axios.get("/v1/store/info");
      if (res.data) {
        setLoading(false);
        setResponse("SUCCESS");
        setStoreInfo(res.data);
      } else {
        setLoading(false);
        setResponse("ERROR");
        setError(initialMessageError("/v1/store/info"));
      }
    } catch (error) {
      setResponse("ERROR");
      setLoading(false);
      if (error.response) {
        setError(error.response.data);
      } else {
        setError(initialMessageError("/v1/store/info"));
      }
    }
  };

  return (
    <CreateContextStore.Provider
      value={{
        storeInfo,
        response,
        loading,
        error,
        event: {
          getStoreInfo,
        },
      }}
    >
      {children}
    </CreateContextStore.Provider>
  );
};

export const useStore = () => React.useContext(CreateContextStore);
