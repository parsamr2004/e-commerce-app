import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Clock4, ShoppingBag, ShoppingCart, Star, Store } from "lucide-react";
import useProducts from "./hooks/use-products";

const App = () => {
  const { data: products } = useProducts();

  return (
    <section className="">
      <article className="flex gap-10">
        <div className="grid flex-1 grid-cols-2 gap-4">
          {products?.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="flex-1">
          <Carousel>
            <CarouselContent>
              {/* {images.map((src, index) => ( */}
              <CarouselItem>
                <img src="../src/assets/images/iphone-14-pro.png" className="object-cover" />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 transform" />
            <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 transform" />
          </Carousel>

          <div className="flex justify-between gap-2">
            <div className="flex-1 py-3">
              <p className="text-sm">Apple iPhone 14 Pro</p>
              <p className="py-3 pl-4 text-left">۱۰,۰۰۰ تومان</p>
              <p className="max-w-md text-sm">
                آیفون 14 پرو دارای صفحه نمایش 6.1 اینچی Super Retina XDR است صفحه نمایش با فناوری
                ProMotion، تراشه A16 Bionic و سیستم دوربین سه گانه ...
              </p>
            </div>
            <div className="">
              <div className="flex items-center gap-2 py-3">
                <Star className="h-4 w-4"></Star>

                <p className="text-muted-foreground">امتیاز :</p>
                <p>۵</p>
              </div>
              <div className="flex items-center gap-2 py-3">
                <ShoppingCart className="h-4 w-4"></ShoppingCart>
                <p className="text-muted-foreground">تعداد :</p>
                <p>۵۲</p>
              </div>
              <div className="flex items-center gap-2 py-3">
                <ShoppingBag className="h-4 w-4"></ShoppingBag>
                <p className="text-muted-foreground">موجودی:</p>
                <p>۵</p>
              </div>
            </div>
            <div className="">
              <div className="flex items-center gap-2 py-3">
                <Store className="h-4 w-4"></Store>
                <p className="text-muted-foreground">برند :</p>
                <p>اپل</p>
              </div>
              <div className="flex items-center gap-2 py-3">
                <Clock4 className="h-4 w-4"></Clock4>
                <p className="text-muted-foreground text-sm">زمان به روزرسانی:</p>
                <p>چندلحظه قبل</p>
              </div>
              <div className="flex items-center gap-2 py-3">
                <Star className="h-4 w-4"></Star>
                <p className="text-muted-foreground">موجودی :</p>
                <p>۵</p>
              </div>
            </div>
          </div>
        </div>
      </article>
      <div className="my-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">محصولات ویژه</h2>
          <Button className="">فروشگاه</Button>
        </div>
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(4, outo)",
            gridTemplateRows: "repeat(2, auto)",
            gridTemplateAreas: `
      "card1 card2 card3 card4"
      ". card5 card6 ."
    `,
          }}
        ></div>
      </div>
    </section>
  );
};

export default App;
