"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  LucideBackpack,
  LucideClock,
  LucideShoppingCart,
  LucideStar,
  LucideStore,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useState } from "react";

const product = {
  id: "1",
  name: "Apple MacBook Air M2",
  brand: "iphone",
  price: 10000,
  rating: 4.8,
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
    <div className="flex h-full py-10 px-5 ">
      <div className="w-2/5 h-2/5 bg-amber-500 flex items-center justify-center rounded-3xl">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <CardContent className="w-1/2 p-8 flex flex-col h-full">
        <div className="mb-4 flex flex-col">
          <div className="flex flex-row justify-between">
            <h2 className="text-3xl font-bold text- mt-1">{product.name}</h2>
            <Button
              variant="outline"
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

          <div className="w-full flex flex-row justify-between">
            <p></p>
          </div>

          <br />
          <p className=" mb-6">{product.description}</p>
          <br />
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-bold ">{product.price} تومان</span>
          </div>
        </div>

        {/* details */}

        <div className="flex space-x-2 flex-col justify-center">
          <div className="flex flex-row justify-between ">
            <div className="flex flex-row">
              <LucideStar />
              <p className="pr-1">امتیاز :</p>
              <span className="p-1">{product.rating}</span>
            </div>
            <div className="flex flex-row">
              <LucideStore />
              <p className="pr-1">برند :</p>
              <span className="p-1">{product.brand}</span>
            </div>
          </div>
          <br />
          <div className="flex flex-row justify-between">
            <div className="flex flex-row">
              <LucideShoppingCart />
              <p className="pr-1">تعداد :</p>
              <span className="p-1">{product.count}</span>
            </div>
            <div className="flex flex-row">
              <LucideClock />
              <p className="pr-1">زمان بروزرسانی :</p>
              <span className="p-1">{product.lastUpdate} minute ago</span>
            </div>
          </div>
          <br />
          <div className="flex flex-row justify-between">
            <div className="flex flex-row">
              <LucideBackpack />
              <p className="pr-1">موجودی :</p>
              <span className="p-1">{product.inventory}</span>
            </div>
            <div className="flex flex-row">
              <LucideStar />
              <p className="pr-1">نظرات :</p>
              <span className="p-1">{product.reviews}</span>
            </div>
          </div>
        </div>
        <br />
        <Tabs defaultValue="features" className="mb-6" >
          <TabsList>
            <TabsTrigger value="features">ویژگی‌ها</TabsTrigger>
            <TabsTrigger value="warranty">گارانتی</TabsTrigger>
          </TabsList>
          <br />
          <TabsContent value="features">
            <ul className="list-disc pl-5 text-sm ">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="warranty">
            <p className="text-sm text-gray-600">{product.warranty}</p>
          </TabsContent>
        </Tabs>
        <div className="flex items-center mb-4 flex-row justify-between">
          <div className="flex flex-row">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? " dark:text-white text-black fill-current"
                      : "dark:text-white text-black "
                  }`}
                />
              ))}
            </div>
            <div className="ml-2 text-sm ">
              {product.rating} ({product.reviews} نظر )
            </div>
          </div>
          <Select>
            <SelectTrigger className="w-[96px] border-input bg-white shadow-none cursor-pointer">
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
        <div className="mt-auto">
          <Button
            className="w-full bg-primary hover:bg-gray-800 text-white"
            size="lg"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            افزودن به سبد خرید
          </Button>
        </div>
      </CardContent>
    </div>
  );
};

export default ProductPage;
