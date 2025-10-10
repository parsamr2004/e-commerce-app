import Layout from "@/Layout";
import OrderItemsTable from "../../components/OrderItemsTable";
import { Button } from "@/components/ui/button";
import OrderSummaryCard from "@/components/OrderSummaryCard";

const CheckoutPage = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 m-8">
        <div className="lg:col-span-2">
          <OrderItemsTable></OrderItemsTable>
        </div>
        <div className="lg:col-span-1">
          <OrderSummaryCard />
          <Button className="w-full bg-[var(--primary)] hover:bg-[var(--primary)] text-[var(--background)] py-4 rounded-full text-lg font-medium transition-all duration-300 ease-in-out">
            پرداخت
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
