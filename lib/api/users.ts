import type { UserProfileResponse } from '@/lib/validation';
import { getFirestoreErrorMessage } from '@/utils/error-handling';
import {
  arrayUnion,
  collection,
  doc,
  type FirestoreDataConverter,
  FirestoreError,
  getDoc,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  type SnapshotOptions,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { FIRESTORE_COLLECTIONS } from '../constants';
import { firebaseInstance } from '../firebase';
import type { DocumentReferenceSchema, UserProfileDTO } from '../validation';

// * Converts Timestamps to Date and vice verca for user
export const userProfileConverter: FirestoreDataConverter<UserProfileDTO, UserProfileResponse> = {
  toFirestore: (user: UserProfileDTO): UserProfileResponse => {
    // Convert Dates back to Timestamps when writing to Firestore
    return {
      ...user,
      createdAt: Timestamp.fromDate(new Date(user.createdAt)),
      updatedAt: Timestamp.fromDate(new Date(user.updatedAt)),
      birthDate: user.birthDate ? Timestamp.fromDate(new Date(user.birthDate)) : undefined,
      lastVisitedDate: user.lastVisitedDate
        ? Timestamp.fromDate(new Date(user.lastVisitedDate))
        : undefined,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): UserProfileDTO => {
    const data = snapshot.data(options) as UserProfileResponse;
    // Convert Timestamps to Dates when reading from Firestore
    return {
      ...data,
      createdAt: data.createdAt?.toDate().toString(),
      updatedAt: data.updatedAt?.toDate().toString(),
      lastVisitedDate: data.lastVisitedDate?.toDate().toString(),
      birthDate: data.birthDate?.toDate().toString(),
    };
  },
};

const filterUsersBySearchQuery = (users: UserProfileDTO[], searchQuery: string) => {
  return users.filter((user) => {
    const queryLowerCase = searchQuery.toLowerCase();
    const firstName = user.firstName ? user.firstName.toLowerCase() : '';
    const lastName = user.lastName ? user.lastName.toLowerCase() : '';

    return (
      firstName.toLowerCase().includes(queryLowerCase) ||
      lastName.toLowerCase().includes(queryLowerCase)
    );
  });
};

export const fetchCurrentUser = async (userId: string) => {
  try {
    const db = firebaseInstance.getDb();
    const usersRef = collection(db, FIRESTORE_COLLECTIONS.USERS).withConverter(
      userProfileConverter,
    );
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

export const fetchUsersWithLimit = async (
  searchQuery: string,
  limitAmount = 10,
  userId: string,
) => {
  try {
    const db = firebaseInstance.getDb();

    const currentUserDocRef = doc(db, FIRESTORE_COLLECTIONS.USERS, userId);

    const currentUser = await getDoc(currentUserDocRef);

    if (!currentUser.exists()) {
      throw new Error('User not found!');
    }

    const userAddedPatients = currentUser
      .data()
      .userRefs.map((userRef: DocumentReferenceSchema) => userRef.id);

    const usersRef = collection(db, FIRESTORE_COLLECTIONS.USERS).withConverter(
      userProfileConverter,
    );

    let q = query(usersRef, where('role', '==', 'user'));

    if (userAddedPatients.length) {
      q = query(q, where('__name__', 'not-in', userAddedPatients), limit(limitAmount));
    }

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

    const filteredUsers = filterUsersBySearchQuery(users, searchQuery);

    return filteredUsers;
  } catch (error) {
    if (error instanceof FirestoreError) {
      const errorMessage = getFirestoreErrorMessage(error.code);
      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const addPatient = async (patientId: string, doctorId: string) => {
  try {
    const db = firebaseInstance.getDb();
    const doctorRef = doc(db, FIRESTORE_COLLECTIONS.USERS, doctorId);
    const patientRef = doc(db, FIRESTORE_COLLECTIONS.USERS, patientId);

    await updateDoc(doctorRef, {
      userRefs: arrayUnion(patientRef),
    });
  } catch (error) {
    if (error instanceof FirestoreError) {
      const errorMessage = getFirestoreErrorMessage(error.code);
      throw new Error(errorMessage);
    }
  }
};

export const fetchDoctorPatients = async (
  userId: string,
  searchQuery: string,
  fetchLimit: number,
) => {
  try {
    const db = firebaseInstance.getDb();
    const userDocRef = doc(db, FIRESTORE_COLLECTIONS.USERS, userId).withConverter(
      userProfileConverter,
    );
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error('User doc not found');
    }

    const usersCollection = collection(db, FIRESTORE_COLLECTIONS.USERS).withConverter(
      userProfileConverter,
    );

    const userDocUserRefs = userDoc.data().userRefs as DocumentReferenceSchema[];

    const patientsDocsToFetch = userDocUserRefs.map((userDoc) => userDoc.id);

    if (patientsDocsToFetch.length === 0) {
      throw new Error('No patients found');
    }

    const q = query(
      usersCollection,
      where('__name__', 'in', patientsDocsToFetch),

      limit(fetchLimit),
    );

    const docSnapshots = await getDocs(q);

    const patients: UserProfileDTO[] = [];

    docSnapshots.forEach((doc) => {
      if (doc.exists()) {
        patients.push(doc.data() as UserProfileDTO);
      }
    });

    const filteredUsers = filterUsersBySearchQuery(patients, searchQuery);

    const doctor = {
      ...userDoc.data(),
      patients: filteredUsers,
    };

    return doctor;
  } catch (error) {
    if (error instanceof FirestoreError) {
      const errorMessage = getFirestoreErrorMessage(error.code);

      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred');
  }
};
