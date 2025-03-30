import { fetchDoctorPatients } from '@/lib/api/users';
import { FIRESTORE_COLLECTIONS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useFetchDoctorPatients = () => {
  const { data: session } = useSession();
  const userId = session?.user.id || '';

  return useQuery({
    queryKey: [FIRESTORE_COLLECTIONS.USERS, userId],
    queryFn: () => fetchDoctorPatients(userId),
    enabled: !!userId,
  });
};
