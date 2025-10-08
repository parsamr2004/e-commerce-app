import { Star, ShoppingCart, ShoppingBag, Store, Clock4 } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import React from "react";

const HomePage = () => {
  return (
    <section className="">
      <article className="flex gap-10 ">
        <div className="flex-1 grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCard key={i} />
          ))}
        </div>
        <div className="flex-1">
          <Carousel>
            <CarouselContent>
              {/* {images.map((src, index) => ( */}
              <CarouselItem>
                <img
                  src="../src/assets/images/iphone-14-pro.png"
                  className="object-cover"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2" />
            <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2" />
          </Carousel>

          <div className="flex gap-2 justify-between">
            <div className="flex-1 py-3">
              <p className="text-sm">Apple iPhone 14 Pro</p>
              <p className="text-left pl-4 py-3">۱۰,۰۰۰ تومان</p>
              <p className="text-sm max-w-md">
                آیفون 14 پرو دارای صفحه نمایش 6.1 اینچی Super Retina XDR است
                صفحه نمایش با فناوری ProMotion، تراشه A16 Bionic و سیستم دوربین
                سه گانه ...
              </p>
            </div>
            <div className="">
              <div className="flex items-center gap-2 py-3">
                <Star className="w-4 h-4"></Star>

                <p className="text-muted-foreground">امتیاز :</p>
                <p>۵</p>
              </div>
              <div className="flex items-center gap-2 py-3">
                <ShoppingCart className="w-4 h-4"></ShoppingCart>
                <p className="text-muted-foreground">تعداد :</p>
                <p>۵۲</p>
              </div>
              <div className="flex items-center gap-2 py-3">
                <ShoppingBag className="w-4 h-4"></ShoppingBag>
                <p className="text-muted-foreground">موجودی:</p>
                <p>۵</p>
              </div>
            </div>
            <div className="">
              <div className="flex items-center gap-2 py-3">
                <Store className="w-4 h-4"></Store>
                <p className="text-muted-foreground">برند :</p>
                <p>اپل</p>
              </div>
              <div className="flex items-center gap-2 py-3">
                <Clock4 className="w-4 h-4"></Clock4>
                <p className="text-sm text-muted-foreground">
                  زمان به روزرسانی:
                </p>
                <p>چندلحظه قبل</p>
              </div>
              <div className="flex items-center gap-2 py-3">
                <Star className="w-4 h-4"></Star>
                <p className="text-muted-foreground">موجودی :</p>
                <p>۵</p>
              </div>
            </div>
          </div>
        </div>
      </article>
      <div className="my-10">
        {/* پایین صفحه */}
        <div className="flex justify-between items-center mb-4">
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
        >
          <div className="" style={{ gridArea: "card1" }}>
            <ProductCard />
          </div>
          <div style={{ gridArea: "card2" }}>
            <ProductCard />
          </div>
          <div style={{ gridArea: "card3" }}>
            <ProductCard />
          </div>
          <div style={{ gridArea: "card4" }}>
            <ProductCard />
          </div>
          <div style={{ gridArea: "card5" }}>
            <ProductCard />
          </div>
          <div style={{ gridArea: "card6" }}>
            <ProductCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
