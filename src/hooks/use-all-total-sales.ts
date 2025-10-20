import { axiosInstance } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const useAllTotalSales = () => {
  return useQuery({
    queryKey: ["totalSales"],
    queryFn: () => axiosInstance.get("/orders/total-sales").then((response) => response.data),
  });
};
export default useAllTotalSales;
