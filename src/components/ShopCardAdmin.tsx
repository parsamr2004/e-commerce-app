import { LucideArrowLeft, LucideHeart } from "lucide-react";
import ProductImg from "../assets/product.jpg";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter } from "./ui/card";
import { Label } from "./ui/label";

const ShopCardAdmin = () => {
  const productLable = "Apple";
  const productTitle = "Apple iPhone 14 Pro";
  const productPrice = "۱۰,۰۰۰";
  const productDescription =
    "آیفون 14 پرو دارای صفحه نمایش 6.1 اینچی سوپر است نمایشگر Retina XDR ...";
  const productDate = "۳۱ مرداد ۱۴۰۳";
  return (
    <Card className="rounded-4 mt-4 mr-4 grid w-full max-w-screen-lg grid-cols-2 overflow-hidden rounded-2xl py-0">
      <CardContent className="relative">
        <img src={ProductImg} alt="Img" className="h-[170px] w-full object-cover" />
        <Button size="icon" variant="ghost" className="absolute top-2.5 right-5">
          <LucideHeart className="text-shadow-secondary-foreground" />
        </Button>
        <Label className="absolute right-4 bottom-3 rounded-2xl bg-[var(--primary-dark)] px-2.5 py-0.5 font-light text-white">
          {productLable}
        </Label>
      </CardContent>
      <CardContent className="bg-card px-0 py-0">
        <div className="mx-5 my-5">
          <CardContent className="flex flex-row justify-between gap-4 px-0 pb-4 font-light">
            <h3>{productTitle}</h3>
            <div className="text-muted-foreground">{productDate}</div>
          </CardContent>
          <CardDescription className="text-muted-foreground text-justify">
            {productDescription}
          </CardDescription>
          <CardFooter className="justify-between px-0 pt-4 pb-0">
            <Button className="bg-primary variant='outline' sizi='icon'">
              <span>مشاهده بیشتر</span>
              <LucideArrowLeft></LucideArrowLeft>
            </Button>
            <div>{productPrice} تومان</div>
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShopCardAdmin;
