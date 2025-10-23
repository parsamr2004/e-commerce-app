import { useState } from "react";
import { Link, useNavigate } from "react-router";
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
      <div className="h-full text-center font-bold">
        اطلاعات در حال بارگذاری میباشد، لطفا منتظر بمانید...
      </div>
    );
  if (error) return <div>Error loading product</div>;

  return (
    <section className="overflow-x-hidden">
      <article className="flex h-[550px] flex-wrap gap-6">
        <div className="grid h-[530px] max-w-[600px] flex-1 grid-cols-2 gap-4">
          {products?.slice(0, 4).map((product) => (
            // <Link to={`/products/${product._id}`} key={product._id}>
            <ProductCard
              key={product._id}
              product={product}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite(product._id)}
            />
            // </Link>
          ))}
        </div>
        <div className="h-[500px] flex-1">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={4}
            slidesPerView={1}
            loop={true}
            dir="rtl"
            onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
            onRealIndexChange={(swiper) => setCurrentIndex(swiper.realIndex)}
            className="w-[700px] rounded-md"
          >
            {products?.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="">
                  <Link to={`/products/${product._id}`} key={product._id}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-80 w-full rounded-md object-contain"
                    />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {currentProduct && (
            <div className="mt-4 grid grid-cols-[3fr_1fr_3fr] grid-rows-1 justify-center gap-2 p-4">
              <div className="">
                <h3 className="text-lg font-bold">{currentProduct.name}</h3>
                <p className="py-3 pl-4 text-left font-semibold">
                  {Math.round(currentProduct.price).toLocaleString()} تومان
                </p>
                <p className="line-clamp-2 text-sm">{currentProduct.description}</p>
              </div>

              <div className="">
                <div className="flex gap-1 py-3">
                  <Star className="h-4 w-4" />
                  <span className="text-muted-foreground">امتیاز:</span>
                  <span>{Math.round(currentProduct.rating)}</span>
                </div>
                <div className="flex gap-1 py-3">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="text-muted-foreground">تعداد:</span>
                  <span>{currentProduct.numReviews}</span>
                </div>
                <div className="flex gap-1 py-3">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="text-muted-foreground">موجودی:</span>
                  <span>{currentProduct.countInStock}</span>
                </div>
              </div>
              <div className="">
                <div className="flex gap-2 py-3">
                  <Store className="h-4 w-4" />
                  <span className="text-muted-foreground">برند:</span>
                  <span>{currentProduct.category?.name || "بدون برند"}</span>
                </div>
                <div className="flex gap-0 py-3">
                  <Clock4 className="h-4 w-4" />
                  <span className="text-muted-foreground">آخرین بروزرسانی:</span>
                  <span>
                    {formatDistanceToNow(new Date(currentProduct.updatedAt), {
                      addSuffix: true,
                      locale: faIR,
                    })}
                  </span>
                </div>
                <div className="flex gap-2 py-3">
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
        <div className="grid grid-cols-4 gap-4">
          {products?.map((product) => (
            // <Link to={`/products/${product._id}`} key={product._id}>
            <ProductCard
              key={product._id}
              product={product}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite(product._id)}
            />
            // </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default App;
