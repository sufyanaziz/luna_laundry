export interface StoreContext {
  storeInfo: StoreInfoType;
  response: ResponseType;
  loading: boolean;
  error: ErrorType;
  event: EventType;
}

export type StoreInfoType = {
  operationalHours: string;
  paymentMethod: [];
  pricePerKilo: number;
  pricePerPiece: number;
  basicDeliveryPrice: number;
  maxDelivery: number;
};

export type ResponseType = "" | "SUCCESS" | "ERROR";

export type ErrorType = {
  error: string;
  message: string;
  path: string;
  status: number;
  timestamp: number;
};

export type EventType = {
  getStoreInfo: () => void;
};
