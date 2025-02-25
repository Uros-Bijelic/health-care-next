import { typedFetch } from '@/lib/api';
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
        const APP_BASE_URL = process.env.LOCALHOST_API || '';
        const auth = firebaseInstance.getAuth();

        const response = await signInWithEmailAndPassword(auth, email, password);
        const token = await response.user.getIdToken();

        await typedFetch({ url: `${APP_BASE_URL}/api/auth`, method: 'POST', body: { token } });
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
