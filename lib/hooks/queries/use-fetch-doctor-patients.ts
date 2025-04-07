import { fetchDoctorPatients } from '@/lib/api/users';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

type HookArgs = {
  query: string;
  limit: number;
};

export const useFetchDoctorPatients = ({ query, limit }: HookArgs) => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  return useQuery({
    queryKey: [QUERY_KEYS.USERS, userId, query, limit],
    queryFn: () => fetchDoctorPatients(userId || '', query, limit),
    enabled: !!userId,
  });
};
