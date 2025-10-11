import { Badge } from "@/components/ui/badge";
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

const UserOrdersPage = () => {
  return (
    <div className="flex flex-col px-15">
      <div dir="rtl" className="w-full overflow-auto px-15">
        <Table className="mt-10 w-full text-center text-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="px-3 py-3 text-right">عکس</TableHead>
              <TableHead className="px-1 py-3 text-right">نام محصول</TableHead>

              <TableHead className="px-3 py-3 text-center">تاریخ</TableHead>
              <TableHead className="px-3 py-3 text-center">قیمت نهایی</TableHead>
              <TableHead className="px-3 py-3 text-center">پرداخت</TableHead>
              <TableHead className="px-3 py-3 text-center">ارسال</TableHead>
              <TableHead className="px-3 py-3 text-center">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="px-3 py-3 text-right">
                <img src={product} alt="Product" className="inline-block h-8 w-8 object-contain" />
              </TableCell>

              <TableCell className="px-1 py-3 text-right">Apple iPhone 14 Pro</TableCell>
              <TableCell className="px-3 py-3 text-center">۱۴۰۱/۰۴/۳۱</TableCell>
              <TableCell className="px-3 py-3 text-center">$ 999.00</TableCell>
              <TableCell>
                <Badge className="bg-[var(--chart-2)] px-1.5 py-0.5">پرداخت شده</Badge>
              </TableCell>
              <TableCell>
                <Badge className="bg-[var(--chart-1)] px-1.5 py-0.5">درحال ارسال</Badge>
              </TableCell>
              <TableCell>
                <Button className="h-auto bg-[var(--primary)] px-2 py-1 text-xs">جزییات</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-3 py-3 text-right">
                <img src={product} alt="Product" className="inline-block h-8 w-8 object-contain" />
              </TableCell>

              <TableCell className="px-1 py-3 text-right">Apple MacBook Air M2</TableCell>
              <TableCell className="px-3 py-3 text-center">۱۴۰۱/۰۴/۳۱</TableCell>
              <TableCell className="px-3 py-3 text-center">$ 999.00</TableCell>
              <TableCell>
                <Badge className="bg-[var(--chart-5)] px-1.5 py-0.5">پرداخت نشده</Badge>
              </TableCell>
              <TableCell>
                <Badge className="bg-[var(--chart-2)] px-1.5 py-0.5">ارسال شده</Badge>
              </TableCell>
              <TableCell>
                <Button className="h-auto bg-[var(--primary)] px-2 py-1 text-xs">جزییات</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-3 py-3 text-right">
                <img src={product} alt="Product" className="inline-block h-8 w-8 object-contain" />
              </TableCell>

              <TableCell className="px-1 py-3 text-right">Apple iPad Pro 12.9-inch</TableCell>
              <TableCell className="px-3 py-3 text-center">۱۴۰۱/۰۴/۳۱</TableCell>
              <TableCell className="px-3 py-3 text-center">$ 999.00</TableCell>
              <TableCell>
                <Badge className="bg-[var(--ring)] px-1.5 py-0.5">پرداخت نشده</Badge>
              </TableCell>
              <TableCell>
                <Badge className="bg-[var(--ring)] px-1.5 py-0.5">ارسال نشده</Badge>
              </TableCell>
              <TableCell>
                <Button className="h-auto bg-[var(--primary)] px-2 py-1 text-xs">جزییات</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserOrdersPage;
