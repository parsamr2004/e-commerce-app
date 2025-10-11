import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
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
        <div className="h-[88px] w-[88px]">
          <img src={url} alt="" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-primary">{version}</span>
          <span>{name}</span>
          <span className="font-bold">{price} تومان</span>
        </div>
      </div>
      <div>
        <div className="flex justify-end gap-2">
          <Select>
            <SelectTrigger className="border-input w-[96px] cursor-pointer bg-white shadow-none">
              <SelectValue placeholder="1" />
            </SelectTrigger>
            <SelectContent
              side="right"
              className="w-[var(--radix-select-trigger-width)] cursor-pointer"
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
