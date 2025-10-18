import ShopCard from "@/components/ShopCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useProducts from "@/hooks/use-products";

interface RadioItemType {
  valueItem: string;
  textItem: string;
}

const RadioItem = (props: RadioItemType) => {
  const { valueItem, textItem } = props;
  return (
    <div className="text-foreground mx-3 flex justify-end space-x-2">
      <Label htmlFor={valueItem} className="text-[12px] font-light">
        {textItem}
      </Label>
      <RadioGroupItem value={valueItem} id="option-one" className="bg-white" />
    </div>
  );
};

const ShopPage = () => {
  const { data: products } = useProducts();
  console.log(products);

  return (
    <div className="flex">
      {/* bg-base-side */}
      <div className="bg-base-side w-full max-w-[264px]">
        <RadioGroup className="mx-3 my-7">
          <p className="bg-card text-foreground rounded-2xl px-10 py-1 text-center text-[14px]">
            فیلتر برند
          </p>
          <RadioItem valueItem="option_one" textItem="Option One"></RadioItem>
          <RadioItem valueItem="option_two" textItem="Option Two"></RadioItem>
        </RadioGroup>
        <div className="mx-3 flex flex-col items-center">
          <label className="bg-card text-foreground bg-color w-full rounded-2xl px-10 py-2 text-center text-[14px]">
            فیلتر قیمت
          </label>
          <input
            type="text"
            className="placeholder:font-ligh bg-card text-secoundry m-5 rounded-xl px-2.5 py-2 placeholder:text-[10px]"
            placeholder="قیمت را وارد نمایید"
          />
        </div>
        {/* <button className="mt-4 border border-gray-400   rounded-sm mx-auto block px-14 ">حذف فیلتر</button> */}
        <Button
          size="lg"
          className="bg-base-side text-foreground mx-auto mt-4 block rounded-sm border border-gray-400 px-14"
        >
          حذف فیلتر
        </Button>
      </div>
      <div className="mx-8 mr-16 mb-[92px] grid grid-cols-3 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products?.map((product) => (
          <ShopCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
