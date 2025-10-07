import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { LucideTrash2 } from "lucide-react";

interface ProductCardItemprops {
  version: string;
  name: string;
  price: string;
  url: string;
}

const ProductCardItem = (props: ProductCardItemprops) => {
  const { version, name, price, url } = props;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <div className="w-[88px] h-[88px]">
          <img src={url} alt="" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-primary">{version}</span>
          <span>{name}</span>
          <span className="font-bold">{price} تومان</span>
        </div>
      </div>
      <div>
        <div className="flex gap-2 justify-end">
          <Select>
            <SelectTrigger className="w-[96px] border-input bg-white shadow-none cursor-pointer">
              <SelectValue placeholder="1" />
            </SelectTrigger>
            <SelectContent
              side="right"
              className="cursor-pointer w-[var(--radix-select-trigger-width)]"
            >
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
            </SelectContent>
          </Select>
          <Button className="cursor-pointer" size="icon" variant="ghost">
            <LucideTrash2 className="text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardItem;
