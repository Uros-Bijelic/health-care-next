import { addPatient } from '@/lib/api/users';
import { QUERY_KEYS } from '@/lib/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

type QueryFnArg = { patientId: string };

export const useAddPatient = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const doctorId = session?.user.id;

  return useMutation({
    mutationFn: ({ patientId }: QueryFnArg) => addPatient(patientId, doctorId || ''),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },
  });
};
