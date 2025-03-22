import { UserProfileSchemaDTO } from '@/components/features/user/ProfileEdit';
import { getCurrentUser } from '@/lib/api/users';
import { EQueryKeys } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useFetchUser = () => {
  const { data: session } = useSession();

  return useQuery<Partial<UserProfileSchemaDTO>>({
    queryKey: [EQueryKeys.USER, session?.user?.id],
    queryFn: () => getCurrentUser(session?.user?.id || ''),
    enabled: !!session?.user?.id,
  });
};
