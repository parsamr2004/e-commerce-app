import { axiosInstance } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types/product.model.ts";

const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => axiosInstance.get("/products/allproducts").then((res) => res.data),
  });
};

export default useProducts;
