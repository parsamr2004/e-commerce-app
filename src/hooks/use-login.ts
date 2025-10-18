import { axiosInstance } from "@/lib/utils";
import type { LoginPayload, LoginResponse } from "@/types/login.model";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router";

const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      axiosInstance
        .post<LoginPayload, AxiosResponse<LoginResponse>>("/users/auth", payload)
        .then((res) => res.data),
    onSuccess(data) {
      navigate("/");
      localStorage.setItem("id", data._id);
      localStorage.setItem("isAdmin", JSON.stringify(data.isAdmin));
    },
  });
};

export default useLogin;
