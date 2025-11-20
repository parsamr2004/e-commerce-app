import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCartStore from "@/stores/use-cart-store";
import type { ProductModel } from "@/types/product.model";
import { LucideTrash2 } from "lucide-react";

interface ProductCardItemprops {
  cartItem: ProductModel;
}

const ProductCardItem = ({ cartItem }: ProductCardItemprops) => {
  const { name, image, price, _id, countInStock, quantity } = cartItem;
  const { updateQuantity, removeFromCart } = useCartStore();

  const qty = Number(quantity) || 0;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border p-3 sm:p-4">
      {/* Left: image + info */}
      <div className="flex items-start gap-3 sm:items-center sm:gap-5">
        <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
          <img
            src={image}
            className="h-full w-full object-cover"
            alt={name}
            loading="lazy"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-1">
          <span className="text-primary text-sm md:text-base line-clamp-2 break-words">
            {name}
          </span>
          <span className="font-bold text-sm md:text-base">
            {price.toLocaleString()} تومان
          </span>
        </div>
      </div>

      {/* Right: controls */}
      <div className="flex w-full flex-col-reverse gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
        <Button
          className="w-full sm:w-auto"
          size="icon"
          variant="ghost"
          aria-label="حذف از سبد"
          onClick={() => removeFromCart(_id)}
        >
          <LucideTrash2 className="text-destructive" />
        </Button>

        <Select
          defaultValue={String(countInStock)}
          onValueChange={(value) => updateQuantity(_id, +value)}
        >
          <SelectTrigger
            className="border-input h-10 w-full cursor-pointer shadow-none sm:w-24"
            aria-label="تعداد"
          >
            <SelectValue placeholder="1" />
          </SelectTrigger>

          <SelectContent
            side="right"
            className="w-[var(--radix-select-trigger-width)] cursor-pointer"
          >
            {Array.from({ length: qty }).map((_, i) => (
              <SelectItem key={i + 1} value={`${i + 1}`}>
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductCardItem;
