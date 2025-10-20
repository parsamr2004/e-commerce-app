import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ShopCard from "@/components/ShopCard";
import useCategory from "@/hooks/use_category";
import { useState } from "react";
import { useFilteredProducts } from "@/hooks/use-product-filter";

interface RadioItemType {
  valueItem: string;
  textItem: string;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const RadioItem = (props: RadioItemType) => {
  const { valueItem, textItem, selectedCategories, setSelectedCategories } = props;
  const isSelected = selectedCategories.includes(valueItem);

  const handleChange = () => {
    if (isSelected) {
      setSelectedCategories((prev) => prev.filter((id) => id !== valueItem));
    } else {
      setSelectedCategories((prev) => [...prev, valueItem]);
    }
  };

  return (
    <div className="text-foreground mx-3 flex justify-end space-x-2">
      <Label htmlFor={valueItem} className="text-[12px] font-light">
        {textItem}
      </Label>
      <RadioGroupItem
        onClick={handleChange}
        value={valueItem}
        checked={isSelected}
        id={valueItem}
        className="bg-white"
      />
    </div>
  );
};

const ShopPage = () => {
  // const { data: products } = useProducts();
  const { data: categories } = useCategory();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000000]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const filters = { categories: selectedCategories, price: priceRange, page, size };
  const { data: products, isFetching } = useFilteredProducts(filters);
  const category_map: Record<string, string> = {};
  categories?.forEach((category) => {
    category_map[category._id] = category.name;
  });

  const handleCleanFilter = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000000000]);
  };

  return (
    <div className="flex">
      {/* bg-base-side */}
      <div className="bg-base-side w-full max-w-[264px]">
        <RadioGroup className="mx-3 my-7">
          <p className="bg-card text-foreground rounded-2xl px-10 py-1 text-center text-[14px]">
            فیلتر برند
          </p>
          {categories?.map((category) => (
            <RadioItem
              key={category._id}
              valueItem={category._id}
              textItem={category.name}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            ></RadioItem>
          ))}
        </RadioGroup>
        <div className="mx-3 flex flex-col items-center">
          <label className="bg-card text-foreground bg-color w-full rounded-2xl px-10 py-2 text-center text-[14px]">
            فیلتر قیمت
          </label>
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="placeholder:font-ligh bg-card text-secoundry m-5 rounded-xl px-2.5 py-2 placeholder:text-[10px]"
            placeholder="حداقل قیمت را وارد نمایید"
          />
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="placeholder:font-ligh bg-card text-secoundry m-5 rounded-xl px-2.5 py-2 placeholder:text-[10px]"
            placeholder="حداکثر قیمت را وارد نمایید"
          />
        </div>
        <Button
          size="lg"
          className="bg-base-side text-foreground mx-auto mt-4 block rounded-sm border border-gray-400 px-14"
          onClick={handleCleanFilter}
        >
          حذف فیلتر
        </Button>
      </div>
      <div className="mx-8 mr-16 mb-[92px] grid grid-cols-3 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {isFetching ? (
          <p>در حال بارگذاری...</p>
        ) : (
          products?.map((product) => (
            <ShopCard
              key={product._id}
              product={product}
              categoryName={category_map[product.category]}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ShopPage;
