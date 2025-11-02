import type { Product } from "@/types/product.model";
import { LucideArrowLeft, LucideHeart, ShoppingBasket } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Link } from "react-router";
import useCartStore from "@/stores/use-cart-store";

interface ProductCardProp {
  product: Product;
  categoryName: string;
  toggleFavorite: (product: Product) => void;
  isFavorite: boolean;
}

const ShopCard = (props: ProductCardProp) => {
  const { product, categoryName, toggleFavorite, isFavorite } = props;
  const productTitle = product.name;
  const productCategory = categoryName || "";
  const productPrice = product.price?.toLocaleString?.() ?? "0";
  const productDescription = product.description;
  const productImg = product.image;
  const { addToCart, updateQuantity } = useCartStore();

  return (
    <Card
      className="
        group
        relative
        flex w-full flex-col overflow-hidden rounded-2xl border
        transition
        hover:shadow-sm
        sm:max-w-[360px]
        md:max-w-[380px]
      "
    >
      {/* Top: تصویر + برچسب دسته + دکمه علاقه‌مندی */}
      <CardContent className="relative p-0">
        {/* نسبت تصویر واکنشی: موبایل 1:1، از sm به بالا 4:3، از lg به بالا 5:4 */}
        <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-[5/4]">
          <img
            src={productImg}
            alt={productTitle}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* دکمه علاقه‌مندی */}
          <Button
            size="icon"
            variant="secondary"
            aria-label="افزودن به علاقه‌مندی"
            onClick={() => toggleFavorite(product)}
            className={`
              absolute right-2 top-2 z-10 rounded-full border bg-background/80 backdrop-blur
              transition
              ${isFavorite ? "[&_.lucide-heart]:fill-current" : ""}
              [&_.lucide-heart]:h-5 [&_.lucide-heart]:w-5
            `}
          >
            <LucideHeart className={isFavorite ? "" : "text-muted-foreground"} />
          </Button>

          {/* برچسب دسته‌بندی - بدون رنگ هاردکد */}
          {productCategory ? (
            <Label
              className="
                absolute bottom-3 right-3 z-10 rounded-2xl bg-primary px-2.5 py-0.5
                text-xs font-medium text-primary-foreground shadow
              "
            >
              {productCategory}
            </Label>
          ) : null}
        </div>
      </CardContent>

      {/* Main info: عنوان، قیمت، توضیح */}
      <CardContent className="flex flex-1 flex-col justify-between px-4 py-4 sm:px-5">
        <div>
          {/* عنوان + قیمت */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 text-sm font-medium leading-tight sm:text-base">
              {productTitle}
            </h3>
            <div className="whitespace-nowrap text-xs sm:text-sm">
              <span className="font-semibold">{productPrice}</span> <span>تومان</span>
            </div>
          </div>

          {/* توضیح (۲ خط) */}
          {productDescription ? (
            <CardDescription className="text-muted-foreground mt-2 line-clamp-2 text-justify text-xs sm:text-sm">
              {productDescription}
            </CardDescription>
          ) : null}
        </div>

        {/* Footer: دکمه مشاهده + افزودن به سبد */}
        <CardFooter className="mt-4 flex items-center justify-between gap-3 px-0">
          <Button asChild className="cursor-pointer">
            <Link to={`/products/${product._id}`} className="inline-flex items-center">
              <span className="ml-1">مشاهده بیشتر</span>
              <LucideArrowLeft className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            size="icon"
            variant="outline"
            aria-label="افزودن به سبد"
            className="cursor-pointer"
            onClick={() => {
              addToCart(product);
              updateQuantity(product._id, 1);
            }}
          >
            <ShoppingBasket className="h-5 w-5" />
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default ShopCard;