import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table";
import OrderRow from "@/components/OrderRow";
import useGetOrders from "@/hooks/use-get-orders.ts";

export default function OrdersPage() {
  const { data: orders, isLoading } = useGetOrders();

  if (isLoading) {
    return <p className="mt-10 text-center">در حال بارگذاری...</p>;
  }

  if (!orders?.length) {
    return <p className="mt-10 text-center">سفارشی برای نمایش وجود ندارد.</p>;
  }

  return (
    <Table dir="rtl" className="mx-auto w-[80%]">
      <TableHeader>
        <TableRow className="h-16 border-none">
          <TableHead className="text-center text-lg font-bold">عکس</TableHead>
          <TableHead className="text-center text-lg font-bold">نام محصول</TableHead>
          <TableHead className="text-center text-lg font-bold">تاریخ</TableHead>
          <TableHead className="text-center text-lg font-bold">قیمت نهایی</TableHead>
          <TableHead className="text-center text-lg font-bold">پرداخت</TableHead>
          <TableHead className="text-center text-lg font-bold">ارسال</TableHead>
          <TableHead className="text-center text-lg font-bold">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders &&
          orders?.map((order) =>
            order.orderItems.map((orderItem) => {
              const username =
                typeof order?.user === "string"
                  ? order.user
                  : ((order?.user as { username?: string })?.username ?? "");

              return (
                <OrderRow
                  key={orderItem._id}
                  order={{
                    _id: order._id,
                    image: orderItem.image,
                    name: orderItem.name,
                    createdAt: order.createdAt,
                    user: username,
                    price: orderItem.price,
                    qty: orderItem.qty,
                    isPaid: order.isPaid,
                    isDelivered: order.isDelivered,
                  }}
                  isAdmin={false}
                />
              );
            })
          )}
      </TableBody>
    </Table>
  );
}
