import React from "react";
import { Badge } from "@/components/ui/badge";
type OrderSummaryCardProps = {
  user: { username: string; email: string } | null;
  shippingData: { address: string; city: string; postalCode: string; paymentMethod: string };
  totalPrice: number;
  tax: number;
  shippingCost: number;
  totalAmount: number;
};

const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  user,
  shippingData,
  totalPrice,
  tax,
  shippingCost,
  totalAmount,
}) => {
  return (
    <div className="">
      <h2 className="mb-4 text-lg font-semibold">خلاصه سفارش</h2>

      {user && (
        <div className="">
          <div className="flex gap-2 pb-2">
            <p className="text-primary">نام:</p>
            <p>{user.username}</p>
          </div>
          <div className="flex gap-2 pb-2">
            <p className="text-primary">ایمیل:</p>
            <p>{user.email}</p>
          </div>
        </div>
      )}

      <div className="flex gap-2 pb-2">
        <h3 className="text-primary">آدرس:</h3>
        <p>
          {shippingData.city}
          <span>&nbsp;&nbsp;</span>
          {shippingData.address}
        </p>
      </div>

      <div className="flex gap-2 pb-2">
        <h3 className="text-primary">روش پرداخت:</h3>
        <p>{shippingData.paymentMethod}</p>
      </div>

      <Badge variant="secondary" className="w-full justify-start p-2 text-base font-bold">
        Status
      </Badge>

      <div className="m-3 flex flex-col gap-2">
        <h2 className="font-bold">خلاصه خرید</h2>
        <div className="flex justify-between">
          <span>قیمت محصولات:</span> <span>{totalPrice.toLocaleString()} تومان</span>
        </div>
        <div className="flex justify-between">
          <span>مالیات:</span> <span>{tax.toLocaleString()} تومان</span>
        </div>
        <div className="flex justify-between">
          <span>هزینه ارسال:</span> <span>{shippingCost.toLocaleString()} تومان</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>مبلغ نهایی:</span> <span>{totalAmount.toLocaleString()} تومان</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
