import { axiosInstance } from "@/lib/utils";
import type { ProductModel } from "@/types/product.model";
import { useQuery } from "@tanstack/react-query";

const useGetSingleProduct = (id?: string) => {
  return useQuery<ProductModel>({
    queryKey: ["product", id],
    queryFn: () => axiosInstance.get(`/products/${id}`).then((res) => res.data),
    enabled: !!id, 
    retry: 1, 
  });
};

export default useGetSingleProduct;
