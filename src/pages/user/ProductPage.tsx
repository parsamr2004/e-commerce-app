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
import { Link, useParams } from "react-router-dom";
import useFavorites from "@/hooks/use-favorites";
import Loading from "@/components/Loading";
import ErrorPage from "../ErrorPage";
import { useState } from "react";
import useSubmitReview from "@/hooks/use-submit-review";

export const ProductPage = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetSingleProduct(id);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { data: products } = useProducts();
  const { addToCart, updateQuantity } = useCartStore();
  const { mutate: submitReview, isPending } = useSubmitReview(product?._id);

  if (!id) return <div className="px-4 py-6">Invalid Product ID</div>;
  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;
  if (!product) return <Loading />;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div
        className="
          grid gap-4 lg:gap-6
          grid-cols-1
          lg:grid-cols-[1.1fr_1fr]
        "
      >
        <div className="relative overflow-hidden rounded-2xl border">
          <div className="absolute right-3 top-3 z-10 lg:hidden">
            <Button
              size="icon"
              variant="secondary"
              className={`rounded-full border backdrop-blur-sm bg-background/80 transition ${
                isFavorite(product._id) ? "[&_.lucide-heart]:fill-current" : ""
              }`}
              aria-label="Favorite"
              onClick={() => toggleFavorite(product)}
            >
              <LucideHeart className={isFavorite(product._id) ? "" : "text-muted-foreground"} />
            </Button>
          </div>

          <div className="aspect-square sm:aspect-[4/3] lg:aspect-[5/4]">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="rounded-2xl border">
          <CardContent className="flex w-full flex-col gap-4 p-4 sm:p-6">
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-xl font-bold sm:text-2xl">{product.name}</h2>
              <div className="hidden lg:block">
                <Button
                  size="icon"
                  variant="outline"
                  className={`transition ${isFavorite(product._id) ? "[&_.lucide-heart]:fill-current" : ""}`}
                  aria-label="Favorite"
                  onClick={() => toggleFavorite(product)}
                >
                  <LucideHeart className={isFavorite(product._id) ? "" : "text-muted-foreground"} />
                </Button>
              </div>
            </div>

            <p className="text-sm text-muted-foreground sm:text-base">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold sm:text-3xl">
                {Math.round(product.price).toLocaleString()} تومان
              </span>
            </div>

            <div className="grid gap-3 rounded-xl border p-3 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <LucideStar className="h-4 w-4" />
                <p className="text-sm">امتیاز:</p>
                <span className="text-sm">{product.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-2">
                <LucideStore className="h-4 w-4" />
                <p className="text-sm">برند:</p>
                <span className="text-sm">{product.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <LucideShoppingCart className="h-4 w-4" />
                <p className="text-sm">تعداد:</p>
                <span className="text-sm">{product.quantity}</span>
              </div>
              <div className="flex items-center gap-2">
                <LucideClock className="h-4 w-4" />
                <p className="text-sm">آخرین بروزرسانی:</p>
                <span className="text-sm">
                  {new Date(product.updatedAt).toLocaleDateString("fa-IR")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <LucideBackpack className="h-4 w-4" />
                <p className="text-sm">موجودی:</p>
                <span className="text-sm">{product.countInStock}</span>
              </div>
              <div className="flex items-center gap-2">
                <LucideStar className="h-4 w-4" />
                <p className="text-sm">نظرات:</p>
                <span className="text-sm">{product.reviews?.length}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="dir-rtl flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => {
                    const r = product.rating;
                    const starIndex = i + 1;
                    let fillPercentage = 0;
                    if (starIndex <= Math.floor(r)) fillPercentage = 100;
                    else if (starIndex === Math.floor(r) + 1) fillPercentage = (r % 1) * 100;
                    return <RatingStar key={i} fillPercentage={fillPercentage} />;
                  })}
                </div>
                <div className="mr-2 text-xs text-muted-foreground sm:text-sm">
                  {product.reviews?.length} نظر
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  addToCart(product);
                  updateQuantity(product._id, 1);
                }}
              >
                <ShoppingCart className="ml-2 h-5 w-5" />
                افزودن به سبد خرید
              </Button>
            </div>
          </CardContent>
        </div>
      </div>

      <div className="mt-8">
        <Tabs
          dir="rtl"
          orientation="horizontal"
          className="flex h-full w-full flex-col lg:flex-row"
          defaultValue="submit-review"
        >
          <TabsList
            className="
              mb-3 flex h-auto w-full items-stretch gap-2 rounded-xl p-2
              overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
              lg:mb-0 lg:h-full lg:w-56 lg:min-w-56 lg:flex-col
              max-[370px]:flex-col max-[370px]:overflow-visible
            "
          >
            <TabsTrigger
              value="submit-review"
              className="cursor-pointer shrink-0 min-w-[9rem] text-sm
                        max-[370px]:min-w-0 max-[370px]:w-full max-[370px]:text-xs max-[370px]:py-2"
            >
              ثبت نظر
            </TabsTrigger>
            <TabsTrigger
              value="view-reviews"
              className="cursor-pointer shrink-0 min-w-[9rem] text-sm
                        max-[370px]:min-w-0 max-[370px]:w-full max-[370px]:text-xs max-[370px]:py-2"
            >
              مشاهده نظرات
            </TabsTrigger>
            <TabsTrigger
              value="related-products"
              className="cursor-pointer shrink-0 min-w-[9rem] text-sm
                        max-[370px]:min-w-0 max-[370px]:w-full max-[370px]:text-xs max-[370px]:py-2"
            >
              محصولات مرتبط
            </TabsTrigger>
          </TabsList>

          <div className="w-full lg:pl-4">
            <TabsContent value="submit-review" className="rounded-xl border p-4 max-[370px]:p-3">
              <div className="dir-rtl space-y-4 text-right">
                <label htmlFor="rating" className="block text-sm font-medium">امتیاز</label>
                <Select dir="rtl" name="rating" onValueChange={(v) => setRating(Number(v))}>
                  <SelectTrigger className="w-full text-right max-[370px]:h-9">
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

                <label htmlFor="review" className="block pt-2 text-sm font-medium">نظر</label>
                <Textarea
                  id="review"
                  placeholder="نظر خود را وارد نمایید"
                  className="h-28 resize-y text-right max-[370px]:h-24"
                  onChange={(e) => setComment(e.target.value)}
                />

                <div className="flex justify-end pt-2">
                  <Button type="submit" disabled={isPending} onClick={() => submitReview({ rating, comment })}>
                    {isPending ? "در حال ارسال..." : "ثبت نظر"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="view-reviews"
              className="
                rounded-xl border p-4
                max-h-[420px] overflow-y-auto
                [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                max-[370px]:max-h-none max-[370px]:h-auto max-[370px]:p-3
              "
            >
              {product.reviews?.length === 0 ? (
                <div className="flex h-40 items-center justify-center text-center text-sm text-muted-foreground max-[370px]:h-32">
                  هیچ نظری برای این محصول ثبت نشده است.
                </div>
              ) : (
                <div className="space-y-3">
                  {product.reviews?.map((rev) => (
                    <div key={rev.id} className="rounded-lg border p-4 max-[370px]:p-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="rtl:text-right">
                          {new Date(rev.createdAt).toLocaleDateString("fa-IR")}
                        </span>
                        <span className="rtl:text-left">{rev.name}</span>
                      </div>
                      <p className="mt-3 text-sm break-words">{rev.comment}</p>
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

            <TabsContent value="related-products" className="rounded-xl border p-4 max-[370px]:p-3">
              <div
                className="
                  grid gap-4
                  grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
                  max-[370px]:grid-cols-1
                "
              >
                {products?.slice(0, 8).map((p) => (
                  <Link to={`/products/${p._id}`} key={p._id}>
                    <ProductCard product={p} toggleFavorite={() => {}} isFavorite={false} />
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
