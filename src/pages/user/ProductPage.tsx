import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const ProductCard = ({ size = "small" }) => {
  const styles =
    size === "large"
      ? {
          width: "var(--product-card-width-large)",
          height: "var(--product-card-height-large)",
        }
      : {
          width: "var(--product-card-width-small)",
          height: "var(--product-card-height-small)",
        };
  return (
    <div style={styles}>
      <Card style={styles} className="  bg-muted-foreground p-1">
        <Button
          className="text-background bg-muted-foreground "
          size="icon"
          variant="link"
          aria-label="Favorite"
        >
          <Heart className="transition-colors ease-in-out"></Heart>
        </Button>
        <img
          src=""
          alt="Product"
          className="w-full h-full object-cover rounded"
        />
      </Card>
      <div className="flex items-center justify-between pt-4 px-2">
        <Label className="text-sm font-medium ">Apple iPad Pro 12.9-inch</Label>
        <Badge className="px-3 py-1 ">۱۰,۰۰۰ تومان</Badge>
      </div>
    </div>
  );
};
