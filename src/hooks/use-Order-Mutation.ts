import { useMutation } from "@tanstack/react-query";
import type { CreateOrderPayload, OrderResponseModel } from "@/types/order.types";
import { axiosInstance } from "@/lib/utils";
import type { AxiosResponse } from "axios";

const useOrderMutation = () => {
  return useMutation({
    mutationFn: async (payload: CreateOrderPayload) => {
      const res = await axiosInstance.post<CreateOrderPayload, AxiosResponse<OrderResponseModel>>(
        "/orders",
        payload
      );
      return res.data;
    },
  });
};
export default useOrderMutation;
