import { History } from "history";
import { AxiosResponse } from "axios";

export interface contextUser {
  credentials: CredentialsType;
  loading: boolean;
  error: ErrorType;
  event: {
    register: (credential: CredentialsType, history: History) => void;
    login: (username: string, password: string) => void;
    logout: () => void;
    getDataUserFromToken: (data: CredentialsType) => void;
  };
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
};

export type CredentialsType = {
  address?: string;
  dob?: string;
  email?: string | string;
  fullName?: string;
  gender?: string;
  phoneNumber?: string;
  roles?: RoleType[];
  username?: string | null;
  customerId?: number | null;
  createdDate?: string | null;
};

export type RoleType = {
  description: string;
  name: string;
  roleId: number;
};