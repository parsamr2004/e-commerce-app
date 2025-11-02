import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useShippingStore } from "@/stores/use-Shipping-Info-Store.ts";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useState } from "react";

const ShoppingProgressForm = () => {
  const { shippingData, updateShippingField } = useShippingStore();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateShippingField(name, value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { address, city, country, postalCode, paymentMethod } = shippingData;

    if (!address || !city || !country || !postalCode || !paymentMethod) {
      toast.error("لطفاً تمام فیلدها را پر کنید");
      return;
    }

    try {
      setSubmitting(true);
      navigate("/shopping-progress/summary");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        dir="rtl"
        className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6 lg:p-8"
      >
        <h1 className="mb-6 text-right text-xl font-bold sm:text-2xl">آدرس دریافت</h1>

        <div className="grid grid-cols-1 gap-4 sm:gap-5">
          <div className="space-y-2">
            <Label htmlFor="address">آدرس</Label>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="آدرس را وارد نمایید"
              value={shippingData.address}
              onChange={handleChange}
              autoComplete="street-address"
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">شهر</Label>
              <Input
                id="city"
                name="city"
                type="text"
                placeholder="شهر را وارد نمایید"
                value={shippingData.city}
                onChange={handleChange}
                autoComplete="address-level2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">کشور</Label>
              <Input
                id="country"
                name="country"
                type="text"
                placeholder="کشور را وارد نمایید"
                value={shippingData.country}
                onChange={handleChange}
                autoComplete="country-name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="postalCode">کد پستی</Label>
              <Input
                id="postalCode"
                name="postalCode"
                type="text"
                placeholder="کد پستی را وارد نمایید"
                value={shippingData.postalCode}
                onChange={handleChange}
                autoComplete="postal-code"
                inputMode="numeric"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">روش پرداخت</Label>
              <RadioGroup
                dir="rtl"
                id="paymentMethod"
                value={shippingData.paymentMethod || ""}
                onValueChange={(val) => updateShippingField("paymentMethod", val)}
                className="flex flex-wrap items-center justify-start gap-3 sm:justify-end"
              >
                <div className="flex items-center gap-2 rounded-xl border px-3 py-2">
                  <RadioGroupItem value="pasargad" id="pm-pasargad" />
                  <Label htmlFor="pm-pasargad" className="cursor-pointer text-xs sm:text-sm">
                    درگاه پرداخت پاسارگاد
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => {
              updateShippingField("address", "");
              updateShippingField("city", "");
              updateShippingField("country", "");
              updateShippingField("postalCode", "");
              updateShippingField("paymentMethod", "");
            }}
          >
            پاک کردن فرم
          </Button>

          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto"
            disabled={submitting}
          >
            {submitting ? "در حال ادامه..." : "ادامه"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ShoppingProgressForm;

