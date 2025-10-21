import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useShippingStore } from "@/stores/use-Shipping-Info-Store.ts";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const ShoppingProgressForm = () => {
  const { shippingData, updateShippingField } = useShippingStore();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateShippingField(name, value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { address, city, country, postalCode, paymentMethod } = shippingData;

    if (!address || !city || !country || !postalCode || !paymentMethod) {
      toast.error("لطفاً تمام فیلدها را  پر کنید");
      return;
    }

    navigate("/shopping-progress/summary");
  };

  return (
    <>
      <div className="mt-40 mr-40 flex justify-between gap-10">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <span className="text-2xl font-bold">آدرس دریافت</span>
            <div className="flex flex-col gap-3">
              <Label>آدرس</Label>
              <Input
                className="w-full min-[1120px]:w-[530px]"
                placeholder="آدرس را وارد نمایید"
                type="text"
                name="address"
                id="address"
                value={shippingData.address}
                onChange={handleChange}
              ></Input>
            </div>
            <div className="flex flex-col gap-3">
              <Label>شهر</Label>
              <Input
                className="w-full min-[1120px]:w-[530px]"
                placeholder="شهر را وارد نمایید"
                type="text"
                name="city"
                id="city"
                value={shippingData.city}
                onChange={handleChange}
              ></Input>
            </div>
            <div className="flex flex-col gap-3">
              <Label>کشور</Label>
              <Input
                className="w-full min-[1120px]:w-[530px]"
                placeholder="کشور را وارد نمایید"
                type="text"
                name="country"
                id="country"
                value={shippingData.country}
                onChange={handleChange}
              ></Input>
            </div>
            <div className="flex flex-col gap-3">
              <Label>کد پستی</Label>
              <Input
                className="w-full min-[1120px]:w-[530px]"
                placeholder="کد پستی را وارد نمایید"
                type="text"
                name="postalCode"
                id="postalCode"
                value={shippingData.postalCode}
                onChange={handleChange}
              ></Input>
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="payment" className="text-[var( --muted-foreground)] mb-4 text-sm">
                روش پرداخت
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pasargad"
                  checked={shippingData.paymentMethod === "pasargad"}
                  onChange={handleChange}
                  className="hidden"
                />
                <div className="h-3 w-3 rounded-full bg-[var(--primary)]" />
                <p className="text-xs">درگاه پرداخت پاسارگاد</p>
              </label>
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              className="w-full rounded-[var(--radius)]"
            >
              ادامه
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShoppingProgressForm;
