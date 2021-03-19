import axios from "../../connection/axios";
import { Transaction } from "context/context-store/store-types";

export const getAllItemsModels = async () => {
  try {
    const res = await axios.get("/v1/items/get-all");
    if (res.data) return res.data;
  } catch (error) {
    return new Error("Something went wrong");
  }
};

export const addTransaction = async (transaction: Transaction) => {
  try {
    const res = await axios.post("/v1/transaction/add", transaction);
    if (res.data) return res.data;
  } catch (error) {
    alert("Something went wrong");
    return new Error("Something went wrong");
  }
};

export const getHistory = async (customerId: number) => {
  try {
    const res = await axios.get("/v1/transaction/history", {
      params: { customerId },
    });
    if (res.data) return res.data;
  } catch (error) {
    alert("Something went wrong");
    return new Error("Something went wrong");
  }
};

export const getOnGoingStatus = async (customerId: number) => {
  try {
    const res = await axios.get("/v1/transaction/ongoing", {
      params: { customerId },
    });
    if (res.data) return res.data;
  } catch (error) {
    alert("Something went wrong");
    return new Error("Something went wrong");
  }
};
