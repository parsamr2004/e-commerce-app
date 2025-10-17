import Stepper from "@/components/Stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ShoppingProgressForm = () => {
  return (
    <>
      <Stepper />
      <div className="mt-40 mr-105 flex justify-between gap-10">
        <form action="">
          <div className="flex flex-col gap-5">
            <span className="text-2xl font-bold">آدرس دریافت</span>
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
            <p className="bg-[var( --muted-foreground)] text-sm">روش پرداخت</p>
            <RadioGroup>
              <div className="flex items-center justify-end gap-3">
                <Label htmlFor="bank">درگاه پرداخت پاسارگاد</Label>

                <RadioGroupItem
                  value="pay"
                  className="relative h-4 w-4 rounded-full border border-[var(--border)] after:absolute after:top-1/2 after:left-1/2 after:h-2 after:w-2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-[var(--primary)] after:content-[''] data-[state=unchecked]:after:hidden"
                />
              </div>
            </RadioGroup>

            <Button className="w-full rounded-[var(--radius)]">ادامه</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShoppingProgressForm;
