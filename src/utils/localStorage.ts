import { Transaction } from "../context/context-store/store-types";

export const LocalStorageAuth = () => {};

type LocalStorageTransactionType = Transaction | null;

export const LocalStorageTransaction = (): LocalStorageTransactionType => {
  const LocalStorage = localStorage.getItem("_transaction");
  if (LocalStorage === null) {
    return null;
  } else {
    const _transaction = JSON.parse(LocalStorage);
    return _transaction;
  }
};
