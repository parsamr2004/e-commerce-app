import { axiosInstance } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const useGetSingleProduct = (id?: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => axiosInstance.get(`/products/${id}`).then((res) => res.data),
    enabled: !!id, // ✅ فقط وقتی id هست اجرا کن
    retry: 1, // 🔄 در صورت خطا فقط یک بار تلاش مجدد
  });
};

export default useGetSingleProduct;
