import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ProductCardProps = {
  size?: "small" | "large";
  name: string;
  price: string;
  imageUrl: string;
};
export function ProductCard({
  size = "large",
  name,
  price,
  imageUrl,
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
    <div className={`${imageSize.width}`}>
      <Card className={`overflow-hidden rounded-lg ${imageSize.height}`}>
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover "
        />
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
