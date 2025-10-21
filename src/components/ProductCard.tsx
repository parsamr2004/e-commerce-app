import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { Product } from "@/types/product.model";
import { LucideHeart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  toggleFavorite: (product: Product) => void;
  isFavorite: boolean;
}

const ProductCard = ({ product, toggleFavorite, isFavorite }: ProductCardProps) => {
  return (
    <Card className="h-full w-full overflow-hidden p-0">
      <CardContent className="relative p-0">
        <img src={product.image} alt={product.name} className="h-40 w-full object-cover" />
        <Button
          className={`absolute top-2 right-2 ${
            isFavorite
              ? "[&_.lucide-heart]:text-muted [&_.lucide-heart]:fill-muted"
              : "text-background"
          }`}
          size="icon"
          variant="default"
          aria-label="Favorite"
          onClick={() => toggleFavorite(product)}
        >
          <LucideHeart />
        </Button>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-5 p-3">
        <Label className="line-clamp-2 text-sm font-medium">{product.name}</Label>
        <Badge className="px-3 py-1">{product.price.toLocaleString()} تومان</Badge>
      </CardFooter>
    </Card>
  );
};
export default ProductCard;
