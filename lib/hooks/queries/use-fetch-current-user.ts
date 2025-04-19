import { fetchCurrentUser } from '@/lib/api/users';
import { QUERY_KEYS } from '@/lib/constants';
import { UserProfileDTO } from '@/lib/validation';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useFetchCurrentUser = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  return useQuery<Partial<UserProfileDTO>>({
    queryKey: [QUERY_KEYS.USERS, session?.user?.id],
    queryFn: () => fetchCurrentUser(userId || ''),
    enabled: !!userId,
  });
};
