import { fetchUsersWithLimit } from '@/lib/api/users';
import { FIRESTORE_COLLECTIONS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

type HookArgs = {
  query: string;
  limit: number;
};

export const useFetchUsersWithLimit = ({ query, limit = 10 }: HookArgs) => {
  return useQuery({
    queryKey: [FIRESTORE_COLLECTIONS, query, limit],
    queryFn: () => fetchUsersWithLimit(query, limit),
    enabled: !!query,
  });
};
