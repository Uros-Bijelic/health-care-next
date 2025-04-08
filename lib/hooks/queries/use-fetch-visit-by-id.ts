import { fetchVisitById } from '@/lib/api/visits';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

export const useFetchById = (visitId: string) => {
  return useQuery({ queryKey: [QUERY_KEYS.VISITS], queryFn: () => fetchVisitById(visitId) });
};
