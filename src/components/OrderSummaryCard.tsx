import { Badge } from "@/components/ui/badge";

const OrderSummaryCard = () => {
  return (
    <div>
      <div>
        <h2 className="pb-6 font-bold">آدرس دریافت</h2>
        <div className="flex gap-2 pb-2">
          <p className="text-primary">شماره سفارش:</p>
          <p>2923910</p>
        </div>
        <div className="flex gap-2 pb-2">
          <p className="text-primary">نام:</p>
          <p>علی موسوی</p>
        </div>
        <div className="flex gap-2 pb-2">
          <p className="text-primary">ایمیل:</p>
          <p>Robert@gmail.com</p>
        </div>
        <div className="flex gap-2 pb-2">
          <p className="text-primary">آدرس:</p>
          <p>تهران خ آزادی</p>
        </div>
        <div className="flex gap-2 pb-2">
          <p className="text-primary">روش پرداخت:</p>
          <p>درگاه پرداخت پاسارگاد</p>
        </div>
      </div>
      <Badge variant="secondary" className="w-full justify-start p-2 text-base font-bold">
        Status
      </Badge>
      <div className="m-3 flex flex-col gap-2">
        <h2 className="font-bold">خلاصه خرید</h2>
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
        <div className="flex justify-between">
          <span>مبلغ نهایی:</span>
          <span>۱۲۵,۰۰۰ تومان</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
