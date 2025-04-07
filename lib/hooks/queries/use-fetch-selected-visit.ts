import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

export const useFetchSelectedVisit = () => {
  return useQuery({ queryKey: [QUERY_KEYS.VISITS] });
};
