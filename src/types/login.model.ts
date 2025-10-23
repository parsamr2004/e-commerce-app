export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
};
