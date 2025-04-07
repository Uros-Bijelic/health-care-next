import { fetchUsersWithLimit } from '@/lib/api/users';
import { FIRESTORE_COLLECTIONS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

type HookArgs = {
  query: string;
  limit: number;
};

export const useFetchUsersWithLimit = ({ query, limit = 10 }: HookArgs) => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  return useQuery({
    queryKey: [FIRESTORE_COLLECTIONS, query, userId],
    queryFn: () => fetchUsersWithLimit(query, limit, userId || ''),
    enabled: !!userId,
  });
};
