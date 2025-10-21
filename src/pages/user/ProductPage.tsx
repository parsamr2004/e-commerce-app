"use client";

import ProductCard from "@/components/ProductCard";
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
import useGetSingleProduct from "@/hooks/use-get-single-prodcts";
import useProducts from "@/hooks/use-products";
import useCartStore from "@/stores/use-cart-store";
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
import { Link, useParams } from "react-router";

export const ProductPage = () => {
  const [isWishlist, setIsWishlist] = useState(false);
  const { data: products } = useProducts();
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetSingleProduct(id);
  const { addToCart, updateQuantity } = useCartStore();

  if (!id) return <div>Invalid Product ID</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;

  return (
    <div className="flex h-full w-full flex-col px-3 py-6">
      <div className="flex h-2/3 w-full flex-row items-stretch gap-5">
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-3xl">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        {/* main */}
        <div className="flex h-full min-h-2/3 w-full flex-col">
          <CardContent className="flex h-full w-full flex-col">
            <div className="mb-4 flex flex-col">
              <br />
              <div className="flex flex-row justify-between">
                <h2 className="text-2xl font-bold">{product.name}</h2>
              </div>
              <br />
              <p className="mb-6">{product.description}</p>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-3xl font-bold">{product.price.toLocaleString()} تومان</span>
              </div>
            </div>

            {/* details */}
            <div className="flex flex-col justify-center">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center">
                  <LucideStar className="fill-black dark:fill-white" />
                  <p className="pr-1">امتیاز :</p>
                  <span className="p-1">{product.rating}</span>
                </div>
                <div className="flex flex-row items-center">
                  <LucideStore />
                  <p className="pr-1">برند :</p>
                  <span className="p-1">{product.name}</span>
                </div>
              </div>
              <br />
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center">
                  <LucideShoppingCart />
                  <p className="pr-1">تعداد :</p>
                  <span className="p-1">{product.quantity}</span>
                </div>
                <div className="flex flex-row items-center">
                  <LucideClock />
                  <p className="pr-1">آخرین بروزرسانی :</p>
                  <span className="p-1">
                    {new Date(product.updatedAt).toLocaleDateString("fa-IR")}
                  </span>
                </div>
              </div>
              <br />
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center">
                  <LucideBackpack />
                  <p className="pr-1">موجودی :</p>
                  <span className="p-1">{product.countInStock}</span>
                </div>
                <div className="flex flex-row items-center">
                  <LucideStar className="fill-black dark:fill-white" />
                  <p className="pr-1">نظرات :</p>
                  <span className="p-1">{product.reviews.length}</span>
                </div>
              </div>
            </div>

            <br />
            <div className="mb-4 flex flex-row items-center justify-between">
              <div className="dir-rtl flex flex-row items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => {
                    const rating = product.rating;
                    const starIndex = i + 1;

                    let fillPercentage = 0;
                    if (starIndex <= Math.floor(rating)) fillPercentage = 100;
                    else if (starIndex === Math.floor(rating) + 1)
                      fillPercentage = (rating % 1) * 100;

                    return <RatingStar key={i} fillPercentage={fillPercentage} />;
                  })}
                </div>
                <div className="mr-2 text-sm">{product.reviews.length} نظر</div>
              </div>

              
            </div>

            <br />
            <div className="mt-auto w-2/5">
              <Button
                className="bg-primary w-full cursor-pointer"
                size="lg"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                افزودن به سبد خرید
              </Button>
            </div>
          </CardContent>
        </div>

        {/* favorite */}
        <div className="flex w-[10%] items-start justify-end">
          <Button variant="ghost" size="icon" onClick={() => setIsWishlist(!isWishlist)}>
            <Heart className={`h-5 w-5 ${isWishlist ? "fill-current text-red-500" : ""}`} />
          </Button>
        </div>
      </div>
      <br />
      <br />
      <div className="h-[400px] w-full items-center">
        <Tabs
          dir="rtl"
          orientation="vertical"
          defaultValue="submit-review"
          className="flex h-full w-full flex-row rounded-lg"
        >
          {/* لیست تب‌ها */}
          <TabsList className="flex h-1/2 w-1/6 flex-col items-stretch justify-between gap-2 rounded-r-lg border-l p-2">
            <TabsTrigger value="submit-review">ثبت نظر</TabsTrigger>
            <TabsTrigger value="view-reviews">مشاهده نظرات</TabsTrigger>
            <TabsTrigger value="related-products">محصولات مرتبط</TabsTrigger>
          </TabsList>

          {/* محتوای تب‌ها */}
          <div className="h-full w-full overflow-y-auto">
            {/* ثبت نظر */}
            <TabsContent value="submit-review" className="h-full justify-between">
              <div className="dir-rtl space-y-4 p-3 text-right">
                <label htmlFor="rating" className="block text-sm font-medium">
                  امتیاز
                </label>
                <Select dir="rtl" name="rating">
                  <SelectTrigger className="w-full text-right">
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
                  className="h-[100px] resize-none text-right"
                />

                <div className="flex justify-end pt-4">
                  <Button type="submit" className="bg-primary">
                    ثبت نظر
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* مشاهده نظرات */}
            <TabsContent value="view-reviews" className="h-full">
              {product.reviews?.length === 0 ? (
                <div className="flex h-full items-center justify-center p-6 text-center text-gray-600">
                  هیچ نظری برای این محصول ثبت نشده است.
                </div>
              ) : (
                <div className="space-y-4">
                  {product.reviews?.map((rev) => (
                    <div key={rev._id} className="rounded-lg bg-gray-100 p-6">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span className="rtl:text-right">
                          {new Date(rev.createdAt).toLocaleDateString("fa-IR")}
                        </span>
                        <span className="rtl:text-left">{rev.name}</span>
                      </div>

                      <p className="mt-4 text-gray-800">{rev.comment}</p>
                      <br />

                      <div className="flex flex-row items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => {
                            const fill = i + 1 <= rev.rating ? 100 : 0;
                            return <RatingStar key={i} fillPercentage={fill} />;
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* محصولات مرتبط */}
            <TabsContent value="related-products" className="h-full">
              <div className="grid grid-cols-4 gap-4">
                {products?.slice(0, 4).map((p) => (
                  <Link to={`/products/${p._id}`} key={p._id}>
                    <ProductCard
                      key={p._id}
                      product={p}
                      toggleFavorite={() => {}}
                      isFavorite={false}
                    />
                  </Link>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductPage;
