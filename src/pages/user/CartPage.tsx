import ProductCardItem from "@/components/ProductCardItem";
import { Button } from "@/components/ui/button";
import product from "../../assets/images/product.png";

const CartPage = () => {
  return (
    <div className="flex flex-col gap-8 px-10 py-5">
      <div className="flex flex-col gap-5">
        <ProductCardItem
          version={"Apple iPhone 14 Pro"}
          name={"Apple"}
          price={"10,000"}
          url={product}
        />
        <ProductCardItem
          version={"Apple iPhone 14 Pro"}
          name={"Apple"}
          price={"10,000"}
          url={product}
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xl">
          تعداد <span>(3)</span>
        </p>
        <span className="text-xl font-bold">۱۰,۰۰۰ تومان</span>
        <Button className="cursor-pointer self-start rounded-2xl px-50">تکمیل خرید</Button>
      </div>
    </div>
  );
};

export default CartPage;
