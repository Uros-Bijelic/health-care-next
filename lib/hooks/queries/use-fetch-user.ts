import { EFirestoreCollections, EQueryKeys } from '@/lib/constants';
import { firebaseInstance } from '@/lib/firebase';
// import type { IUserProfileSchemaDTO } from '@/lib/validation';
import { errorMessageGenerator } from '@/utils/error-handling';
import { useQuery } from '@tanstack/react-query';
import { doc, FirestoreError, getDoc } from 'firebase/firestore';

// ----------------------------------------------------------------

export const useFetchUser = () => {
  const auth = firebaseInstance.getAuth();
  const db = firebaseInstance.getDb();
  const userId = auth.currentUser!.uid;

  return useQuery<Partial<unknown>>({
    queryKey: [EQueryKeys.USER, userId],
    queryFn: async () => {
      try {
        const userDocRef = doc(db, EFirestoreCollections.USERS, userId);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          throw new Error('User data not found!');
        }

        return userDocSnap.data();
      } catch (error) {
        console.log('Error fetching user document', error);
        if (error instanceof FirestoreError) {
          const errorMessage = errorMessageGenerator.getFirestoreErrorMessage(error.code);
          throw new Error(errorMessage);
        }
        throw new Error('An unexpected error occurred');
      }
    },
  });
};
