import OrderItemsTable from "../../components/OrderItemsTable";
import OrderSummaryCard from "@/components/OrderSummaryCard";

const DetailsPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 m-8">
      <div className="lg:col-span-2">
        <OrderItemsTable></OrderItemsTable>
      </div>
      <div className="lg:col-span-1">
        <OrderSummaryCard />
      </div>
    </div>
  );
};

export default DetailsPage;
