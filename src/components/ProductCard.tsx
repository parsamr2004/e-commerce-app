import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { Product } from "@/types/product.model";
import { LucideHeart } from "lucide-react";
import { useNavigate } from "react-router";
import useUser from "@/hooks/use-user";

interface ProductCardProps {
  product: Product;
  toggleFavorite: (product: Product) => void;
  isFavorite: boolean;
}

const ProductCard = ({ product, toggleFavorite, isFavorite }: ProductCardProps) => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useUser();

  const handleCardClick = () => {
    navigate(`/products/${product._id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLoading) return;

    if (!user || !user._id) {
      navigate("/login");
      return;
    }

    toggleFavorite(product);
  };
  return (
    <Card className="h-full w-full overflow-hidden p-0" onClick={handleCardClick}>
      <CardContent className="relative p-0">
        <img src={product.image} alt={product.name} className="h-50 w-full object-center" />
        <Button
          className={`absolute top-2 right-2 ${
            isFavorite
              ? "[&_.lucide-heart]:text-muted [&_.lucide-heart]:fill-muted"
              : "text-background"
          }`}
          size="icon"
          variant="default"
          aria-label="Favorite"
          // onClick={() => toggleFavorite(product)}
          onClick={handleFavoriteClick}
        >
          <LucideHeart />
        </Button>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-5 p-3">
        <Label className="line-clamp-2 text-sm font-medium">{product.name}</Label>
        <Badge className="px-3 py-1">{Math.round(product.price).toLocaleString()} تومان</Badge>
      </CardFooter>
    </Card>
  );
};
export default ProductCard;
