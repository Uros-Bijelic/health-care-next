import { updateUser } from '@/lib/actions/users';
import { QUERY_KEYS } from '@/lib/constants';
import { UserProfile } from '@/lib/validation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

interface IMutationFnArgs {
  data: UserProfile;
}

export const useUpdateUser = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const queryClent = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: IMutationFnArgs) => updateUser(data, userId || ''),
    onSuccess() {
      queryClent.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS, userId],
      });
    },
  });
};
