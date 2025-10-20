import { axiosInstance } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const useGetAllCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: () => axiosInstance.get("/users").then((response) => response.data),
  });
};
export default useGetAllCustomers;
