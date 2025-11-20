import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ShopCard from "@/components/ShopCard";
import useCategory from "@/hooks/use_category";
import { useState } from "react";
import { useFilteredProducts } from "@/hooks/use-product-filter";
import useFavorites from "@/hooks/use-favorites";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    if (isSelected) setSelectedCategories((prev) => prev.filter((id) => id !== valueItem));
    else setSelectedCategories((prev) => [...prev, valueItem]);
  };

  return (
    <div className="mx-3 flex items-center justify-end gap-2">
      <Label htmlFor={valueItem} className="text-xs font-light">
        {textItem}
      </Label>
      <RadioGroupItem
        onClick={handleChange}
        value={valueItem}
        checked={isSelected}
        id={valueItem}
        className="bg-background"
      />
    </div>
  );
};

const ShopPage = () => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { data: categories } = useCategory();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000000]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12);
  const [showFilters, setShowFilters] = useState(false);

  const filters = { categories: selectedCategories, price: priceRange, page, size };
  const { data: products, isFetching } = useFilteredProducts(filters);

  const category_map: Record<string, string> = {};
  categories?.forEach((category) => {
    category_map[category._id] = category.name;
  });

  const handleCleanFilter = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000000000]);
    setPage(1);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-base font-semibold sm:text-lg">فروشگاه</h1>
        <Button variant="outline" className="lg:hidden" onClick={() => setShowFilters((s) => !s)}>
          فیلترها
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-auto rounded-2xl border p-4">
            <div className="space-y-3">
              <p className="rounded-xl border px-4 py-2 text-center text-sm">فیلتر برند</p>
              <RadioGroup dir="rtl" className="space-y-2">
                {categories?.map((category) => (
                  <RadioItem
                    key={category._id}
                    valueItem={category._id}
                    textItem={category.name}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                  />
                ))}
              </RadioGroup>
            </div>

            <div className="mt-5 space-y-3">
              <p className="rounded-xl border px-4 py-2 text-center text-sm">فیلتر قیمت</p>
              <input
                type="number"
                inputMode="numeric"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([+e.target.value || 0, priceRange[1]])}
                className="w-full rounded-xl border px-3 py-2 text-sm"
                placeholder="حداقل قیمت"
              />
              <input
                type="number"
                inputMode="numeric"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], +e.target.value || 0])}
                className="w-full rounded-xl border px-3 py-2 text-sm"
                placeholder="حداکثر قیمت"
              />
              <Button size="lg" variant="outline" className="w-full" onClick={handleCleanFilter}>
                حذف فیلتر
              </Button>
            </div>
          </div>
        </aside>

        <main>
          <div className="mb-4 lg:hidden">
            {showFilters && (
              <div className="max-h-[70vh] overflow-auto rounded-2xl border p-4">
                <div className="space-y-3">
                  <p className="rounded-xl border px-4 py-2 text-center text-sm">فیلتر برند</p>
                  <RadioGroup dir="rtl" className="flex flex-wrap justify-end gap-2">
                    {categories?.map((category) => (
                      <RadioItem
                        key={category._id}
                        valueItem={category._id}
                        textItem={category.name}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                      />
                    ))}
                  </RadioGroup>
                </div>
                <div className="mt-5 space-y-3">
                  <p className="rounded-xl border px-4 py-2 text-center text-sm">فیلتر قیمت</p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input
                      type="number"
                      inputMode="numeric"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([+e.target.value || 0, priceRange[1]])}
                      className="w-full rounded-xl border px-3 py-2 text-sm"
                      placeholder="حداقل قیمت"
                    />
                    <input
                      type="number"
                      inputMode="numeric"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], +e.target.value || 0])}
                      className="w-full rounded-xl border px-3 py-2 text-sm"
                      placeholder="حداکثر قیمت"
                    />
                  </div>
                  <Button size="sm" variant="outline" className="w-full" onClick={handleCleanFilter}>
                    حذف فیلتر
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))] sm:[grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
            {isFetching ? (
              <div className="col-span-full flex items-center justify-center py-10 text-sm">
                در حال بارگذاری...
              </div>
            ) : (
              products?.map((product) => (
                <ShopCard
                  key={product._id}
                  product={product}
                  categoryName={category_map[product.category.name]}
                  toggleFavorite={toggleFavorite}
                  isFavorite={isFavorite(product._id)}
                />
              ))
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <div className="inline-flex items-stretch overflow-hidden rounded-xl border">
              <Button
                variant="ghost"
                size="icon"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-none"
                aria-label="قبلی"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div className="flex items-center px-4 text-sm">صفحه {page}</div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPage((p) => p + 1)}
                className="rounded-none"
                aria-label="بعدی"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">نمایش در هر صفحه:</span>
              <Select
                value={String(size)}
                onValueChange={(v) => {
                  const n = Number(v) || 12;
                  setSize(n);
                  setPage(1);
                }}
              >
                <SelectTrigger className="h-9 w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="w-24">
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="16">16</SelectItem>
                  <SelectItem value="24">24</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopPage;


