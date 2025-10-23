import { axiosInstance } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axiosInstance.post("/users/logout").then((res) => res.data),
    onSuccess() {
      toast.success("خروج با موفقیت انجام شد");
      queryClient.removeQueries({ queryKey: ["user-profile"] });
      navigate("/");

      localStorage.removeItem("isAdmin");
    },
    onError() {
      toast.error("خروج ناموفق");
    },
  });
};

export default useLogout;

