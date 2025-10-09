import { Button } from "@/components/ui/button";
import Layout from "@/Layout";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input";
import ShopCard from "@/components/ShopCard";

interface RadioItemType {
  valueItem:string,
  textItem:string

}

const RadioItem = (props:RadioItemType) =>{
  const {valueItem, textItem} = props
  return (
    <div className="flex space-x-2 justify-end text-foreground mx-3">
            <Label htmlFor={valueItem} className="text-[12px] font-light">{textItem}</Label>
            <RadioGroupItem value={valueItem} id="option-one" className="bg-white" />
    </div>
  )

}

const ShopPage = () => {
  return (
    <Layout>
      <div className="border flex">
         {/* bg-base-side */}
        <div className="border max-w-[264px] w-full bg-base-side">
          <RadioGroup className="border my-7">
            <p className="bg-card text-foreground rounded-2xl py-1 px-10 text-center text-[14px]">فیلتر برند</p>
            <RadioItem valueItem="option_one" textItem="Option One"></RadioItem>
            <RadioItem valueItem="option_two" textItem="Option Two"></RadioItem>
          </RadioGroup>
          <div className="flex flex-col items-center">
            <label className="bg-card text-foreground py-2 px-10 rounded-2xl w-full text-center text-[14px]">فیلتر قیمت</label>
            <input type="text" className="rounded-xl px-2.5 py-2 placeholder:text-[10px] placeholder:font-ligh bg-white text-secoundry m-5" placeholder="قیمت را وارد نمایید"/>
          </div>
          <Button size="lg"  className="mt-4 border w-full bg-card text-foreground">حذف فیلتر</Button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-4 mr-16 mb-[92px]">
          <ShopCard></ShopCard>
          <ShopCard></ShopCard>
          <ShopCard></ShopCard>
          <ShopCard></ShopCard>
          <ShopCard></ShopCard>
          <ShopCard></ShopCard>
          <ShopCard></ShopCard>

        </div>
        
      </div>
        
    </Layout>
  )
  ;
};

export default ShopPage;
