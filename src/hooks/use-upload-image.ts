import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateImagePayload, ImageResponseModel } from "@/types/image.model";
import { axiosInstance } from "@/lib/utils";
import { toast } from "sonner";

const useUploadImage = () => {
  const queryClient = useQueryClient();

  return useMutation<ImageResponseModel, Error, CreateImagePayload>({
    mutationFn: async (payload: CreateImagePayload) => {
      const formData = new FormData();
      formData.append("image", payload.image);

      const res = await axiosInstance.post<ImageResponseModel>("/upload", formData);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
      toast.success("عکس با موفقیت آپلود شد");
    },

    onError: (error) => {
      toast.error(`خطا در آپلود عکس: ${error.message || "دوباره تلاش کنید"}`);
    },
  });
};

export default useUploadImage;
