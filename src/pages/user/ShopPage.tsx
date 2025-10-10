import { Button } from "@/components/ui/button";
import Layout from "@/Layout";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
      <div className="flex">
         {/* bg-base-side */}
        <div className="max-w-[264px] w-full bg-base-side">
          <RadioGroup className="my-7 mx-3">
            <p className="bg-card text-foreground rounded-2xl py-1 px-10 text-center text-[14px]">فیلتر برند</p>
            <RadioItem valueItem="option_one" textItem="Option One"></RadioItem>
            <RadioItem valueItem="option_two" textItem="Option Two"></RadioItem>
          </RadioGroup>
          <div className="flex flex-col items-center mx-3">
            <label className="bg-card text-foreground py-2 px-10 rounded-2xl w-full text-center text-[14px] bg-color">فیلتر قیمت</label>
            <input type="text" className="rounded-xl px-2.5 py-2 placeholder:text-[10px] placeholder:font-ligh bg-card text-secoundry m-5" placeholder="قیمت را وارد نمایید"/>
          </div>
          {/* <button className="mt-4 border border-gray-400   rounded-sm mx-auto block px-14 ">حذف فیلتر</button> */}
          <Button size="lg" className="mt-4 border border-gray-400 bg-base-side text-foreground rounded-sm mx-auto block px-14">حذف فیلتر</Button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-4 mr-16 mb-[92px] mx-8">
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
