export type DecodeToken = {
  exp: number;
  iat: number;
  roles: "ROLE_USER";
  sub: string;
  customerId: number;
  email: string;
  username: string;
};
