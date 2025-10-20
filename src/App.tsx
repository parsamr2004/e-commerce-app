import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ProductCard from "@/components/ProductCard";
import useFavorites from "@/hooks/use-favorites";
import useProducts from "./hooks/use-products";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Clock4, ShoppingBag, ShoppingCart, Star, Store } from "lucide-react";

const App = () => {
  const navigate = useNavigate();
  const { data: products } = useProducts();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emblaApi, setEmblaApi] = useState<any>(null);
  const currentProduct = products?.[currentIndex];
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="overflow-hidden">
      <article className="flex gap-10">
        <div className="grid max-w-lg flex-1 grid-cols-2 gap-4">
          {products?.slice(0, 4).map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite(product._id)}
            />
          ))}
        </div>
        <div className="relative flex-1">
          <Carousel setApi={setEmblaApi}>
            <CarouselContent className="">
              {products?.map((product) => (
                <CarouselItem key={product._id} className="">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-80 w-full rounded-md object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="absolute top-1/2 left-2 z-10 -translate-y-1/2 transform" />
            <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 transform" />
          </Carousel>
          {currentProduct && (
            <div className="mt-4 flex justify-between gap-2 rounded-md p-4">
              <div className="flex-1 space-y-2 py-3">
                <h3 className="text-lg font-bold">{currentProduct.name}</h3>
                <p className="py-3 pl-4 text-left font-semibold">
                  {currentProduct.price.toLocaleString()} تومان
                </p>
                <p className="line-clamp-2 max-w-md text-sm">{currentProduct.description}</p>
              </div>

              <div className="">
                <div className="flex items-center gap-2 py-3">
                  <Star className="h-4 w-4" />
                  <span className="text-muted-foreground">امتیاز:</span>
                  <span>{currentProduct.rating}</span>
                </div>
                <div className="flex items-center gap-2 py-3">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="text-muted-foreground">تعداد:</span>
                  <span>{currentProduct.numReviews}</span>
                </div>
                <div className="flex items-center gap-2 py-3">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="text-muted-foreground">موجودی:</span>
                  <span>{currentProduct.countInStock}</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 py-3">
                  <Store className="h-4 w-4" />
                  <span className="text-muted-foreground">برند:</span>
                  <span>{currentProduct.category?.name || "بدون برند"}</span>
                </div>
                <div className="flex items-center gap-2 py-3">
                  <Clock4 className="h-4 w-4" />
                  <span className="text-muted-foreground">آخرین بروزرسانی:</span>
                  <span>{new Date(currentProduct.updatedAt).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 py-3">
                  <Star className="h-4 w-4"></Star>
                  <p className="text-muted-foreground">نظرات:</p>
                  <p>{currentProduct.numReviews}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>
      <div className="my-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">محصولات ویژه</h2>
          <Button onClick={() => navigate("/shop")}>فروشگاه</Button>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-4">
          {products?.slice(0, 4).map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite(product._id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default App;
