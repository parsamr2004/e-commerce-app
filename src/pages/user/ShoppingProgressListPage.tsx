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

const ShoppingProgressTablePage = () => {
  return (
    <div className="flex w-full flex-col px-4">
      <div dir="rtl" className="mt-12 w-full overflow-auto">
        <Table className="mt-8 w-full text-center">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-3 text-right">عکس</TableHead>
              <TableHead className="px-4 py-3 text-right">نام محصول</TableHead>
              <TableHead className="px-4 py-3 text-center">تعداد</TableHead>
              <TableHead className="px-4 py-3 text-center">قیمت</TableHead>
              <TableHead className="px-4 py-3 text-center">قیمت نهایی</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="px-4 py-3 text-right">
                <img
                  src={product}
                  alt="Product"
                  className="inline-block h-16 w-16 object-contain"
                />
              </TableCell>
              <TableCell className="px-4 py-3 text-right">Apple iPhone 14 Pro</TableCell>
              <TableCell className="px-4 py-3 text-center">1</TableCell>
              <TableCell className="px-4 py-3 text-center">$ 999.00</TableCell>
              <TableCell className="px-4 py-3 text-center">999.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-3 text-right">
                <img
                  src={product}
                  alt="Product"
                  className="inline-block h-16 w-16 object-contain"
                />
              </TableCell>
              <TableCell className="px-4 py-3 text-right">Apple MacBook Air M2</TableCell>
              <TableCell className="px-4 py-3 text-center">1</TableCell>
              <TableCell className="px-4 py-3 text-center">$ 999.00</TableCell>
              <TableCell className="px-4 py-3 text-center">999.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-3 text-right">
                <img
                  src={product}
                  alt="Product"
                  className="inline-block h-16 w-16 object-contain"
                />
              </TableCell>
              <TableCell className="px-4 py-3 text-right">Apple iPad Pro 12.9-inch</TableCell>
              <TableCell className="px-4 py-3 text-center">1</TableCell>
              <TableCell className="px-4 py-3 text-center">$ 999.00</TableCell>
              <TableCell className="px-4 py-3 text-center">999.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <h1 className="mt-6 mb-4 text-lg font-bold">خلاصه خرید</h1>
      <div className="grid w-full grid-cols-3 gap-6 rounded-2xl bg-[var(--muted)] p-6 text-right text-sm">
        <div>
          <h3 className="mb-2 font-semibold">روش پرداخت</h3>
          <p>درگاه پرداخت پاسارگاد</p>
        </div>
        <div>
          <h3 className="mb-2 font-semibold">آدرس دریافت</h3>
          <p>تهران، آزادی، نبش کوچه فخری، پلاک ۱۹۳</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span>قیمت محصولات:</span>
            <span>۱۰۰,۰۰۰ تومان</span>
          </div>
          <div className="flex justify-between">
            <span>هزینه ارسال:</span>
            <span>۱۰,۰۰۰ تومان</span>
          </div>
          <div className="flex justify-between">
            <span>مالیات:</span>
            <span>۱۵,۰۰۰ تومان</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>مبلغ نهایی:</span>
            <span>۱۲۵,۰۰۰ تومان</span>
          </div>
        </div>
      </div>

      <div className="mt-6 w-full">
        <Button className="w-full rounded-full bg-[var(--primary)] py-6 text-lg font-medium text-[var(--background)] transition-all duration-300 ease-in-out hover:bg-[var(--primary)]">
          ثبت سفارش
        </Button>
      </div>
    </div>
  );
};

export default ShoppingProgressTablePage;
