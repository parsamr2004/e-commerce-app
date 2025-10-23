import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import OrderItemsTable from "@/components/OrderItemsTable";
import OrderSummaryCard from "@/components/OrderSummaryCard";
import useCartStore from "@/stores/use-cart-store";
import { useShippingStore } from "@/stores/use-Shipping-Info-Store.ts";
import useUser from "@/hooks/use-user";
import { useState } from "react";
import useMakeOrderPaid from "@/hooks/use-paid-order";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

const TAX_RATE = 0.2;
const SHIPPING_COST = 0;

const CheckoutPage = () => {
  const { cartItems } = useCartStore();
  const { shippingData } = useShippingStore();
  const { data: user } = useUser();
  const [params] = useSearchParams();
  const orderId = params.get("id");

  const [isPaid, setIsPaid] = useState(false);
  const { mutate: mutatePaid, isPending: isPaying } = useMakeOrderPaid();
  const queryClient = useQueryClient();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = totalPrice * TAX_RATE;
  const totalAmount = totalPrice + tax + SHIPPING_COST;

  const formattedOrderId = orderId ? `${orderId.slice(0, 4)}` : "";
  const handlePayment = () => {
    if (isPaying || isPaid) return;
    mutatePaid(orderId!, {
      onSuccess: () => {
        setIsPaid(true);
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        toast.success(
          `پرداخت با موفقیت انجام شد! سفارش شما با شناسه ${formattedOrderId} ثبت گردید.`
        );
      },
      onError: () => {
        toast.error("پرداخت با خطا مواجه شد.");
      },
    });
  };

  return (
    <div className="m-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <OrderItemsTable items={cartItems} />
      </div>
      <div className="lg:col-span-1">
        <OrderSummaryCard
          user={user}
          shippingData={shippingData}
          totalPrice={totalPrice}
          tax={tax}
          shippingCost={SHIPPING_COST}
          totalAmount={totalAmount}
        />
        <div className="mt-6">
          <Button
            className="w-full rounded-full bg-[var(--primary)] py-4 text-lg font-medium text-[var(--background)]"
            onClick={handlePayment}
            disabled={isPaying || isPaid}
          >
            {isPaying ? "در حال پردازش..." : isPaid ? "پرداخت شده" : "پرداخت"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
