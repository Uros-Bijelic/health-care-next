import { updateUser } from '@/lib/actions/mutations';
import { EQueryKeys } from '@/lib/constants';
import { firebaseInstance } from '@/lib/firebase';
import { IUserProfileSchema } from '@/lib/validation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// ----------------------------------------------------------------

interface IMutationFnArgs {
  data: IUserProfileSchema;
}

export const useUpdateUser = () => {
  const userId = firebaseInstance.getAuth().currentUser?.uid ?? '';

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
