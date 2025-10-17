import OrderSummaryCard from "@/components/OrderSummaryCard";
import OrderItemsTable from "../../components/OrderItemsTable";

const DetailsPage = () => {
  return (
    <div className="m-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
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
