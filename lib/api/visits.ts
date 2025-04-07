import type { UserVisitFS } from '@/lib/validation';
import { getFirestoreErrorMessage } from '@/utils/error-handling';
import {
  doc,
  type FirestoreDataConverter,
  FirestoreError,
  getDoc,
  QueryDocumentSnapshot,
  type SnapshotOptions,
  Timestamp,
} from 'firebase/firestore';
import { FIRESTORE_COLLECTIONS } from '../constants';
import { firebaseInstance } from '../firebase';
import { UserVisitDTO } from '../validation';

// * Converts Timestamps to Date and vice verca for visits
export const visitsDataConverter: FirestoreDataConverter<UserVisitDTO, UserVisitFS> = {
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

export const fetchSelectedVisit = async (visitId: string) => {
  try {
    const db = firebaseInstance.getDb();

    const visitRef = doc(db, FIRESTORE_COLLECTIONS.VISITS, visitId).withConverter(
      visitsDataConverter,
    );

    const visitDoc = await getDoc(visitRef);

    if (!visitDoc.exists()) {
      throw new Error('Visit in not found');
    }

    return visitDoc.data();
  } catch (error) {
    if (error instanceof FirestoreError) {
      const errorMessage = getFirestoreErrorMessage(error.code);
      throw new Error(errorMessage);
    }

    throw new Error('Something went wrong, could not fetch user with visits');
  }
};
