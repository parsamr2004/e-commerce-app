import { axiosInstance } from "@/lib/utils";
import type { UserOrderPopulated } from "@/types/order.types";
import { useMutation } from '@tanstack/react-query';

const useGetOrderById = () => {
  return useMutation({
    mutationFn: (id: string) => axiosInstance.get<UserOrderPopulated>(`/orders/${id}`).then((res) => res.data),
  });
};
export default useGetOrderById;

