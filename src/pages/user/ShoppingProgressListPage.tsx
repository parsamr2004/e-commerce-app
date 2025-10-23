import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import product from "../../assets/images/product.png";
import { useShippingStore } from "@/stores/use-Shipping-Info-Store.ts";
import useOrderMutation from "@/hooks/use-Order-Mutation";
import useCartStore from "@/stores/use-cart-store";
import { useNavigate } from "react-router";
import type { CreateOrderPayload } from "@/types/order.types";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const TAX_RATE = 0.2;
const SHIPPING_COST = 0;

const ShoppingProgressTablePage = () => {
  const { mutate: createOrder } = useOrderMutation();
  const { shippingData, clearShippingData } = useShippingStore();
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
        clearShippingData();
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        toast.success("سفارش با موفقیت ثبت شد");
        navigate(`/checkout?id=${data._id}`);
      },
      onError: () => {
        toast.error(" مجدد امتحان کنید");
      },
    });
  };

  const PriceSummaryItem = ({ label, value }: { label: string; value: number }) => (
    <div className="flex justify-between text-sm">
      <p>{label}</p>
      <p className="text-[var(--foreground)] dark:text-[var(--foreground)]">
        {value.toLocaleString()} تومان
      </p>
    </div>
  );

  const OrderPriceFromCart = () => {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = totalPrice * TAX_RATE;
    const totalAmount = totalPrice + tax + SHIPPING_COST;

    return (
      <div className="flex flex-col gap-1.5 text-[var(--muted-foreground)] dark:text-[var(--muted-foreground)]">
        <PriceSummaryItem label="قیمت محصولات :" value={totalPrice} />
        <PriceSummaryItem label="مالیات :" value={tax} />
        <PriceSummaryItem label="هزینه ارسال :" value={SHIPPING_COST} />
        <PriceSummaryItem label="مبلغ نهایی :" value={totalAmount} />
      </div>
    );
  };

  return (
    <div className="flex w-full flex-col px-4">
      <div dir="rtl" className="mt-12 w-full overflow-auto">
        <Table className="mt-8 w-full text-center">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-3 text-right">عکس</TableHead>
              <TableHead className="px-4 py-3 text-right">نام محصول</TableHead>
              <TableHead className="px-4 py-3 text-center">تعداد</TableHead>
              <TableHead className="px-4 py-3 text-center">قیمت</TableHead>
              <TableHead className="px-4 py-3 text-center">قیمت نهایی</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="px-4 py-3 text-right">
                  <img
                    src={item.image || product}
                    alt={item.name}
                    className="inline-block h-16 w-16 object-contain"
                  />
                </TableCell>
                <TableCell className="px-4 py-3 text-right">{item.name}</TableCell>
                <TableCell className="px-4 py-3 text-center">{item.countInBasket}</TableCell>
                <TableCell className="px-4 py-3 text-center">
                  {item.price.toLocaleString()} تومان
                </TableCell>
                <TableCell className="px-4 py-3 text-center">
                  {(item.price * item.quantity).toLocaleString()} تومان
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <h1 className="mt-6 mb-4 text-lg font-bold">خلاصه خرید</h1>

      <div className="grid w-full grid-cols-1 gap-6 rounded-2xl bg-[var(--muted)] p-6 text-right text-sm md:grid-cols-3 dark:bg-neutral-900">
        <div>
          <h3 className="mb-2 font-semibold">روش پرداخت</h3>
          <p className="dark:[var(--muted-foreground)] text-[var(--muted-foreground)]">
            {shippingData.paymentMethod}
          </p>
        </div>

        <div>
          <h3 className="mb-2 font-semibold">آدرس دریافت</h3>
          <p className="text-[var(--muted-foreground)] dark:text-[var(--muted-foreground)]">
            {shippingData.address}
          </p>
        </div>

        <OrderPriceFromCart />
      </div>

      <div className="mt-6 w-full">
        <Button
          onClick={handleSubmitOrder}
          className="w-full rounded-full py-6 text-lg font-medium transition-all duration-300 ease-in-out"
        >
          ثبت سفارش
        </Button>
      </div>
    </div>
  );
};

export default ShoppingProgressTablePage;
