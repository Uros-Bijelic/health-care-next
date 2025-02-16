'use server';

import { errorMessageGenerator } from '@/utils/error-handling';
import { doc, FirestoreError, serverTimestamp, updateDoc } from 'firebase/firestore';
import { EFirestoreCollections } from '../constants';
import { firebaseInstance } from '../firebase';
import { IUserProfileSchema } from '../validation';

// ----------------------------------------------------------------

export const updateUser = async (data: IUserProfileSchema, userId: string) => {
  const db = firebaseInstance.getDb();

  try {
    const userDocRef = doc(db, EFirestoreCollections.USERS, userId);

    await updateDoc(userDocRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.log('Error updating User profile info', error);

    if (error instanceof FirestoreError) {
      const errorMessage = errorMessageGenerator.getFirestoreErrorMessage(error.code);
      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred');
  }
};
