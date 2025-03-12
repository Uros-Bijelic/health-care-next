import { getFirestoreErrorMessage } from '@/utils/error-handling';
import { collection, FirestoreError, getDocs, limit, query, where } from 'firebase/firestore';
import { FIRESTORE_COLLECTIONS } from '../constants';
import { firebaseInstance } from '../firebase';

export const getCurrentUser = async (userId: string) => {
  const db = firebaseInstance.getDb();

  try {
    const usersRef = collection(db, FIRESTORE_COLLECTIONS.USERS);
    const q = query(usersRef, where('id', '==', userId), limit(1));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error('User data not found!');
    }
    const doc = querySnapshot.docs[0];

    return doc.data();
  } catch (error) {
    if (error instanceof FirestoreError) {
      const errorMessage = getFirestoreErrorMessage(error.code);
      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred');
  }
};
