import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCartStore from "@/stores/use-cart-store";
import type { Product } from "@/types/product.model";
// import useCartStore from "@/stores/use-cart-store";
import { LucideTrash2 } from "lucide-react";

interface ProductCardItemprops {
  cartItem: Product;
}

const ProductCardItem = ({ cartItem }: ProductCardItemprops) => {
  const { name, image, price, _id, countInBasket, quantity } = cartItem;
  const { updateQuantity, removeFromCart } = useCartStore();
  // const  { cartItems, removeFromCart } = useCartStore(); 
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <div className="h-[88px] w-[88px]">
          <img src={image} alt="" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-primary">{name}</span>
          <span className="font-bold">{price} تومان</span>
        </div>
      </div>
      <div>
        <div className="flex justify-end gap-2">
          <Select onValueChange={(value) => updateQuantity(_id, +value)}>
                <SelectTrigger defaultValue={countInBasket} className="border-input w-[96px] cursor-pointer shadow-none">
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent
                  side="right"
                  className="w-[var(--radix-select-trigger-width)] cursor-pointer"
                >
                  {
                    Array.from({ length: Number(quantity) || 0 }).map((_, i) => (
                      <SelectItem key={i + 1} value={`${i + 1}`}>{i + 1}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
          <Button className="cursor-pointer" size="icon" variant="ghost" onClick={() => removeFromCart(_id)} >
            <LucideTrash2 className="text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardItem;
