import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { ProductModel } from "@/types/product.model";
import { LucideHeart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useUser from "@/hooks/use-user";

interface ProductCardProps {
  product: ProductModel;
  toggleFavorite: (product: ProductModel) => void;
  isFavorite: boolean;
}

const ProductCard = ({ product, toggleFavorite, isFavorite }: ProductCardProps) => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useUser();

  const handleCardClick = () => localStorage.getItem('id')? navigate(`/products/${product._id}`): navigate("/login");

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLoading) return;
    if (!user || !user._id) return navigate("/login");
    toggleFavorite(product);
  };

  return (
    <Card
      className="
        group relative h-full w-full overflow-hidden rounded-2xl border p-0
        transition hover:shadow-md focus-within:ring-2 focus-within:ring-primary
      "
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? handleCardClick() : null)}
    >
      <CardContent className="relative p-0">
        <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-[5/4]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Button
            size="icon"
            variant="secondary"
            aria-label="افزودن به علاقه‌مندی"
            onClick={handleFavoriteClick}
            className={`
              absolute right-2 top-2 z-10 rounded-full border bg-background/80 backdrop-blur
              transition hover:scale-110
              ${isFavorite ? "[&_.lucide-heart]:fill-current" : ""}
              [&_.lucide-heart]:h-5 [&_.lucide-heart]:w-5
            `}
          >
            <LucideHeart className={isFavorite ? "" : "text-muted-foreground"} />
          </Button>
        </div>
      </CardContent>

      <CardFooter
        className="
          flex flex-col justify-between gap-3 p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-4
        "
      >
        <Label className="line-clamp-2 min-h-[2.5rem] w-full text-start text-sm font-medium leading-tight sm:text-base">
          {product.name}
        </Label>
        <Badge
          className="
            self-start whitespace-nowrap rounded-lg px-3 py-1 text-xs sm:self-end sm:text-sm
          "
        >
          {Math.round(product.price).toLocaleString()} تومان
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

