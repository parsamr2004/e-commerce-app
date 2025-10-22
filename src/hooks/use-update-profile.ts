import { axiosInstance } from "@/lib/utils";
import type { ProfilePayload, ProfileResponse, ErrorMessage } from "@/types/profile.model";
import { useMutation } from "@tanstack/react-query";

const useUpdateProfile = () => {
  return useMutation<ProfileResponse, ErrorMessage, ProfilePayload>({
    mutationFn: async (formValue: ProfilePayload) => {
      const { data } = await axiosInstance.post("users/profile", formValue);
      return data;
    },
  });
};

export default useUpdateProfile;
