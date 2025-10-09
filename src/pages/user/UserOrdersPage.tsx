import Layout from "@/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import product from "../../assets/images/product.png";
import { Badge } from "@/components/ui/badge";

const UserOrdersPage = () => {
  return (
    <Layout>
      <div className="flex flex-col  px-15">
        <div dir="rtl" className="w-full  overflow-auto px-15">
          <Table className="mt-10 w-full text-center text-sm ">
            <TableHeader>
              <TableRow>
                <TableHead className="text-right px-3 py-3 ">عکس</TableHead>
                <TableHead className="text-right px-1 py-3  ">
                  نام محصول
                </TableHead>

                <TableHead className="px-3 py-3 text-center ">تاریخ</TableHead>
                <TableHead className="px-3 py-3 text-center ">
                  قیمت نهایی
                </TableHead>
                <TableHead className="px-3 py-3 text-center ">پرداخت</TableHead>
                <TableHead className="px-3 py-3 text-center ">ارسال</TableHead>
                <TableHead className="px-3 py-3 text-center ">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-right px-3 py-3 ">
                  <img
                    src={product}
                    alt="Product"
                    className="inline-block w-8 h-8 object-contain"
                  />
                </TableCell>

                <TableCell className="px-1 py-3 text-right ">
                  Apple iPhone 14 Pro
                </TableCell>
                <TableCell className="px-3 py-3 text-center ">
                  ۱۴۰۱/۰۴/۳۱
                </TableCell>
                <TableCell className="px-3 py-3 text-center ">
                  $ 999.00
                </TableCell>
                <TableCell>
                  <Badge className="bg-[var(--chart-2)] py-0.5 px-1.5">
                    پرداخت شده
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-[var(--chart-1)] py-0.5 px-1.5">
                    درحال ارسال
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button className="bg-[var(--primary)] text-xs py-1 px-2 h-auto">
                    جزییات
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-right px-3 py-3 ">
                  <img
                    src={product}
                    alt="Product"
                    className="inline-block w-8 h-8 object-contain"
                  />
                </TableCell>

                <TableCell className="px-1 py-3 text-right ">
                  Apple MacBook Air M2
                </TableCell>
                <TableCell className="px-3 py-3 text-center ">
                  ۱۴۰۱/۰۴/۳۱
                </TableCell>
                <TableCell className="px-3 py-3 text-center ">
                  $ 999.00
                </TableCell>
                <TableCell>
                  <Badge className="bg-[var(--chart-5)] py-0.5 px-1.5">
                    پرداخت نشده
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-[var(--chart-2)] py-0.5 px-1.5">
                    ارسال شده
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button className="bg-[var(--primary)] text-xs py-1 px-2 h-auto">
                    جزییات
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-right px-3 py-3 ">
                  <img
                    src={product}
                    alt="Product"
                    className="inline-block w-8 h-8 object-contain "
                  />
                </TableCell>

                <TableCell className="px-1 py-3 text-right ">
                  Apple iPad Pro 12.9-inch
                </TableCell>
                <TableCell className="px-3 py-3 text-center ">
                  ۱۴۰۱/۰۴/۳۱
                </TableCell>
                <TableCell className="px-3 py-3 text-center ">
                  $ 999.00
                </TableCell>
                <TableCell>
                  <Badge className="bg-[var(--ring)] py-0.5 px-1.5">
                    پرداخت نشده
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-[var(--ring)] py-0.5 px-1.5">
                    ارسال نشده
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button className="bg-[var(--primary)] text-xs py-1 px-2 h-auto">
                    جزییات
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default UserOrdersPage;
