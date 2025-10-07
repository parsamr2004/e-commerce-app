import Layout from "@/Layout";
import product from "../../assets/images/product.png";
import { Button } from "@/components/ui/button";
import ProductCardItem from "@/components/ProductCardItem";

const CartPage = () => {
  return (
    <Layout>
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
          <span className="font-bold text-xl">۱۰,۰۰۰ تومان</span>
          <Button className="rounded-2xl px-50 cursor-pointer self-start">تکمیل خرید</Button>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
