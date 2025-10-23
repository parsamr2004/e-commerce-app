import { axiosInstance } from "@/lib/utils";
import type { ProfilePayload, ProfileResponse, ErrorMessage } from "@/types/profile.model";
import { useMutation, useQuery } from "@tanstack/react-query";

const useUpdateProfile = () => {
  return useMutation<ProfileResponse, ErrorMessage, ProfilePayload>({
    mutationFn: async (formValue: ProfilePayload) => {
      const { data } = await axiosInstance.put("users/profile", formValue);
      return data;
    },
  });
};

export const useProfile = () => {
  return useQuery<ProfilePayload>({
    queryKey: ["profile"], // unique key for caching
    queryFn: async () => {
      const { data } = await axiosInstance.get("users/profile");
      return data;
    },
  });
};

export default useUpdateProfile;
