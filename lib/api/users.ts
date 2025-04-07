import { getFirestoreErrorMessage } from '@/utils/error-handling';
import {
  arrayUnion,
  collection,
  doc,
  FirestoreDataConverter,
  FirestoreError,
  getDoc,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { FIRESTORE_COLLECTIONS } from '../constants';
import { firebaseInstance } from '../firebase';
import type {
  DocumentReferenceSchema,
  UserProfileDTO,
  UserProfileResponse,
  UserVisitDTO,
  UserVisitFS,
} from '../validation';

// * Created for working just with dates so i don't have to manually convert from Timestamp to Date and vice verca
const userProfileConverter: FirestoreDataConverter<UserProfileDTO, UserProfileResponse> = {
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

// * Created for working just with dates so i don't have to manually convert from Timestamp to Date and vice verca
const visitsDataConverter: FirestoreDataConverter<UserVisitDTO, UserVisitFS> = {
  toFirestore: (user: UserVisitDTO): UserVisitFS => {
    // Convert Dates back to Timestamps when writing to Firestore
    return {
      ...user,
      createdAt: Timestamp.fromDate(new Date(user.createdAt)),
      updatedAt: Timestamp.fromDate(new Date(user.updatedAt)),
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): UserVisitDTO => {
    const data = snapshot.data(options) as UserVisitFS;
    // Convert Timestamps to Dates when reading from Firestore
    return {
      ...data,
      createdAt: data.createdAt?.toDate().toString(),
      updatedAt: data.updatedAt?.toDate().toString(),
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

export const fetchUserVisits = async (userId: string) => {
  try {
    const db = firebaseInstance.getDb();
    const userDocRef = doc(db, FIRESTORE_COLLECTIONS.USERS, userId).withConverter(
      userProfileConverter,
    );
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    const userVisitsSubcollections = collection(
      db,
      FIRESTORE_COLLECTIONS.USERS,
      userId,
      FIRESTORE_COLLECTIONS.VISITS,
    ).withConverter(visitsDataConverter);

    const visitsDocs = await getDocs(userVisitsSubcollections);

    if (visitsDocs.empty) {
      const user = {
        ...userDoc.data(),
        visits: [],
      };
      return user;
    }

    const visits = [] as UserVisitDTO[];

    visitsDocs.forEach((doc) => {
      if (doc.exists()) {
        console.log('DOC U FOREACH ZA VISIT', doc.data());
        visits.push(doc.data() as UserVisitDTO);
      }
    });

    const user = {
      ...userDoc.data(),
      visits,
    };

    return user;
  } catch (error) {
    if (error instanceof FirestoreError) {
      const errorMessage = getFirestoreErrorMessage(error.code);
      throw new Error(errorMessage);
    }

    throw new Error('Something went wrong, could not fetch user with visits');
  }
};
