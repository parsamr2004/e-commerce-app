export type LoginResponse = {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  confirm_Password: string;
};

export type RegisterResponse = LoginResponse;