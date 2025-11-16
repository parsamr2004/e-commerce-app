import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import OrderItemsTable from "@/components/OrderItemsTable";
import OrderSummaryCard from "@/components/OrderSummaryCard";
import useCartStore from "@/stores/use-cart-store";
import { useShippingStore } from "@/stores/use-Shipping-Info-Store.ts";
import useUser from "@/hooks/use-user";
// import { useState } from "react";
import useMakeOrderPaid from "@/hooks/use-paid-order";
// import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
const TAX_RATE = 0.2;
const SHIPPING_COST = 0;

const CheckoutPage = () => {
  const { cartItems, deleteItems } = useCartStore();
  const { shippingData } = useShippingStore();
  const { data: user } = useUser();
  const [params] = useSearchParams();
  const orderId = params.get("id") || "";
  console.log(orderId);
  const navigate = useNavigate();

  // const [isPaid, setIsPaid] = useState(false);
  // const queryClient = useQueryClient();
  const { data: order, isPending: isPaying } = useMakeOrderPaid(orderId);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );
  const tax = totalPrice * TAX_RATE;
  const totalAmount = totalPrice + tax + SHIPPING_COST;

  const formattedOrderId = orderId ? orderId.slice(0, 4) : "";

  const handlePayment = () => {
    if (!orderId) {
      toast.error("شناسه سفارش یافت نشد.");
      return;
    }

    if (isPaying) {
      return <p className="text-center mt-10">در حال بارگذاری سفارش...</p>;
    }
    // if (isPaying || isPaid) return;

    // mutatePaid(orderId, {
    //   onSuccess: () => {
    //     setIsPaid(true);
    //     queryClient.invalidateQueries({ queryKey: ["orders"] });
    //     toast.success(`پرداخت با موفقیت انجام شد! سفارش شما با شناسه ${formattedOrderId} ثبت گردید.`);
    //     deleteItems();
    //     navigate("/orders");
    //   },
    //   onError: () => {
    //     toast.error("پرداخت با خطا مواجه شد.");
    //   },
    // });

    if (order?._id) {
      toast.success("پرداخت با موفقیت انجام شد");
      deleteItems();

      setTimeout(() => {
        navigate("/orders");
      }, 500);
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8" dir="rtl">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-base font-bold sm:text-lg">نهایی‌سازی خرید</h1>
        {orderId && (
          <span className="text-muted-foreground text-xs">شناسه سفارش: {formattedOrderId}</span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="bg-card rounded-2xl border p-3 sm:p-5">
            <OrderItemsTable items={cartItems} />
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-card rounded-2xl border p-4 sm:p-5 lg:sticky lg:top-6">
            <OrderSummaryCard
              user={ user? { username: user?._id, email: user?.email }: { username: "", email: "" }}
              shippingData={shippingData}
              totalPrice={totalPrice}
              tax={tax}
              shippingCost={SHIPPING_COST}
              totalAmount={totalAmount}
            />
            <div className="mt-4">
              <Button
                className="w-full rounded-full py-4 text-base sm:text-lg"
                onClick={handlePayment}
                disabled={isPaying || cartItems.length === 0}
              >
                {isPaying ? "در حال پردازش...": "پرداخت"}
              </Button>
              <p className="text-muted-foreground mt-2 text-center text-xs">
                با پرداخت، شرایط و قوانین را می‌پذیرید
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
