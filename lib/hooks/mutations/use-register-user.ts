import { EFirestoreCollections, EUserRole } from '@/lib/constants';
import { firebaseInstance } from '@/lib/firebase';
import { errorMessageGenerator } from '@/utils/error-handling';
import { useMutation } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, FirestoreError, serverTimestamp, setDoc } from 'firebase/firestore';

// ----------------------------------------------------------------

interface IMutationFnArgs {
  password: string;
  userName: string;
  email: string;
  role: EUserRole;
}

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async ({ password, userName, email, role }: IMutationFnArgs) => {
      try {
        const auth = firebaseInstance.getAuth();
        const db = firebaseInstance.getDb();

        const response = await createUserWithEmailAndPassword(auth, email, password);

        const userDocRef = doc(db, EFirestoreCollections.USERS, response.user.uid);

        await setDoc(userDocRef, {
          id: response.user.uid,
          userName,
          email,
          role,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        console.log('Error in registerUser function', error);
        if (error instanceof FirebaseError) {
          if (error instanceof FirestoreError) {
            const errorMessage = errorMessageGenerator.getFirestoreErrorMessage(error.code);
            throw new Error(errorMessage);
          } else {
            const errorMessage = errorMessageGenerator.getAuthErrorMessage(error.code);
            throw new Error(errorMessage);
          }
        }
        throw new Error('An unexpected error occurred');
      }
    },
  });
};
