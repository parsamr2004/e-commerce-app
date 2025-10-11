"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { RatingStar } from "@/components/ui/rating-star";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  LucideBackpack,
  LucideClock,
  LucideShoppingCart,
  LucideStar,
  LucideStore,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";

const product = {
  id: "1",
  name: "Apple MacBook Air M2",
  brand: "iphone",
  price: 10000,
  rating: 4.5,
  count: 25,
  inventory: 34,
  reviews: 128,
  lastUpdate: 1,
  image: "",
  description: "مک بوک ایر با تراشه M2 دارای صفحه نمایش 13.6 اینچی رتینا است.",
  features: [
    "ارتقاء وب‌کم از ۷۲۰p به ۱۰۸۰p برای کیفیت بهتر مکالمات تصویری",
    " قابلیت اتصال به یک نمایشگر خارجی با وضوح ۶K را دارد. ",
    "دارای دو پورت USB-C 4/Thunderbolt 3، شارژر MagSafe 3 و جک هدفون است.",
    "وزن سبک ۱.۲۴ کیلوگرمی دارد.",
  ],
  warranty: "پنج سال گارانتی سازگار",
};

export const ProductPage = () => {
  const [isWishlist, setIsWishlist] = useState(false);

  return (
    <div className="flex flex-col w-full h-full py-6 px-3">
      <div className="flex flex-row h-3/ w-full  items-stretch  gap-5">
        <div className="w-full h-full bg-amber-500 flex items-center justify-center rounded-3xl overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        {/* main */}
        <div className="flex flex-col h-full  w-full ">
          <CardContent className="w-full flex flex-col h-full ">
            <div className="mb-4 flex flex-col">
              <div className="flex flex-row justify-between">
                <h2 className="text-2xl font-bold">{product.name}</h2>
              </div>

              <div className="w-full flex flex-row justify-between">
                <p></p>
              </div>

              <br />
              <p className="mb-6">{product.description}</p>
              <br />
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold ">
                  {product.price} تومان
                </span>
              </div>
            </div>

            {/* details */}

            <div className="flex flex-col justify-center">
              <div className="flex flex-row justify-between ">
                <div className="flex flex-row items-center">
                  <LucideStar className="fill-black dark:fill-white" />
                  <p className="pr-1">امتیاز :</p>
                  <span className="p-1">{product.rating}</span>
                </div>
                <div className="flex flex-row items-center">
                  <LucideStore />
                  <p className="pr-1">برند :</p>
                  <span className="p-1">{product.brand}</span>
                </div>
              </div>
              <br />
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center">
                  <LucideShoppingCart />
                  <p className="pr-1">تعداد :</p>
                  <span className="p-1">{product.count}</span>
                </div>
                <div className="flex flex-row items-center">
                  <LucideClock />
                  <p className="pr-1">زمان بروزرسانی :</p>
                  <span className="p-1">{product.lastUpdate} minute ago</span>
                </div>
              </div>
              <br />
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center">
                  <LucideBackpack />
                  <p className="pr-1">موجودی :</p>
                  <span className="p-1">{product.inventory}</span>
                </div>
                <div className="flex flex-row items-center">
                  <LucideStar className="fill-black dark:fill-white" />
                  <p className="pr-1">نظرات :</p>
                  <span className="p-1">{product.reviews}</span>
                </div>
              </div>
            </div>
            <br />
            <div className="flex items-center mb-4 flex-row justify-between">
              <div className="flex flex-row items-center dir-rtl">
                <div className="flex">
                  {[...Array(5)].map((_, i) => {
                    const rating = product.rating;
                    const starIndex = i + 1;

                    let fillPercentage = 0;

                    if (starIndex <= Math.floor(rating)) {
                      fillPercentage = 100;
                    } else if (starIndex === Math.floor(rating) + 1) {
                      fillPercentage = (rating % 1) * 100;
                    }

                    return (
                      <RatingStar key={i} fillPercentage={fillPercentage} />
                    );
                  })}
                </div>
                <div className="mr-2 text-sm"> {product.reviews} نظر</div>
              </div>
              <Select>
                <SelectTrigger className="w-[96px] border-input shadow-none cursor-pointer">
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent
                  side="left"
                  className="cursor-pointer w-[var(--radix-select-trigger-width)]"
                >
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <br />
            <div className="mt-auto w-2/5 ">
              <Button className="w-full bg-primary  cursor-pointer" size="lg">
                <ShoppingCart className="mr-2 h-5 w-5 " />
                افزودن به سبد خرید
              </Button>
            </div>
          </CardContent>
        </div>
        {/* favorite */}
        <div className="w-[10%] flex items-start justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsWishlist(!isWishlist)}
          >
            <Heart
              className={`h-5 w-5 ${
                isWishlist ? "fill-current text-red-500" : ""
              }`}
            />
          </Button>
        </div>
      </div>
      <br />
      <br />
      <br />
      {/* buttom */}

      <Tabs
        orientation="horizontal"
        about="fill"
        defaultValue="submit-review"
        className="w-full max-w-lg mx-auto p-4  rounded-lg"
      >
        <TabsList className="grid w-full grid-cols-3 dir-rtl" dir="rtl">
          <TabsTrigger value="submit-review">ثبت نظر</TabsTrigger>
          <TabsTrigger value="view-reviews">مشاهده نظرات</TabsTrigger>
          <TabsTrigger value="related-products">محصولات مرتبط</TabsTrigger>
        </TabsList>

        <TabsContent value="submit-review" className="mt-4 p-4  rounded-lg">
          <div className="space-y-4 dir-rtl text-right">
            <label htmlFor="rating" className="block text-sm font-medium">
              امتیاز
            </label>
            <Select dir="rtl" name="rating">
              <SelectTrigger className="w-full text-right ">
                <SelectValue placeholder="انتخاب امتیاز" />
              </SelectTrigger>
              <SelectContent className="dir-rtl text-right">
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="1">1</SelectItem>
              </SelectContent>
            </Select>

            <label htmlFor="review" className="block pt-4 text-sm font-medium">
              نظر
            </label>
            <Textarea
              id="review"
              placeholder="نظر خود را وارد نمایید"
              className="min-h-[150px] text-right "
            />

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className=" bg-primary hover:bg-primary-foreground "
              >
                ثبت نظر
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="view-reviews" className="mt-4 p-4  rounded-lg">
          <div className="bg-gray-100 p-6 rounded-lg my-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span className="rtl:text-right">۱۴۰۲/۰۵/۲۱</span>
              <span className="rtl:text-left">علی موسوی</span>
            </div>
            <p className="mt-4  text-gray-800">
              متن پیام اینجا وارد میشود که میتواند به متن بلند برای مثال لورم
              ایپسوم یک متن ساختگی هست برای کارهای گرافیکی
            </p>
            <div className="flex flex-row items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => {
                  const rating = product.rating;
                  const starIndex = i + 1;

                  let fillPercentage = 0;

                  if (starIndex <= Math.floor(rating)) {
                    fillPercentage = 100;
                  } else if (starIndex === Math.floor(rating) + 1) {
                    fillPercentage = (rating % 1) * 100;
                  }

                  return <RatingStar key={i} fillPercentage={fillPercentage} />;
                })}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="related-products" className="mt-4 p-4 b rounded-lg">
          <div className="dir-rtl text-right text-primary">
            <p>لیست محصولات مرتبط در این بخش قرار می‌گیرد.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductPage;
