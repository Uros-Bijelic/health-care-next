import { firebaseInstance } from '@/lib/firebase';
import { authErrorMessages, getAuthErrorMessage } from '@/utils/error-handling';
import { useMutation } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';

interface IMutationFnArgs {
  email: string;
  password: string;
}

export const useLoginUser = () => {
  return useMutation({
    mutationFn: async ({ email, password }: IMutationFnArgs) => {
      try {
        const auth = firebaseInstance.getAuth();

        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        if (error instanceof FirebaseError) {
          const errorMessage = getAuthErrorMessage(error.code as keyof typeof authErrorMessages);

          throw new Error(errorMessage);
        }
        throw new Error('An unexpected error occurred');
      }
    },
  });
};
