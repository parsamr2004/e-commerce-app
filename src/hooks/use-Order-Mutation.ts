import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { axiosInstance } from "@/lib/utils";
import type { CreateOrderPayload, OrderResponseModel } from "@/types/order.types";

const useOrderMutation = () => {
  return useMutation({
    mutationFn: async (orderData: CreateOrderPayload) => {
      const result = await axiosInstance.post<
        CreateOrderPayload,
        AxiosResponse<OrderResponseModel>
      >("/orders", orderData);
      return result.data;
    },
  });
};

export default useOrderMutation;
