import { axiosInstance } from "@/lib/utils";
import type { Product } from "@/types/product.model";
import { useQuery } from "@tanstack/react-query";

const useGetSingleProduct = (id?: string) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => axiosInstance.get(`/products/${id}`).then((res) => res.data),
    enabled: !!id, 
    retry: 1, 
  });
};

export default useGetSingleProduct;
