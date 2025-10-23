import { axiosInstance } from "@/lib/utils";
import type { UserOrder } from "@/types/order.types";
import { useQuery } from "@tanstack/react-query";

const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await axiosInstance.get<UserOrder[]>("/orders/mine");
      return response.data;
    },
  });
};

export default useGetOrders;
