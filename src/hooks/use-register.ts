import { axiosInstance } from "@/lib/utils";
import type { RegisterPayload, RegisterResponse } from "@/types/register.model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) =>
      axiosInstance
        .post<RegisterPayload, AxiosResponse<RegisterResponse>>("/users", payload)
        .then((res) => res.data),
    onSuccess(data) {
      toast.success("ثبت نام با موفقیت انجام شد");
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      navigate("/");

      localStorage.setItem("isAdmin", JSON.stringify(data.isAdmin));
    },
    onError() {
      toast.error("ثبت نام ناموفق");
    },
  });
};

export default useRegister;
