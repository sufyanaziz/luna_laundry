import { LocationType } from "views/user/location/location-types";
import { CredentialsType } from "../context-user/user-types";

export interface StoreContext {
  storeInfo: StoreInfoType;
  loading: boolean;
  error: ErrorType;
  location: LocationType;
  transactionType: TransactionType[];
  items: ItemType[];
  transaction: Transaction;
  resTransaction: HistoryTransaction;
  historyTransaction: HistoryTransaction[];
  status: HistoryTransaction[];
  getStoreInfo: () => void;
  getLocationUser: (locationUser: LocationType) => void;
  getTransactionType: () => void;
  getAllItems: () => void;
  setItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
  setResTransaction: React.Dispatch<React.SetStateAction<HistoryTransaction>>;
  setStatus: React.Dispatch<React.SetStateAction<HistoryTransaction[]>>;
  setTransactions: (_transaction: Transaction) => void;
  addNewTransaction: (_transaction: Transaction) => void;
  getHistoryTransaction: (costumerId: number) => void;
  getStatusTransaction: (costumerId: number) => void;
}

export type StoreInfoType = {
  operationalHours: string;
  paymentMethod: [];
  pricePerKilo: number;
  pricePerPiece: number;
  basicDeliveryPrice: number;
  maxDelivery: number;
};

export type ErrorType = {
  error: string;
  message: string;
  path: string;
  status: number;
  timestamp: number;
};

export type Transaction = {
  category: string | null;
  deliveryType: string | null;
  items: object | null;
  paymentType: string | null;
  pickUpDate: string | null;
  submissionType: string | null;
  transactionTypeId: number | null;
  userId: number | null;
  address: string | null;
};

export type TransactionType = {
  createdDate: string;
  daysNeeded: number;
  description: string;
  price: number;
  transactionTypeId: number;
  transactionTypeName: string;
};

export type ItemType = {
  createdDate: string;
  description: string;
  itemId: number;
  itemName: string;
  pricePerKilo: number;
  pricePerPiece: number;
  count?: number;
};

export type HistoryTransaction = {
  category: string;
  deliveryType: string;
  finishDate: number;
  ongkir: 0;
  orders: object;
  paymentType: string;
  pickUpDate: number;
  submissionType: string;
  totalPrice: 0;
  transactionType: string;
  user: CredentialsType;
};
