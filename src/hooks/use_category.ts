import { useQuery } from "@tanstack/react-query";
import type { Category } from "@/types/category.model";
import { axiosInstance } from "@/lib/utils";

const useCategory = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => axiosInstance.get("/category/categories").then((res) => res.data),
  });
};
export default useCategory;
