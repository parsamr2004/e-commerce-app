import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/utils";
import type { Product } from "@/types/product.model";

export const useFilteredProducts = (filters: { categories: string[]; price: number[] }) => {
  return useQuery<Product[]>({
    queryKey: ["products", filters],
    queryFn: async () => {
      const { data } = await axiosInstance.post("/products/filtered", filters);
      return data;
    },
  });
};
