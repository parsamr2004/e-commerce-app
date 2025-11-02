import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table";
import OrderItemRow from "@/components/OrderItemRow";
import useGetOrders from "@/hooks/use-get-orders.ts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function OrdersPage() {
  const { data: orders, isLoading } = useGetOrders();

  if (isLoading) {
    return <p className="mt-10 text-center">در حال بارگذاری...</p>;
  }

  if (!orders?.length) {
    return <p className="mt-10 text-center">سفارشی برای نمایش وجود ندارد.</p>;
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8" dir="rtl">
      <div className="hidden md:block">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="h-14">
              <TableHead className="text-center font-bold">عکس</TableHead>
              <TableHead className="text-center font-bold">نام محصول</TableHead>
              <TableHead className="text-center font-bold">تاریخ</TableHead>
              <TableHead className="text-center font-bold">قیمت نهایی</TableHead>
              <TableHead className="text-center font-bold">پرداخت</TableHead>
              <TableHead className="text-center font-bold">ارسال</TableHead>
              <TableHead className="text-center font-bold">عملیات</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders?.map((order) =>
              order.orderItems.map((orderItem) => {
                const username =
                  typeof order?.user === "string"
                    ? order.user
                    : ((order?.user as { username?: string })?.username ?? "");

                return (
                  <OrderItemRow
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
      </div>

      <div className="md:hidden">
        <div className="space-y-3">
          {orders?.map((order) =>
            order.orderItems.map((orderItem) => {
              const created = new Date(order.createdAt).toLocaleDateString("fa-IR");
              const total = Math.round((orderItem.price || 0) * (orderItem.qty || 0)).toLocaleString();

              return (
                <div
                  key={orderItem._id}
                  className="rounded-xl border bg-card p-3"
                >
                  <div className="grid grid-cols-[64px_1fr] items-center gap-3">
                    <div className="h-16 w-16 overflow-hidden rounded-lg bg-muted">
                      <img
                        src={orderItem.image}
                        alt={orderItem.name}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-sm font-medium">{orderItem.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">تاریخ: {created}</p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">تعداد</span>
                      <span className="font-medium">{orderItem.qty}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">قیمت واحد</span>
                      <span className="font-medium">
                        {Math.round(orderItem.price).toLocaleString()} تومان
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center justify-between">
                      <span className="text-muted-foreground">قیمت نهایی</span>
                      <span className="font-semibold">{total} تومان</span>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div
                      className={`rounded-lg px-2 py-1 text-center font-medium ${
                        order.isPaid
                          ? "text-[var(--color-success)] border border-[var(--color-success)]/40 bg-[var(--color-success)]/10"
                          : "text-destructive border border-destructive/40 bg-destructive/10"
                      }`}
                    >
                      {order.isPaid ? "پرداخت شده" : "پرداخت نشده"}
                    </div>
                    <div
                      className={`rounded-lg px-2 py-1 text-center font-medium ${
                        order.isDelivered
                          ? "text-[var(--color-success)] border border-[var(--color-success)]/40 bg-[var(--color-success)]/10"
                          : "text-destructive border border-destructive/40 bg-destructive/10"
                      }`}
                    >
                      {order.isDelivered ? "ارسال شده" : "ارسال نشده"}
                    </div>
                  </div>

                  <div className="mt-3 flex justify-end">
                    <Button asChild variant="outline" size="sm" className="rounded-lg">
                      <Link to={`/orders/${order._id}`}>جزئیات سفارش</Link>
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

