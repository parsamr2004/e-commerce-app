import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

const CreateProductPage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    }
  };
  return (
    <form action="" className="flex flex-col gap-5 px-12 py-7">
      <h1 className="text-right text-xl font-medium">محصول جدید</h1>
      {imageUrl && <img src={imageUrl} className="mx-auto h-[400px] max-w-[800px] w-full object-cover" />}
      <Label
        htmlFor="product-image"
        className="bg-popover flex h-[124px] cursor-pointer items-center justify-center rounded-md border border-dashed text-muted-foreground"
      >
        آپلود عکس
      </Label>

      <Input
        type="file"
        accept="image/*"
        className="hidden"
        id="product-image"
        onChange={handleFileChange}
      />

      <div className="flex flex-col gap-2">
        <Label>نام</Label>
        <Input className="bg-popover" placeholder="نام محصول را وارد نمایید"></Input>
      </div>

      <div className="flex justify-between">
        <div className="flex w-[49%] flex-col gap-2">
          <Label>قیمت</Label>
          <Input className="bg-popover" placeholder="قیمت محصول را وارد نمایید"></Input>
        </div>
        <div className="flex w-[49%] flex-col gap-2">
          <Label>برند</Label>
          <Input className="bg-popover" placeholder="برند محصول را وارد نمایید"></Input>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label>توضیحات</Label>
        <Textarea className="bg-popover h-[130px] resize-none" placeholder="توضیحات محصول را وارد نمایید"></Textarea>
      </div>

      <div className="flex justify-between">
        <div className="flex w-[49%] flex-col gap-2">
          <Label>تعداد قابل خرید</Label>
          <Input className="bg-popover" placeholder="تعداد قابل خرید را وارد نمایید"></Input>
        </div>
        <div className="flex w-[49%] flex-col gap-2">
          <Label>موجودی</Label>
          <Select>
            <SelectTrigger className="w-full bg-popover cursor-pointer flex-row-reverse">
                <SelectValue placeholder="موجودی"></SelectValue>
            </SelectTrigger>

            <SelectContent className="w-[var(--radix-select-trigger-width)]">
                <SelectItem value="in" className="flex-row-reverse">موجود</SelectItem>
                <SelectItem value="out" className="flex-row-reverse">ناموجود</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button className="self-start py-5 cursor-pointer" type="submit">ساخت محصول جدید</Button>
    </form>
  );
};

export default CreateProductPage;
