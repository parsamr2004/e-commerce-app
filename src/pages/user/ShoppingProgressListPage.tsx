import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import product from "../../assets/images/product.png";
import { useShippingStore } from "@/stores/use-Shipping-Info-Store.ts";
import useOrderMutation from "@/hooks/use-Order-Mutation";
import useCartStore from "@/stores/use-cart-store";
import { useNavigate } from "react-router-dom";
import type { CreateOrderPayload } from "@/types/order.types";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const TAX_RATE = 0.2;
const SHIPPING_COST = 0;

const ShoppingProgressTablePage = () => {
  const { mutate: createOrder } = useOrderMutation();
  const { shippingData } = useShippingStore();
  const { cartItems } = useCartStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmitOrder = () => {
    const payload: CreateOrderPayload = {
      orderItems: cartItems.map((item) => ({
        _id: item._id,
        name: item.name,
        qty: item.quantity,
      })),
      paymentMethod: shippingData.paymentMethod,
      shippingAddress: {
        address: shippingData.address,
        city: shippingData.city,
        postalCode: shippingData.postalCode,
      },
    };

    createOrder(payload, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        toast.success("سفارش با موفقیت ثبت شد");
        navigate(`/checkout?id=${data._id}`);
      },
      onError: () => {
        toast.error("مجدد امتحان کنید");
      },
    });
  };

  const PriceSummaryItem = ({ label, value }: { label: string; value: number }) => (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">
        {Math.round(value).toLocaleString()} تومان
      </span>
    </div>
  );

  const OrderPriceFromCart = () => {
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0
    );
    const tax = totalPrice * TAX_RATE;
    const totalAmount = totalPrice + tax + SHIPPING_COST;

    return (
      <div className="flex flex-col gap-1.5">
        <PriceSummaryItem label="قیمت محصولات :" value={totalPrice} />
        <PriceSummaryItem label="مالیات :" value={tax} />
        <PriceSummaryItem label="هزینه ارسال :" value={SHIPPING_COST} />
        <div className="mt-1 border-t pt-2">
          <PriceSummaryItem label="مبلغ نهایی :" value={totalAmount} />
        </div>
      </div>
    );
  };

  return (
    <section
      className="mx-auto w-full max-w-6xl px-3 py-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      <div className="rounded-2xl border-0 bg-transparent p-0 sm:border sm:bg-card sm:p-5">
        {/* Desktop / Tablet table */}
        <div className="hidden md:block">
          <Table className="w-full text-center">
            <TableHeader>
              <TableRow>
                <TableHead className="px-3 py-3 text-right">عکس</TableHead>
                <TableHead className="px-3 py-3 text-right">نام محصول</TableHead>
                <TableHead className="px-3 py-3 text-center">تعداد</TableHead>
                <TableHead className="px-3 py-3 text-center">قیمت</TableHead>
                <TableHead className="px-3 py-3 text-center">قیمت نهایی</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item._id} className="align-middle">
                  <TableCell className="px-3 py-3 text-right">
                    <img
                      src={item.image || product}
                      alt={item.name}
                      className="inline-block h-16 w-16 rounded-md object-contain"
                    />
                  </TableCell>
                  <TableCell className="max-w-[420px] px-3 py-3 text-right">
                    <span className="line-clamp-2 break-words">{item.name}</span>
                  </TableCell>
                  <TableCell className="px-3 py-3 text-center">{item.quantity}</TableCell>
                  <TableCell className="px-3 py-3 text-center">
                    {Math.round(item.price).toLocaleString()} تومان
                  </TableCell>
                  <TableCell className="px-3 py-3 text-center">
                    {Math.round((item.price || 0) * (item.quantity || 0)).toLocaleString()} تومان
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile list (no heavy borders/padding, no horizontal scroll) */}
        <div className="md:hidden">
          <div className="divide-y">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-[64px_1fr] items-center gap-3 py-3"
              >
                <div className="h-16 w-16 overflow-hidden rounded-lg bg-card">
                  <img
                    src={item.image || product}
                    alt={item.name}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="line-clamp-2 break-words text-sm font-medium">{item.name}</p>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                    <span>تعداد: {item.quantity}</span>
                    <span>قیمت: {Math.round(item.price).toLocaleString()} تومان</span>
                    <span className="col-span-2">
                      نهایی: {Math.round((item.price || 0) * (item.quantity || 0)).toLocaleString()} تومان
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="mt-5 mb-3 text-right text-base font-bold sm:mt-6 sm:mb-4 sm:text-lg">
          خلاصه خرید
        </h2>

        <div className="grid grid-cols-1 gap-3 rounded-2xl border-0 bg-transparent p-0 sm:grid-cols-2 sm:gap-4 sm:border sm:bg-muted/40 sm:p-4 lg:grid-cols-3">
          <div className="rounded-xl border-0 bg-transparent p-0 sm:border sm:bg-card sm:p-4">
            <h3 className="mb-1 text-sm font-semibold sm:mb-2 sm:text-base">روش پرداخت</h3>
            <p className="text-sm text-muted-foreground sm:text-base">
              {shippingData.paymentMethod || "—"}
            </p>
          </div>

          <div className="rounded-xl border-0 bg-transparent p-0 sm:border sm:bg-card sm:p-4">
            <h3 className="mb-1 text-sm font-semibold sm:mb-2 sm:text-base">آدرس دریافت</h3>
            <div className="space-y-0.5 text-sm text-muted-foreground sm:space-y-1 sm:text-base">
              <p className="break-words">{shippingData.address || "—"}</p>
              <p className="break-words">
                {shippingData.city ? `${shippingData.city}` : "—"}
                {shippingData.postalCode ? `، ${shippingData.postalCode}` : ""}
              </p>
            </div>
          </div>

          <div className="rounded-xl border-0 bg-transparent p-0 sm:border sm:bg-card sm:p-4">
            <h3 className="mb-1 text-sm font-semibold sm:mb-2 sm:text-base">مبالغ</h3>
            <OrderPriceFromCart />
          </div>
        </div>

        <div className="mt-5 sm:mt-6">
          <Button
            className="w-full rounded-xl py-4 text-base font-semibold sm:py-5 sm:text-lg"
            onClick={handleSubmitOrder}
          >
            ثبت سفارش
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ShoppingProgressTablePage;



