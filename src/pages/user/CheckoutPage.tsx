import OrderSummaryCard from "@/components/OrderSummaryCard";
import { Button } from "@/components/ui/button";
import OrderItemsTable from "../../components/OrderItemsTable";

const CheckoutPage = () => {
  return (
    <div className="m-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <OrderItemsTable></OrderItemsTable>
      </div>
      <div className="lg:col-span-1">
        <OrderSummaryCard />
        <Button className="w-full rounded-full bg-[var(--primary)] py-4 text-lg font-medium text-[var(--background)] transition-all duration-300 ease-in-out hover:bg-[var(--primary)]">
          پرداخت
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPage;
