import { axiosInstance } from "@/lib/utils";
import type { CreateReviewPayload, ReviewResponse } from "@/types/payload.model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

const useSubmitReview = (productId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReviewPayload) =>
      axiosInstance
        .post<
          CreateReviewPayload,
          AxiosResponse<ReviewResponse>
        >(`/products/${productId}/reviews`, payload)
        .then((res) => res.data),
    onSuccess() {
      toast.success("✅ نظر شما با موفقیت ثبت شد");
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
    },
    onError() {
      toast.error("ثبت نظر ناموفق بود");
    },
  });
};
export default useSubmitReview;
