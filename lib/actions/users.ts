'use server';

import { UserProfileSchema } from '@/components/features/user/ProfileEdit';
import { FIRESTORE_COLLECTIONS } from '@/lib/constants';
import { firebaseInstance } from '@/lib/firebase';
import { getFirestoreErrorMessage } from '@/utils/error-handling';
import { doc, FirestoreError, serverTimestamp, updateDoc } from 'firebase/firestore';

export const updateUser = async (data: UserProfileSchema, userId: string) => {
  const db = firebaseInstance.getDb();

  try {
    const userDocRef = doc(db, FIRESTORE_COLLECTIONS.USERS, userId);

    await updateDoc(userDocRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.log('Error updating User profile info', error);

    if (error instanceof FirestoreError) {
      const errorMessage = getFirestoreErrorMessage(error.code);
      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred');
  }
};
