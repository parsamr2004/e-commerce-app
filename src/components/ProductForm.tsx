import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import type { CategoryResponseModel } from "@/types/category.model";
import type { CreateProductPayload } from "@/types/product.model";

interface ProductFormProps {
  formData: CreateProductPayload;
  uploadedImageUrl?: string;
  status: "idle" | "pending" | "success" | "error";
  categories: CategoryResponseModel[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (value: string) => void;
  onQuantityChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  formType: "Create" | "Edit";
}

const baseUrl = "https://qbc9.liara.run/uploads/";

const ProductForm: React.FC<ProductFormProps> = ({
  formData,
  uploadedImageUrl,
  status,
  categories,
  onChange,
  onFileChange,
  onCategoryChange,
  onQuantityChange,
  onSubmit,
  formType,
}) => {
  const isCreate = formType === "Create";
  const isPending = status === "pending";

  const submitLabel = isCreate
    ? isPending
      ? "در حال ساخت..."
      : "ساخت محصول جدید"
    : isPending
      ? "در حال ویرایش..."
      : "ویرایش محصول";

  const imageSrc =
    uploadedImageUrl || formData.image
      ? baseUrl + (uploadedImageUrl || formData.image)
      : undefined;

  return (
    <div className="flex flex-1 justify-center px-4 py-6 sm:py-8">
      <div className="w-full max-w-4xl">
        <h2 className="mb-4 text-center text-lg font-bold sm:text-xl">
          {isCreate ? "محصول جدید" : "ویرایش محصول"}
        </h2>

        <section className="mb-6 sm:mb-8">
          <label className="mb-2 block text-sm sm:text-base">
            عکس محصول
          </label>
          <label
            htmlFor="product-image"
            className="flex h-24 w-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-200 bg-white text-center text-sm text-gray-500 dark:bg-neutral-800 sm:text-base"
          >
            آپلود عکس
          </label>
          <Input
            id="product-image"
            type="file"
            className="hidden"
            onChange={onFileChange}
          />

          {imageSrc && (
            <div className="mt-4 w-full max-w-md mx-auto">
              <img
                src={imageSrc}
                alt="Uploaded"
                className="h-64 w-full rounded-lg object-cover shadow-md sm:h-72 md:h-80"
              />
            </div>
          )}
        </section>

        <form className="space-y-5 sm:space-y-6" onSubmit={onSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm sm:text-base">نام</label>
              <Input
                type="text"
                name="name"
                placeholder="نام محصول"
                className="py-4 text-sm dark:bg-neutral-800 sm:py-6 sm:text-md"
                value={formData.name}
                onChange={onChange}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm sm:text-base">قیمت</label>
              <Input
                name="price"
                placeholder="قیمت محصول"
                className="py-4 text-sm dark:bg-neutral-800 sm:py-6 sm:text-md"
                value={formData.price}
                onChange={onChange}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm sm:text-base">توضیحات</label>
            <textarea
              name="description"
              placeholder="توضیحات محصول"
              rows={4}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-4 text-sm dark:bg-neutral-800 sm:py-6 sm:text-md"
              value={formData.description}
              onChange={onChange}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
            <div>
              <label className="mb-1 block text-sm sm:text-base">
                دسته‌بندی
              </label>
              <Select
                onValueChange={onCategoryChange}
                value={formData.category}
              >
                <SelectTrigger
                  className="h-12 w-full bg-white text-right text-sm sm:h-14 sm:text-md"
                  dir="rtl"
                >
                  <SelectValue placeholder="انتخاب دسته‌بندی" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat: CategoryResponseModel) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-1 block text-sm sm:text-base">موجودی</label>
              <Select
                value={formData.quantity.toString()}
                onValueChange={onQuantityChange}
              >
                <SelectTrigger
                  className="h-12 w-full bg-white text-right text-sm sm:h-14 sm:text-md"
                  dir="rtl"
                >
                  <SelectValue placeholder="انتخاب موجودی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 flex justify-center sm:mt-8">
            <Button
              type="submit"
              className="w-full max-w-xs py-4 text-sm sm:py-6 sm:text-md"
              disabled={isPending}
            >
              {submitLabel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;


