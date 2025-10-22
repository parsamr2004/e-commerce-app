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
  const productPrice = product.price || 0;
  const productDescription = product.description;
  const ProductImg = product.image;
  const { addToCart, updateQuantity } = useCartStore();

  return (
    <Card className="rounded-4 mt-4 mr-4 flex max-h-[340px] max-w-[328px] flex-col justify-between overflow-hidden py-0">
      {/* Top section (image + category tag) */}
      <CardContent className="relative h-[170px] overflow-hidden border-red-500 p-0">
        <img src={ProductImg} alt={productTitle} className="absolute inset-0 w-full object-cover" />
        <Button
          className={`absolute top-2 right-2 ${
            isFavorite
              ? "[&_.lucide-heart]:text-muted [&_.lucide-heart]:fill-muted"
              : "text-background"
          }`}
          size="icon"
          variant="default"
          aria-label="Favorite"
          onClick={() => toggleFavorite(product)}
        >
          <LucideHeart />
        </Button>
        <Label className="absolute right-4 bottom-3 rounded-2xl bg-[var(--primary-dark)] px-2.5 py-0.5 font-light text-white">
          {productCategory}
        </Label>
      </CardContent>

      {/* Main info section */}
      <CardContent className="bg-card flex flex-grow flex-col justify-between px-5 py-4">
        <div>
          {/* Title + price */}
          <div className="flex min-h-[3.5rem] flex-row items-start justify-between">
            <h3 className="line-clamp-2 leading-tight font-medium">{productTitle}</h3>
            <div className="text-primary text-sm whitespace-nowrap">{productPrice} تومان</div>
          </div>

          {/* Description (2 lines max) */}
          <CardDescription className="text-muted-foreground mt-2 line-clamp-2 min-h-[2.5rem] text-justify">
            {productDescription}
          </CardDescription>
        </div>

        {/* Footer (button + icon) */}
        <CardFooter className="flex items-center justify-between px-0 pt-4">
          <Button className="bg-primary cursor-pointer">
            <Link to={`/products/${product._id}`}>
              <span>مشاهده بیشتر</span>
            </Link>
            <LucideArrowLeft className="ml-1" />
          </Button>
          <button onClick={() => {addToCart(product); updateQuantity(product._id, 1)}} className="cursor-pointer">
            <ShoppingBasket />
          </button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default ShopCard;
