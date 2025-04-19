import { fetchPatientVisits } from '@/lib/api/visits';
import { QUERY_KEYS } from '@/lib/constants';
import { UserVisitDTO } from '@/lib/validation';
import { useQuery } from '@tanstack/react-query';

type HookArgs = {
  patientId: string;
  initialVisits: UserVisitDTO[];
  searchQuery: string;
};

export const useFetchPatientVisits = ({ patientId, initialVisits, searchQuery }: HookArgs) => {
  return useQuery({
    queryKey: [QUERY_KEYS.VISITS, patientId, searchQuery],
    queryFn: () => fetchPatientVisits({ patientId, searchQuery }),
    placeholderData: initialVisits,
    // enabled: true,
  });
};
