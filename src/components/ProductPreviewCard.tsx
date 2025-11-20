import useDeleteProduct from "@/hooks/use-delete-product";
import { persianDateFormat } from "@/lib/utils";
import { Trash, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ProductPreviewCardProps {
  _id: string;
  image: string;
  name: string;
  createdAt: string;
  description: string;
  price: number;
}

const ProductPreviewCard = (props: ProductPreviewCardProps) => {
  const { mutate: deleteProduct, isPending } = useDeleteProduct();
  const navigate = useNavigate();

  const handleDelete = (productId: string) => {
    const deleteToast = toast.loading("در حال حذف محصول");

    deleteProduct(productId, {
      onSuccess: () => {
        toast.success("محصول با موفقیت حذف شد", { id: deleteToast });
      },
      onError: () => {
        toast.error("حذف محصول ناموفق بود، لطفاً دوباره تلاش کنید", {
          id: deleteToast,
        });
      },
    });
  };

  return (
    <div className="flex w-full flex-col rounded-md bg-[#F8F9FA] p-3 shadow-sm dark:bg-gray-800 sm:flex-row">
      <div className="w-full max-h-48 overflow-hidden rounded-md sm:w-24 sm:flex-shrink-0">
        <img
          src={props.image}
          alt={props.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between px-0 py-3 sm:px-4 sm:py-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base font-semibold text-black dark:text-white">
            {props.name}
          </p>
          <p className="text-xs text-[#58616C] dark:text-gray-400 sm:text-sm">
            {persianDateFormat(props.createdAt)}
          </p>
        </div>

        <p className="mt-2 text-sm leading-snug text-[#58616C] dark:text-gray-400">
          {props.description.length > 100
            ? props.description.slice(0, 90) + "..."
            : props.description}
        </p>

        <div className="mt-3 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={() => navigate(`/products/${props._id}`)}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[#DB2777] px-3 py-2 text-sm text-white transition-colors hover:bg-[#871849] sm:w-auto"
          >
            مشاهده بیشتر
          </button>

          <div className="flex w-full items-center justify-between gap-3 sm:w-auto">
            <p className="text-sm font-bold text-black dark:text-white">
              {props.price.toLocaleString("fa-IR")} تومان
            </p>
            <div className="flex gap-1">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 hover:cursor-pointer hover:bg-[#871849] hover:text-white"
                onClick={() => navigate(props._id)}
              >
                <SquarePen />
              </button>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 hover:cursor-pointer hover:bg-[#871849] hover:text-white disabled:opacity-60"
                onClick={() => handleDelete(props._id)}
                disabled={isPending}
              >
                <Trash />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreviewCard;
