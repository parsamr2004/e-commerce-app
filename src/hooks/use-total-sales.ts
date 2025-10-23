import { axiosInstance } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const useTotalSales = () => {
  return useQuery({
    queryKey: ["total-sales"],
    queryFn: () =>
      axiosInstance.get("/orders/total-sales-by-date").then((response) => response.data),
  });
};
export default useTotalSales;
