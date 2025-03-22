import { UserProfile } from '@/components/features/user/profile-edit';
import { updateUser } from '@/lib/actions/users';
import { EQueryKeys } from '@/lib/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

interface IMutationFnArgs {
  data: UserProfile;
}

export const useUpdateUser = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id || '';

  const queryClent = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: IMutationFnArgs) => updateUser(data, userId),
    onSuccess() {
      queryClent.invalidateQueries({
        queryKey: [EQueryKeys.USER, userId],
      });
    },
  });
};
