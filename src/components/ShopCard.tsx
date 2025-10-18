import type { Product } from "@/types/product.model";
import { LucideArrowLeft, LucideHeart, ShoppingBasket } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter } from "./ui/card";
import { Label } from "./ui/label";

const ShopCard = ({ product }: { product: Product }) => {
  return (
    <Card className="rounded-4 mt-4 mr-4 max-w-[328px] py-0">
      <CardContent className="relative">
        <img src={product.image} alt={product.name} className="h-[170px] w-full object-cover" />
        <Button size="icon" variant="ghost" className="absolute top-2.5 right-5">
          <LucideHeart className="text-shadow-secondary-foreground" />
        </Button>
        <Label className="absolute right-4 bottom-3 rounded-2xl bg-[var(--primary-dark)] px-2.5 py-0.5 font-light text-white">
          {product.category?.name ? product.category.name : ""}
        </Label>
      </CardContent>
      <CardContent className="bg-card px-0 py-0">
        <div className="mx-5 my-5">
          <CardContent className="flex flex-row justify-between px-0 pb-4 font-light">
            <h3>{product.name}</h3>
            <div className="text-primary">{product.price.toLocaleString()} تومان</div>
          </CardContent>
          <CardDescription className="text-muted-foreground line-clamp-3 text-justify">
            {product.description}
          </CardDescription>
          <CardFooter className="justify-between px-0 pt-4 pb-0">
            <Button>
              <span>مشاهده بیشتر</span>
              <LucideArrowLeft></LucideArrowLeft>
            </Button>
            <ShoppingBasket />
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShopCard;
