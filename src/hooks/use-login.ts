import { axiosInstance } from "@/lib/utils";
import useAuthStore from "@/stores/use-auth-store";
import type { AuthResponseModel, LoginPayloadModel } from "@/types/login.model";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useLogin = () => {
  const navigate = useNavigate();
  const { setIsAdmin, setId, setUserName, setEmail } = useAuthStore();

  return useMutation({
    mutationFn: async (payload: LoginPayloadModel) => {
      const res = await axiosInstance.post<LoginPayloadModel, AxiosResponse<AuthResponseModel>>(
        '/users/auth',
        payload
      );

      setIsAdmin(res.data.isAdmin);
      setId(res.data._id);
      setUserName(res.data.username);
      setEmail(res.data.email);

      return res.data;
    },
    onSuccess: () => {
      navigate('/');
      toast.success('ورود موفق');
    },
    onError() {
      toast.error('ورود ناموفق');
    },
  });
};

export default useLogin;
