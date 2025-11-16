import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import useFavorites from "@/hooks/use-favorites";
import useProducts from "./hooks/use-products";
import { Button } from "@/components/ui/button";
import { Clock4, ShoppingBag, ShoppingCart, Star, Store } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { faIR } from "date-fns/locale";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const App = () => {
  const navigate = useNavigate();
  const { data: products, isLoading, error } = useProducts();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProduct = products?.[currentIndex];

  if (isLoading)
    return (
      <div className="mx-auto flex min-h-[50vh] w-full max-w-5xl items-center justify-center px-4 text-center text-sm font-semibold sm:text-base">
        اطلاعات در حال بارگذاری میباشد، لطفا منتظر بمانید...
      </div>
    );
  if (error) return <div className="px-4 py-8 text-center">Error loading product</div>;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <article className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="order-1 lg:order-2 flex flex-col">
          <div className="w-full overflow-hidden rounded-xl border">
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={8}
              slidesPerView={1}
              loop
              dir="rtl"
              onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
              onRealIndexChange={(swiper) => setCurrentIndex(swiper.realIndex)}
              className="w-full"
            >
              {products?.map((product) => (
                <SwiperSlide key={product._id}>
                  <Link to={localStorage.getItem('id')? `/products/${product._id}`: '/login'}>
                    <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 h-full w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {currentProduct && (
            <div className="mt-4 grid grid-cols-1 gap-3 rounded-xl border p-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <h3 className="text-base font-bold sm:text-lg">{currentProduct.name}</h3>
                <p className="py-2 text-left text-sm font-semibold sm:text-base">
                  {Math.round(currentProduct.price).toLocaleString()} تومان
                </p>
                <p className="line-clamp-2 text-xs sm:text-sm">{currentProduct.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-1">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span className="text-muted-foreground text-xs sm:text-sm">امتیاز:</span>
                  <span className="text-xs sm:text-sm">{Math.round(currentProduct.rating)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="text-muted-foreground text-xs sm:text-sm">تعداد:</span>
                  <span className="text-xs sm:text-sm">{currentProduct.numReviews}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="text-muted-foreground text-xs sm:text-sm">موجودی:</span>
                  <span className="text-xs sm:text-sm">{currentProduct.countInStock}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-1">
                <div className="flex items-center gap-2">
                  <Store className="h-4 w-4" />
                  <span className="text-muted-foreground text-xs sm:text-sm">برند:</span>
                  <span className="text-xs sm:text-sm">
                    {currentProduct.category?.name || "بدون برند"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock4 className="h-4 w-4" />
                  <span className="text-muted-foreground text-xs sm:text-sm">آخرین بروزرسانی:</span>
                  <span className="text-xs sm:text-sm">
                    {formatDistanceToNow(new Date(currentProduct.updatedAt), {
                      addSuffix: true,
                      locale: faIR,
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span className="text-muted-foreground text-xs sm:text-sm">نظرات:</span>
                  <span className="text-xs sm:text-sm">{currentProduct.numReviews}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="order-2 lg:order-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {products?.slice(0, 4).map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite(product._id)}
            />
          ))}
        </div>
      </article>

      <div className="my-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold sm:text-lg">محصولات ویژه</h2>
          <Button onClick={() => navigate("/shop")}>فروشگاه</Button>
        </div>

        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))] sm:[grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          {products?.map((product) => (
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

