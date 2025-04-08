import { fetchPatientVisits } from '@/lib/api/visits';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

export const useFetchPatientVisits = (patientId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.VISITS, patientId],
    queryFn: () => fetchPatientVisits(patientId),
  });
};
