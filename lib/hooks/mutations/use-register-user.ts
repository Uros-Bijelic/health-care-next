import { typedFetch } from '@/lib/api';
import { EUserRole, FIRESTORE_COLLECTIONS } from '@/lib/constants';
import { firebaseInstance } from '@/lib/firebase';
// import { firebaseInstance } from '@/lib/firebase';
import {
  authErrorMessages,
  getAuthErrorMessage,
  getFirestoreErrorMessage,
} from '@/utils/error-handling';
import { useMutation } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, FirestoreError, serverTimestamp, setDoc } from 'firebase/firestore';

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
        const APP_BASE_URL = process.env.LOCALHOST_API || '';
        const auth = firebaseInstance.getAuth();
        const db = firebaseInstance.getDb();

        const response = await createUserWithEmailAndPassword(auth, email, password);

        const token = await response.user.getIdToken();

        typedFetch({
          url: `${APP_BASE_URL}/api/auth`,
          method: 'POST',
          body: { token },
        });

        const userDocRef = doc(db, FIRESTORE_COLLECTIONS.USERS, response.user.uid);

        await setDoc(userDocRef, {
          id: response.user.uid,
          userName,
          email,
          role,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        if (error instanceof FirebaseError) {
          if (error instanceof FirestoreError) {
            const errorMessage = getFirestoreErrorMessage(error.code);
            throw new Error(errorMessage);
          } else {
            const errorMessage = getAuthErrorMessage(error.code as keyof typeof authErrorMessages);
            throw new Error(errorMessage);
          }
        }
        throw new Error('An unexpected error occurred');
      }
    },
  });
};
