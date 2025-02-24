'use server';

import { UserProfileSchema } from '@/components/features/user/ProfileEdit';
import { FIRESTORE_COLLECTIONS } from '@/lib/constants';
import { firebaseInstance } from '@/lib/firebase';
import { getFirestoreErrorMessage } from '@/utils/error-handling';
import { doc, FirestoreError, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';

export const getCurrentUser = async () => {
  try {
    const db = firebaseInstance.getDb();
    const userId = firebaseInstance.getAuth().currentUser?.uid || '';

    console.log('db', db);
    console.log('userId', userId);

    const userDocRef = doc(db, FIRESTORE_COLLECTIONS.USERS, userId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      throw new Error('User data not found!');
    }

    const data = userDocSnap.data();
    console.log('data', data);

    return userDocSnap.data();
  } catch (error) {
    if (error instanceof FirestoreError) {
      const errorMessage = getFirestoreErrorMessage(error.code);
      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred');
  }
};

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
