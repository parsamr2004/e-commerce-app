import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import product from "@/assets/images/product.png";

type OrderItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type OrderItemsTableProps = {
  items: OrderItem[];
};

const OrderItemsTable: React.FC<OrderItemsTableProps> = ({ items }) => {
  if (items.length === 0) {
    return <p className="text-center">هیچ محصولی در این سفارش وجود ندارد.</p>;
  }
  return (
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
        {items.map((item) => (
          <TableRow key={item._id} className="border-none">
            <TableCell className="px-3 py-3 text-right">
              <img
                src={item.image || product}
                alt={item.name}
                className="inline-block h-12 w-12 object-contain"
              />
            </TableCell>
            <TableCell className="px-1 py-3 text-right">{item.name}</TableCell>
            <TableCell className="px-3 py-3 text-center">{item.quantity}</TableCell>
            <TableCell className="px-3 py-3 text-center">
              {item.price.toLocaleString()} تومان
            </TableCell>
            <TableCell className="px-3 py-3 text-center">
              {(item.price * item.quantity).toLocaleString()} تومان
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderItemsTable;
