export type ProfilePayload = {
  username: string;
  email: string;
  password: string;
};

export type ProfileResponse = {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

export type ErrorMessage = {
  message: string;
};
