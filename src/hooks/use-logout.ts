import { axiosInstance } from "@/lib/utils";
import useAuthStore from "@/stores/use-auth-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const reset = useAuthStore((state) => state.reset);

  return useMutation({
    mutationFn: () => axiosInstance.post("/users/logout", {}, { withCredentials: true }),
    onSuccess() {
      toast.success("خروج با موفقیت انجام شد");

      queryClient.invalidateQueries({ queryKey: ["user"] });

      reset();

      navigate("/");
    },
    onError() {
      toast.error("خروج ناموفق");
    },
  });
};

export default useLogout;
