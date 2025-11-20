import ProductCardItem from "@/components/ProductCardItem";
import { Button } from "@/components/ui/button";
import useCartStore from "@/stores/use-cart-store";
import { useNavigate } from "react-router";

const CartPage = () => {
  const { cartItems } = useCartStore();
  const navigate = useNavigate();

  const itemCount = cartItems.length;
  const qtyCount = cartItems.reduce(
    (acc, cur) => acc + (cur.countInStock || 0),
    0
  );
  const finalAmount = cartItems.reduce(
    (acc, cur) => acc + (cur.countInStock || 0) * (cur.price || 0),
    0
  );

  if (cartItems.length === 0)
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-8">
        <div className="rounded-xl border p-6 text-center">
          <p className="mb-4 text-base sm:text-lg">محصولی برای خرید وجود ندارد.</p>
          <Button
            className="w-full sm:w-auto"
            onClick={() => navigate("/")}
          >
            رفتن به فروشگاه
          </Button>
        </div>
      </div>
    );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold sm:text-xl">سبد خرید</h1>
        <span className="text-sm text-muted-foreground">
          {`تعداد آیتم‌ها: ${itemCount} | مجموع تعداد انتخاب‌شده: ${qtyCount || itemCount}`}
        </span>
      </div>

      {/* Layout: list + summary */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* List */}
        <div className="md:col-span-2">
          <div className="flex flex-col gap-3 sm:gap-4">
            {cartItems.map((cartItem) => (
              <div key={cartItem._id} className="rounded-xl border p-3 sm:p-4">
                <ProductCardItem cartItem={cartItem} />
              </div>
            ))}
          </div>
        </div>

        {/* Summary (sticky on md+) */}
        <aside className="md:col-span-1">
          <div className="sticky top-4 rounded-2xl border p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">تعداد آیتم‌ها</span>
              <span className="text-sm">{itemCount}</span>
            </div>

            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">مجموع تعداد انتخاب‌شده</span>
              <span className="text-sm">{qtyCount || itemCount}</span>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <span className="text-base font-medium">مبلغ نهایی</span>
              <span className="text-base font-bold">
                {finalAmount.toLocaleString()} تومان
              </span>
            </div>

            <Button
              className="w-full rounded-xl"
              onClick={() => navigate("/shopping-progress/address")}
            >
              تکمیل خرید
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;