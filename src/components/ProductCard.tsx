import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

type ProductCardProps = {
  id: number;
  size?: "small" | "large";
  name: string;
  price: string;
  imageUrl: string;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
};
export function ProductCard({
  id,
  size = "small",
  name,
  price,
  imageUrl,
  isFavorite = false,
  onToggleFavorite,
}: ProductCardProps) {
  const sizes = {
    small: {
      width: "w-[350px]",
      height: "h-[296px]",
    },
    large: {
      width: "w-[404px]",
      height: "h-[346px]",
    },
  };
  const imageSize = sizes[size];
  return (
    <div className={`${imageSize.width} relative font-[IranYekan]`}>
      <Card
        className={`overflow-hidden rounded-lg ${imageSize.height} relative`}
      >
        <button
          onClick={() => onToggleFavorite?.(id)}
          aria-label={
            isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"
          }
          className="absolute top-2 right-2 z-10 bg-card rounded-full p-1 shadow-md transition hover:scale-110"
        >
          <Heart
            className={`w-5 h-5 transition-colors ease-in-out ${
              isFavorite
                ? "text-red-500 fill-red-500 scale-110"
                : "text-muted-foreground fill-transparent scale-100"
            }`}
          />
        </button>
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </Card>

      <div className="flex items-center justify-between pt-4 px-2">
        <p className="text-sm font-medium text-right">{name}</p>
        <Badge className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs">
          {price}
        </Badge>
      </div>
    </div>
  );
}
