import { axiosInstance } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axiosInstance.post("/users/logout", {}, { withCredentials: true }),
    onSuccess() {
      toast.success("خروج با موفقیت انجام شد");

      queryClient.invalidateQueries({ queryKey: ["user"] });

      localStorage.removeItem("id");
      localStorage.removeItem("isAdmin");

      navigate("/");
    },
    onError() {
      toast.error("خروج ناموفق");
    },
  });
};

export default useLogout;
