import { UserProfileDTO } from '@/components/features/user/profile-edit';
import { getFirestoreErrorMessage } from '@/utils/error-handling';
import { collection, FirestoreError, getDocs, limit, query, where } from 'firebase/firestore';
import { FIRESTORE_COLLECTIONS } from '../constants';
import { firebaseInstance } from '../firebase';

export const getCurrentUser = async (userId: string) => {
  try {
    const db = firebaseInstance.getDb();
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

export const fetchUsersWithLimit = async (searchQuery: string, limitAmount = 10) => {
  try {
    console.log('searchQuery', searchQuery);
    const db = firebaseInstance.getDb();
    const usersRef = collection(db, FIRESTORE_COLLECTIONS.USERS);
    const q = query(usersRef, where('role', '==', 'user'), limit(limitAmount));

    const querySnapshot = await getDocs(q);

    const users: UserProfileDTO[] = [];

    if (querySnapshot.empty) {
      throw new Error('User data not found!');
    }

    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        users.push(doc.data() as UserProfileDTO);
      }
    });
    // console.log('filteredUsers BEFORE', filteredUsers);

    const filteredUsers = users.filter((user) => {
      try {
        const queryLowerCase = searchQuery.toLowerCase();

        return (
          (user.userName != null && user.userName.toLowerCase().includes(queryLowerCase)) ||
          (user.firstName !== null && user.firstName.toLowerCase().includes(queryLowerCase)) ||
          (user.lastName !== null && user.lastName.toLowerCase().includes(queryLowerCase))
        );
      } catch (error) {
        console.log('ERROR IN FILTER FUNCTION ', error);
      }
    });

    console.log('AFTER');

    return filteredUsers;
  } catch (error) {
    if (error instanceof FirestoreError) {
      const errorMessage = getFirestoreErrorMessage(error.code);
      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred');
  }
};
