import ProductCardItem from "@/components/ProductCardItem";
import { Button } from "@/components/ui/button";
import useCartStore from "@/stores/use-cart-store";
import { Link } from "react-router";

const CartPage = () => {
  const { cartItems } = useCartStore();
  const counter =  cartItems.reduce((acc, cur) => acc + (cur.countInBasket || 0), 0);
  const finalAmout = cartItems.reduce((acc, cur) => acc + (cur.countInBasket || 0) * (cur.price || 0), 0);

  if (cartItems.length === 0) return <div className="p-5">محصولی برای خرید وجود ندارد.</div>

  return (
    <div className="flex flex-col gap-8 px-10 py-5">
      <div className="flex flex-col gap-5">
        {cartItems.map((cartItem) => (
          <ProductCardItem
            cartItem = { cartItem }
          />
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xl">
          تعداد <span>{counter === 0? cartItems.length: counter}</span>
        </p>
        <span className="text-xl font-bold">{finalAmout.toLocaleString()} تومان</span>
        <Link to="">
          <Button className="cursor-pointer self-start rounded-2xl px-50">تکمیل خرید</Button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
