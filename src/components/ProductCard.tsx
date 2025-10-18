import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { Product } from "@/types/product.model";
import { LucideHeart } from "lucide-react";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="overflow-hidden p-0">
      <CardContent className="relative p-0">
        <img src={product.image} alt={product.name} className="rounded object-cover" />
        <Button
          className="text-background absolute top-2 right-2"
          size="icon"
          variant="default"
          aria-label="Favorite"
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
