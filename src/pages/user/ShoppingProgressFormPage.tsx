import Stepper from "@/components/Stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/Layout";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ShoppingProgressForm = () => {
  return (
    <Layout>
      <Stepper />
      <div className="flex justify-between gap-10 mt-40 mr-105">
        <form action="">
          <div className="flex flex-col gap-5">
            <span className="font-bold text-2xl">آدرس دریافت</span>
            <div className="flex flex-col gap-3">
              <Label>آدرس</Label>
              <Input
                className="w-full min-[1120px]:w-[530px]"
                placeholder="آدرس را وارد نمایید"
                type="text"
              ></Input>
            </div>
            <div className="flex flex-col gap-3">
              <Label>شهر</Label>
              <Input
                className="w-full min-[1120px]:w-[530px]"
                placeholder="شهر را وارد نمایید"
                type="text"
              ></Input>
            </div>
            <div className="flex flex-col gap-3">
              <Label>کشور</Label>
              <Input
                className="w-full min-[1120px]:w-[530px]"
                placeholder="کشور را وارد نمایید"
                type="text"
              ></Input>
            </div>
            <div className="flex flex-col gap-3">
              <Label>کد پستی</Label>
              <Input
                className="w-full min-[1120px]:w-[530px]"
                placeholder="کد پستی را وارد نمایید"
                type="text"
              ></Input>
            </div>
            <p className="text-sm bg-[var( --muted-foreground)]">روش پرداخت</p>
            <RadioGroup>
              <div className="flex justify-end items-center gap-3">
                <Label htmlFor="bank">درگاه پرداخت پاسارگاد</Label>

                <RadioGroupItem
                  value="pay"
                  className="
    w-4 h-4 border border-[var(--border)] rounded-full relative
    after:content-[''] after:absolute after:top-1/2 after:left-1/2
    after:w-2 after:h-2 after:bg-[var(--primary)] after:rounded-full
    after:-translate-x-1/2 after:-translate-y-1/2
    data-[state=unchecked]:after:hidden
  "
                />
              </div>
            </RadioGroup>

            <Button className="w-full rounded-[var(--radius)]">ادامه</Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ShoppingProgressForm;
