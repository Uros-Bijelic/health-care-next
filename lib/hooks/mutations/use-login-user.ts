import { firebaseInstance } from '@/lib/firebase';
import { errorMessageGenerator } from '@/utils/error-handling';
import { useMutation } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';

// ----------------------------------------------------------------

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
        // ? Da li je potrebno proveravati sve errore ili samo neke kao email? Da li onda praviti neku klasu gde cu imati sve error.code i njihove specificne greske ali formatirane u  userfriendly formatu??? (ovo je vise primer, da li moram da proveravam pojedinacno ili mogu da setujem u error ceo error.message i samo da renderujem?)
        if (error instanceof FirebaseError) {
          const errorMessage = errorMessageGenerator.getAuthErrorMessage(error.code);

          throw new Error(errorMessage);
        }
        throw new Error('An unexpected error occurred');
      }
    },
  });
};
