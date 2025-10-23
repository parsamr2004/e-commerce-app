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
  LucideHeart,
  LucideBackpack,
  LucideClock,
  LucideShoppingCart,
  LucideStar,
  LucideStore,
  ShoppingCart,
} from "lucide-react";
import { Link, useParams } from "react-router";
import useFavorites from "@/hooks/use-favorites";
import Loading from "@/components/Loading";
import ErrorPage from "../ErrorPage";
import { useState } from "react";
import useSubmitReview from "@/hooks/use-submit-review";
// import useSubmitReview from "@/hooks/use-submit-review";

export const ProductPage = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetSingleProduct(id);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { data: products } = useProducts();
  const { addToCart, updateQuantity } = useCartStore();
  const { mutate: submitReview, isPending } = useSubmitReview(product?._id);

  if (!id) return <div>Invalid Product ID</div>;
  if (!product) return <div>Product not found</div>;
  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;

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
              <div className="flex flex-row justify-between">
                <h2 className="text-2xl font-bold">{product.name}</h2>
              </div>
              <br />
              <p className="mb-6">{product.description}</p>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-3xl font-bold">
                  {Math.round(product.price).toLocaleString()} تومان
                </span>
              </div>
            </div>

            {/* details */}
            <div className="flex flex-col justify-center">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center">
                  <LucideStar className="fill-black dark:fill-white" />
                  <p className="pr-1">امتیاز :</p>
                  <span className="p-1">{product.rating.toFixed(1)}</span>
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
                  <span className="p-1">{product.reviews?.length}</span>
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
                <div className="mr-2 text-sm">{product.reviews?.length} نظر</div>
              </div>
            </div>

            <br />
            <div className="mt-auto w-2/5">
              <Button
                className="bg-primary w-full cursor-pointer"
                size="lg"
                onClick={() => {
                  addToCart(product);
                  updateQuantity(id, 1);
                }}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                افزودن به سبد خرید
              </Button>
            </div>
          </CardContent>
        </div>

        {/* favorite */}
        <div className="flex w-[10%] items-start justify-end">
          <Button
            className={`transition-all ${
              isFavorite(product._id)
                ? "[&_.lucide-heart]:fill-muted [&_.lucide-heart]:text-muted"
                : "text-background"
            }`}
            size="icon"
            variant="default"
            aria-label="Favorite"
            onClick={() => toggleFavorite(product)}
          >
            <LucideHeart />
          </Button>
        </div>
      </div>
      <br />
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
            <TabsTrigger value="submit-review" className="cursor-pointer">
              ثبت نظر
            </TabsTrigger>
            <TabsTrigger value="view-reviews" className="cursor-pointer">
              مشاهده نظرات
            </TabsTrigger>
            <TabsTrigger value="related-products" className="cursor-pointer">
              محصولات مرتبط
            </TabsTrigger>
          </TabsList>

          {/* محتوای تب‌ها */}
          <div className="h-full w-full overflow-y-auto">
            {/* ثبت نظر */}
            <TabsContent value="submit-review" className="h-full justify-between">
              <div className="dir-rtl space-y-4 p-3 text-right">
                <label htmlFor="rating" className="block text-sm font-medium">
                  امتیاز
                </label>
                <Select dir="rtl" name="rating" onValueChange={(value) => setRating(Number(value))}>
                  <SelectTrigger className="w-full cursor-pointer text-right">
                    <SelectValue placeholder="انتخاب امتیاز" />
                  </SelectTrigger>
                  <SelectContent className="dir-rtl text-right">
                    <SelectItem value="5" className="cursor-pointer">
                      5
                    </SelectItem>
                    <SelectItem value="4" className="cursor-pointer">
                      4
                    </SelectItem>
                    <SelectItem value="3" className="cursor-pointer">
                      3
                    </SelectItem>
                    <SelectItem value="2" className="cursor-pointer">
                      2
                    </SelectItem>
                    <SelectItem value="1" className="cursor-pointer">
                      1
                    </SelectItem>
                  </SelectContent>
                </Select>

                <label htmlFor="review" className="block pt-4 text-sm font-medium">
                  نظر
                </label>
                <Textarea
                  id="review"
                  placeholder="نظر خود را وارد نمایید"
                  className="h-[100px] resize-none text-right"
                  onChange={(e) => setComment(e.target.value)}
                />

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    className="bg-primary"
                    disabled={isPending}
                    onClick={() => submitReview({ rating, comment })}
                  >
                    {isPending ? "در حال ارسال..." : "ثبت نظر"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* مشاهده نظرات */}
            <TabsContent
              value="view-reviews"
              className="max-h-[400px] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {product.reviews?.length === 0 ? (
                <div className="flex h-[200px] items-center justify-center text-center">
                  هیچ نظری برای این محصول ثبت نشده است.
                </div>
              ) : (
                <div className="space-y-4 p-4">
                  {product.reviews?.map((rev) => (
                    <div key={rev._id} className="bg-muted rounded-lg p-6">
                      <div className="flex justify-between text-sm">
                        <span className="rtl:text-right">
                          {new Date(rev.createdAt).toLocaleDateString("fa-IR")}
                        </span>
                        <span className="rtl:text-left">{rev.name}</span>
                      </div>

                      <p className="mt-4">{rev.comment}</p>

                      <div className="mt-3 flex items-center">
                        {[...Array(5)].map((_, i) => {
                          const fill = i + 1 <= rev.rating ? 100 : 0;
                          return <RatingStar key={i} fillPercentage={fill} />;
                        })}
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
