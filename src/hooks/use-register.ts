import { axiosInstance } from "@/lib/utils";
import useAuthStore from "@/stores/use-auth-store";
import type { AuthResponseModel, RegisterPayloadModel } from "@/types/login.model";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useRegister = () => {
  const navigate = useNavigate();
  const { setIsAdmin, setId, setUserName, setEmail } = useAuthStore();

  return useMutation({
    mutationFn: async (payload: RegisterPayloadModel) => {
      const res = await axiosInstance.post<RegisterPayloadModel, AxiosResponse<AuthResponseModel>>(
        '/users',
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
      toast.success('خوش آمدید');
    },
    onError: () => {
      toast.error('ثبت نام ناموفق');
    },
  });
};

export default useRegister;
