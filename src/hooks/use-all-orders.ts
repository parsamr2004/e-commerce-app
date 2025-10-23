import { axiosInstance } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const useAllTotalOrders = () => {
  return useQuery({
    queryKey: ["totalCustomers"],
    queryFn: () => axiosInstance.get("/orders").then((response) => response.data),
  });
};
export default useAllTotalOrders;
