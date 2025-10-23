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

type MutateFn = (
  id: string,
  options?: {
    onSuccess?: () => void;
    onError?: () => void;
  }
) => void;

const OrderRow = ({ order, isAdmin }: { order: OrderRowModel; isAdmin: boolean }) => {
  const toPersianNumber = usePersianNumbers();
  const navigate = useNavigate();
  const [isDelivered, setIsDelivered] = useState(order.isDelivered);
  const [isPaid, setIsPaid] = useState(order.isPaid);

  const { mutate: mutateDelivered, isPending: isDelivering } = useMakeOrderDelivered();
  const { mutate: mutatePaid, isPending: isPaying } = useMakeOrderPaid();
  const queryClient = useQueryClient();

  const handleClick = (
    id: string,
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    mutateFn: MutateFn,
    isProcessing: boolean,
    currentState: boolean,
    successMsg: string
  ) => {
    if (currentState || isProcessing) return;

    mutateFn(id, {
      onSuccess: () => {
        setState(true);
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        toast.success(successMsg);
      },
      onError: () => {
        toast.error("تغییر وضعیت با خطا مواجه شد");
      },
    });
  };

  const createdAt = persianDateFormat(order.createdAt);
  const tax = 0.1;

  return (
    <TableRow className="border-none">
      <TableCell className="p-2">
        <div className="flex h-full items-center justify-center">
          <img src={order.image} alt={order.name} className="h-10 w-10 rounded-md" />
        </div>
      </TableCell>

      <TableCell className="mx-auto text-center">{order.name}</TableCell>
      <TableCell className="mx-auto text-center">{createdAt}</TableCell>
      {isAdmin && <TableCell className="mx-auto text-center">{order.user}</TableCell>}
      <TableCell className="mx-auto text-center">
        {toPersianNumber(((order.price + order.price * tax) * order.qty).toLocaleString())}
      </TableCell>
      <TableCell className="mx-auto text-center">
        <Badge
          className={isPaid ? "bg-[#22C55E]" : "cursor-pointer bg-[#B71D18] text-white"}
          onClick={() =>
            handleClick(
              order._id,
              setIsPaid,
              mutatePaid,
              isPaying,
              isPaid,
              "پرداخت با موفقیت انجام شد"
            )
          }
        >
          {isPaid ? "پرداخت شده" : "پرداخت نشده"}
        </Badge>
      </TableCell>
      <TableCell className="mx-auto text-center">
        <Badge
          className={`${isDelivered ? "bg-[#22C55E]" : "bg-[#B71D18]"} cursor-pointer text-white`}
          onClick={() =>
            handleClick(
              order._id,
              setIsDelivered,
              mutateDelivered,
              isDelivering,
              isDelivered,
              "ارسال سفارش با موفقیت انجام شد"
            )
          }
        >
          {isDelivered ? "ارسال شده" : "ارسال نشده"}
        </Badge>
      </TableCell>
      <TableCell className="mx-auto text-center">
        <Button
          onClick={() => navigate(`/orders/${order._id}`)}
          variant="secondary"
          size="sm"
          className="cursor-pointer bg-[#DB2777] text-white hover:bg-[#871849]"
        >
          جزئیات
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default OrderRow;
