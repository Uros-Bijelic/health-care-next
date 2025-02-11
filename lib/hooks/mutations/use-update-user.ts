import { useAuthContext } from '@/context/AuthContext';
import { updateUser } from '@/lib/actions/mutations';
import { EQueryKeys } from '@/lib/constants';
import { IUserProfileSchema } from '@/lib/validation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// ----------------------------------------------------------------

interface IMutationFnArgs {
  data: IUserProfileSchema;
}

export const useUpdateUser = () => {
  const userId = useAuthContext().user?.uid ?? '';
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
