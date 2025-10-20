import { axiosInstance } from "@/lib/utils";
import type { Product } from "@/types/product.model";
import { useQuery } from "@tanstack/react-query";

const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => axiosInstance.get("/products/allproducts").then((res) => res.data),
  });
};

export default useProducts;
