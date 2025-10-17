import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import product from "../../assets/images/product.png";

const OrderItemsTable = () => {
  // تعریف مقادیر فعلی برای نمایش موقت دیتاها
  const checkoutItems = [
    {
      id: 1,
      image: "../../assets/images/product.png",
      name: "Apple iPhone 14 Pro",
      quantity: 1,
      price: 999.0,
    },
    {
      id: 2,
      image: "/assets/images/product.png",
      name: "Apple MacBook Air M2",
      quantity: 1,
      price: 999.0,
    },
    {
      id: 3,
      image: "/assets/images/product.png",
      name: "Apple iPad Pro 12.9-inch",
      quantity: 1,
      price: 999.0,
    },
  ];

  return (
    <div>
      <Table className="border text-center">
        <TableHeader>
          <TableRow>
            <TableHead className="px-2 py-3 text-right">عکس</TableHead>
            <TableHead className="px-1 py-3 text-right">نام محصول</TableHead>
            <TableHead className="px-2 py-3 text-center">تعداد</TableHead>
            <TableHead className="px-2 py-3 text-center">قیمت</TableHead>
            <TableHead className="px-2 py-3 text-center">قیمت نهایی</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {checkoutItems.map((item) => (
            <TableRow key={item.id} className="border-none">
              <TableCell className="px-3 py-3 text-right">
                <img
                  src={item.image}
                  alt="Product"
                  className="inline-block h-12 w-12 object-contain"
                />
              </TableCell>
              <TableCell className="px-1 py-3 text-right">{item.name}</TableCell>
              <TableCell className="px-3 py-3 text-center">{item.quantity}</TableCell>
              <TableCell className="px-3 py-3 text-center">${item.price.toFixed(2)}</TableCell>
              <TableCell className="px-3 py-3 text-center">
                {(item.price * item.quantity).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderItemsTable;
