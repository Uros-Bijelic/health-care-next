// import { UserProfileSchemaDTO } from '@/app/(root)/profile/edit/page';
import { UserProfileSchemaDTO } from '@/components/features/user/ProfileEdit';
import { useAuthContext } from '@/context/auth-context';
import { EQueryKeys, FIRESTORE_COLLECTIONS } from '@/lib/constants';
import { firebaseInstance } from '@/lib/firebase';
import { getFirestoreErrorMessage } from '@/utils/error-handling';
import { useQuery } from '@tanstack/react-query';
import { doc, FirestoreError, getDoc } from 'firebase/firestore';

export const useFetchUser = () => {
  const db = firebaseInstance.getDb();
  const { user } = useAuthContext();

  return useQuery<Partial<UserProfileSchemaDTO>>({
    queryKey: [EQueryKeys.USER, user?.uid],
    queryFn: async () => {
      try {
        const userDocRef = doc(db, FIRESTORE_COLLECTIONS.USERS, user!.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          throw new Error('User data not found!');
        }

        return userDocSnap.data();
      } catch (error) {
        if (error instanceof FirestoreError) {
          const errorMessage = getFirestoreErrorMessage(error.code);
          throw new Error(errorMessage);
        }
        throw new Error('An unexpected error occurred');
      }
    },
    enabled: !!user?.uid,
  });
};
