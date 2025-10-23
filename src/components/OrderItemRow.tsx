import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { OrderRowModel } from "@/types/order.types";
import usePersianNumbers from "@/hooks/use-numbers-persian";
import { useNavigate } from "react-router-dom";
import { persianDateFormat } from "@/lib/utils";
import useMakeOrderDelivered from "@/hooks/use-delivered-order";
import useMakeOrderPaid from "@/hooks/use-paid-order";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type MutateHandler = (
  id: string,
  options?: {
    onSuccess?: () => void;
    onError?: () => void;
  }
) => void;

interface OrderRowItemProps {
  order: OrderRowModel;
  isAdmin: boolean;
}

const OrderRowItem = ({ order, isAdmin }: OrderRowItemProps) => {
  const toPersianNumber = usePersianNumbers();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [paid, setPaid] = useState(order.isPaid);
  const [delivered, setDelivered] = useState(order.isDelivered);

  const { mutate: markAsPaid, isPending: paying } = useMakeOrderPaid();
  const { mutate: markAsDelivered, isPending: delivering } = useMakeOrderDelivered();

  const handleStatusChange = (
    id: string,
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    mutateFn: MutateHandler,
    isPending: boolean,
    currentState: boolean,
    successMessage: string
  ) => {
    if (currentState || isPending) return;

    mutateFn(id, {
      onSuccess: () => {
        setState(true);
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        toast.success(successMessage);
      },
      onError: () => toast.error("تغییر وضعیت با خطا مواجه شد"),
    });
  };

  const createdAt = persianDateFormat(order.createdAt);
  const totalWithTax = (order.price + order.price * 0.2) * order.qty;

  return (
    <TableRow className="border-none">
      <TableCell className="p-2 text-center">
        <img src={order.image} alt={order.name} className="mx-auto h-10 w-10 rounded-md" />
      </TableCell>

      <TableCell className="text-center">{order.name}</TableCell>
      <TableCell className="text-center">{createdAt}</TableCell>

      {isAdmin && <TableCell className="text-center">{order.user}</TableCell>}

      <TableCell className="text-center">
        {toPersianNumber(totalWithTax.toLocaleString())}
      </TableCell>

      <TableCell className="text-center">
        <Badge
          className={`${
            paid ? "bg-[var(--chart-2)]" : "cursor-pointer bg-[var(--destructive)] text-white"
          }`}
          onClick={() =>
            handleStatusChange(
              order._id,
              setPaid,
              markAsPaid,
              paying,
              paid,
              "پرداخت با موفقیت انجام شد"
            )
          }
        >
          {paid ? "پرداخت شده" : "پرداخت نشده"}
        </Badge>
      </TableCell>

      <TableCell className="text-center">
        <Badge
          className={`${
            delivered ? "bg-[var(--chart-2)]" : "bg-[var(--destructive)]"
          } cursor-pointer text-white`}
          onClick={() =>
            handleStatusChange(
              order._id,
              setDelivered,
              markAsDelivered,
              delivering,
              delivered,
              "ارسال سفارش با موفقیت انجام شد"
            )
          }
        >
          {delivered ? "ارسال شده" : "ارسال نشده"}
        </Badge>
      </TableCell>

      <TableCell className="text-center">
        <Button
          onClick={() => navigate(`/orders/${order._id}`)}
          variant="secondary"
          size="sm"
          className="bg-[var(--primary)] text-white hover:bg-[var(--ring)]"
        >
          جزئیات
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default OrderRowItem;
