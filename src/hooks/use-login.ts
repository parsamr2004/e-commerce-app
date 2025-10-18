import { axiosInstance } from "@/lib/utils";
import type { LoginPayload, LoginResponse } from "@/types/login.model";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      axiosInstance
        .post<LoginPayload, AxiosResponse<LoginResponse>>("/users/auth", payload)
        .then((res) => res.data),
    onSuccess(data) {
      toast.success("ورود با موفقیت انجام شد");
      navigate("/");
      localStorage.setItem("id", data._id);
      localStorage.setItem("isAdmin", JSON.stringify(data.isAdmin));
    },
    onError() {
      toast.error("ورود ناموفق");
    },
  });
};

export default useLogin;
