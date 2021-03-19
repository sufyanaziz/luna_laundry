import React, { useState } from "react";
import { AxiosResponse } from "axios";

import {
  StoreContext,
  StoreInfoType,
  ErrorType,
  TransactionType,
  ItemType,
  Transaction,
  HistoryTransaction,
} from "./store-types";
import { LocationType } from "views/user/location/location-types";
import axios from "connection/axios";
import { formatDate } from "utils/date";

import {
  getAllItemsModels,
  addTransaction,
  getHistory,
  getOnGoingStatus,
} from "models/store-models";

const CreateContextStore = React.createContext({} as StoreContext);

interface Props {}
interface ResStoreInfo extends AxiosResponse {
  data: StoreInfoType;
}

const initialStateTransaction = {
  category: null,
  deliveryType: null,
  items: null,
  paymentType: null,
  pickUpDate: null,
  submissionType: null,
  transactionTypeId: null,
  userId: null,
  address: null,
};

export const StoreProvider: React.FC<Props> = ({ children }) => {
  const [storeInfo, setStoreInfo] = useState<StoreInfoType>(
    {} as StoreInfoType
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>({} as ErrorType);
  const [location, setLocation] = useState<LocationType>({} as LocationType);
  // transaction state ---------------
  const [transactionType, setTransactionType] = useState<TransactionType[]>([]);
  const [transaction, setTransaction] = useState<Transaction>(
    initialStateTransaction
  );
  const [resTransaction, setResTransaction] = useState<HistoryTransaction>(
    {} as HistoryTransaction
  );
  // Items state ---------------------
  const [items, setItems] = useState<ItemType[]>([]);
  // History ----------------------
  const [historyTransaction, setHistoryTransaction] = useState<
    HistoryTransaction[]
  >([]);
  // Status Transaction --------------
  const [status, setStatus] = useState<HistoryTransaction[]>([]);

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
      const res: ResStoreInfo = await axios.get("/v1/store/info-settings");
      if (res.data) {
        setLoading(false);

        setStoreInfo(res.data);
      } else {
        setLoading(false);
        setError(initialMessageError("/v1/store/info-settings"));
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data);
      } else {
        setError(initialMessageError("/v1/store/info-settings"));
      }
    }
  };

  // Get location user --------------
  const getLocationUser = (locationUser: LocationType) => {
    setLocation(locationUser);
  };

  // Section Transaction -----------------------------------------------
  const getTransactionType = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/v1/transaction-type/get-all");
      if (res.data) {
        setLoading(false);
        setTransactionType(res.data);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data);
      } else {
        setError(initialMessageError("/v1/store/info"));
      }
    }
  };

  const setTransactions = (_transaction: Transaction) => {
    setTransaction(_transaction);
    localStorage.setItem("_transaction", JSON.stringify(_transaction));
  };

  React.useEffect(() => {
    const LocalStorage = localStorage.getItem("_transaction");
    if (LocalStorage !== null) {
      const _transaction = JSON.parse(LocalStorage);
      setTransaction(_transaction);
    } else {
      setTransaction(initialStateTransaction);
    }
  }, []);

  const addNewTransaction = async (_transaction: Transaction) => {
    try {
      const data: HistoryTransaction = await addTransaction(_transaction);
      if (data) {
        setResTransaction(data);
        setHistoryTransaction([data, ...historyTransaction]);
        localStorage.removeItem("_transaction");
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data);
      } else {
        setError(initialMessageError("/v1/items/get-all"));
      }
    }
  };

  // Section Items -----------------------------------------------------
  const getAllItems = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllItemsModels();
      if (data) {
        setLoading(false);
        setItems(data);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data);
      } else {
        setError(initialMessageError("/v1/items/get-all"));
      }
    }
  }, []);

  // History Transaction ---------------------------------------
  const getHistoryTransaction = async (costumerId: number) => {
    setLoading(true);
    try {
      const data = await getHistory(costumerId);
      if (data) {
        setLoading(false);
        setHistoryTransaction(data);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data);
      } else {
        setError(initialMessageError("/v1/transaction/history"));
      }
    }
  };

  // Status Transaction --------------------------------------
  const getStatusTransaction = async (costumerId: number) => {
    setLoading(true);
    try {
      const data = await getOnGoingStatus(costumerId);
      if (data) {
        setLoading(false);
        setStatus(data);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data);
      } else {
        setError(initialMessageError("/v1/transaction/history"));
      }
    }
  };

  // Value for context using react useMemo for memorize
  const value = React.useMemo(
    () => ({
      storeInfo,
      loading,
      error,
      location,
      transactionType,
      items,
      transaction,
      resTransaction,
      status,
      historyTransaction,
      getStoreInfo,
      getLocationUser,
      getTransactionType,
      getAllItems,
      setItems,
      setTransactions,
      setResTransaction,
      setStatus,
      addNewTransaction,
      getHistoryTransaction,
      getStatusTransaction,
    }),
    [
      storeInfo,
      loading,
      error,
      location,
      transactionType,
      items,
      transaction,
      resTransaction,
      status,
      historyTransaction,
      setItems,
      setTransactions,
      setResTransaction,
      addNewTransaction,
    ]
  );

  return (
    <CreateContextStore.Provider value={value}>
      {children}
    </CreateContextStore.Provider>
  );
};

export const useStore = () => React.useContext(CreateContextStore);
