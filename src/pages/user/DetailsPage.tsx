import { useParams } from "react-router-dom";
import useGetOrderDetail from "@/hooks/use-get-order-detail";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DetailsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: orderDetail, isLoading, error } = useGetOrderDetail(orderId);
  console.log(orderId);
  if (isLoading) {
    return <p className="text-center">در حال بارگذاری...</p>;
  }

  if (error) {
    return <p className="text-center">خطا در دریافت اطلاعات سفارش</p>;
  }

  if (!orderDetail) {
    return <p className="text-center">سفارشی با این شناسه پیدا نشد.</p>;
  }

  const totalPrice = orderDetail.orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = totalPrice * 0.2;
  const shippingCost = 0;
  const totalAmount = totalPrice + tax + shippingCost;
  console.log(orderDetail);
  return (
    <div className="m-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Table dir="rtl" className="mt-8 w-full border text-center">
          <TableHeader>
            <TableRow>
              <TableHead className="px-2 py-3 text-center">عکس</TableHead>
              <TableHead className="px-2 py-3 text-center">نام محصول</TableHead>
              <TableHead className="px-2 py-3 text-center">تعداد</TableHead>
              <TableHead className="px-2 py-3 text-center">قیمت</TableHead>
              <TableHead className="px-2 py-3 text-center">قیمت نهایی</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderDetail.orderItems.map((item) => (
              <TableRow key={item._id} className="border-none">
                <TableCell className="px-2 py-3 text-center">
                  <img
                    src={`https://qbc9.liara.run/uploads/${item.image}`}
                    alt={item.name}
                    className="inline-block h-16 w-16 object-contain"
                  />
                </TableCell>
                <TableCell className="px-2 py-3 text-center">{item.name}</TableCell>
                <TableCell className="px-2 py-3 text-center">{item.qty}</TableCell>
                <TableCell className="px-2 py-3 text-center">
                  {item.price.toLocaleString()} تومان
                </TableCell>
                <TableCell className="px-2 py-3 text-center">
                  {(item.price * item.qty).toLocaleString()} تومان
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">خلاصه سفارش</h2>
        <div className="">
          <div className="flex gap-2 pb-2">
            <p className="text-primary">نام:</p>
            <p>{orderDetail.user?.username}</p>
          </div>
          <div className="flex gap-2 pb-2">
            <p className="text-primary">ایمیل:</p>
            <p>{orderDetail.user?.email}</p>
          </div>
        </div>

        <div className="flex gap-2 pb-2">
          <h3 className="text-primary">آدرس:</h3>
          <p>
            {orderDetail.shippingAddress?.city}
            <span>&nbsp;&nbsp;</span>
            {orderDetail.shippingAddress?.address}
          </p>
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
    </div>
  );
};

export default DetailsPage;
