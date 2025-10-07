import { Card, CardContent, CardDescription, CardFooter } from "./ui/card";
import ProductImg from "../assets/product.jpg";

import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { LucideArrowLeft, LucideHeart, ShoppingBasket } from "lucide-react";

const ShopCard = () => {
  const productLable = "Apple"
  const productTitle = "Apple iPhone 14 Pro"
  const productPrice = "۱۰,۰۰۰"
  const productDescription = "آیفون 14 پرو دارای صفحه نمایش 6.1 اینچی سوپر است نمایشگر Retina XDR ..."
  return (
    <Card className="max-w-[328px] mr-4 mt-4 py-0 rounded-4">
      <CardContent className=" relative">
        <img
          src={ProductImg}
          alt="Img"
          className="w-full h-[170px] object-cover"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2.5 right-5"
        >
          <LucideHeart className="text-shadow-secondary-foreground" />
        </Button>
        <Label className="absolute bottom-3 right-4 bg-[var(--primary-dark)] rounded-2xl py-0.5 px-2.5 font-light text-white">
          {productLable}
        </Label>
      </CardContent>
      <CardContent className="px-0 py-0 bg-card">
      <div className="mx-5 my-5">
        <CardContent className="flex flex-row justify-between px-0 pb-4 font-light">
          <h3>{productTitle}</h3>
          <div className="text-primary">{productPrice} تومان</div>
        </CardContent>
        <CardDescription className="text-muted-foreground text-justify">
          {productDescription}
        </CardDescription>
        <CardFooter className="justify-between pt-4 pb-0 px-0 ">
          <Button className="bg-primary variant='outline' sizi='icon' ">
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
