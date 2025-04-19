'use client';

import { createNewVisit } from '@/lib/api/visits';
import { QUERY_KEYS } from '@/lib/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export type AddVisitData = {
  patientId: string;
  firstName: string;
  lastName: string;
};

export const useCreateNewVisit = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const doctorId = session?.user.id;

  return useMutation({
    mutationFn: (data: AddVisitData) => createNewVisit(data, doctorId || ''),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VISITS] });
    },
  });
};
