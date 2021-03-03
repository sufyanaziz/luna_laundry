export interface contextUser {
  credentials: Credentials;
  loading: boolean;
  error: object;
  event: {
    register: (credential: Credentials) => void;
  };
}

export type Credentials = {
  address: string;
  dob: string;
  email: string;
  fullName: string;
  gender: string;
  password: string;
  phoneNumber: string;
  roles?: Role[];
  username: string;
};

export type Role = {
  description: string;
  name: string;
  roleId: number;
};
