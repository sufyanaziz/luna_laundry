import { History } from "history";
import { AxiosResponse } from "axios";

export interface contextUser {
  credentials: CredentialsType;
  loading: boolean;
  error: ErrorType;
  event: EventType;
}

export interface ResLogin extends AxiosResponse {
  data: {
    token: string;
  };
}

export type ErrorType = {
  error: string;
  message: string;
  path: string;
  status: number;
  timestamp: number;
  type: "login" | "register";
};

export type CredentialsType = {
  address: string;
  dob?: string;
  email: string;
  fullName?: string;
  gender?: string;
  phoneNumber?: string;
  roles?: RoleType[];
  username: string;
  customerId: number;
  createdDate?: string;
};

export type RegisDataType = {
  address: string;
  dob: string;
  email: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
  username: string;
  password: string;
};

export type RoleType = {
  description: string;
  name: string;
  roleId: number;
};

export type EventType = {
  register: (credential: RegisDataType, history: History) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
  getDataUserFromToken: (data: CredentialsType) => void;
  clearError: () => void;
};
