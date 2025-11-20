import { axiosInstance } from '@/lib/utils';
import type { User } from '@/types/user.admin';
import { useQuery } from '@tanstack/react-query';

const useUsersAdmin = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => axiosInstance.get<User[]>('users').then((res) => res.data),
  });
};

export default useUsersAdmin;