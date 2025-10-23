import { axiosInstance } from "@/lib/utils";
import type { UserOrder } from "@/types/order.types";
import { useQuery } from "@tanstack/react-query";

const useGetOrderDetail = (orderId: string) => {
  return useQuery({
    queryKey: ["orderDetail", orderId],
    queryFn: async () => {
      const response = await axiosInstance.get<UserOrder>(`/orders/${orderId}`);
      return response.data;
    },
    enabled: !!orderId,
  });
};

export default useGetOrderDetail;
