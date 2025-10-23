import type { LoginResponse } from "./login.model";

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  confirm_Password: string;
};

export type RegisterResponse = LoginResponse;