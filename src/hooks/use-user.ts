import { axiosInstance } from "@/lib/utils";
import type { User } from "@/types/user.admin";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  return useQuery<User>({
    queryKey: ["user-profile"],
    queryFn: () => axiosInstance.get("/users/profile").then((res) => res.data),
    retry: 1,
  });
};

export default useUser;
