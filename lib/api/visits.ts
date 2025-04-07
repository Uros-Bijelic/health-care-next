import type { UserVisitFS } from '@/lib/validation';
import { getFirestoreErrorMessage } from '@/utils/error-handling';
import {
  collection,
  type FirestoreDataConverter,
  FirestoreError,
  getDocs,
  query,
  QueryDocumentSnapshot,
  type SnapshotOptions,
  Timestamp,
  where,
} from 'firebase/firestore';
import { FIRESTORE_COLLECTIONS } from '../constants';
import { firebaseInstance } from '../firebase';
import type { UserVisitDTO } from '../validation';

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

export const fetchUserVisits = async (patientId: string) => {
  try {
    const db = firebaseInstance.getDb();

    const visitsCollections = collection(db, FIRESTORE_COLLECTIONS.VISITS);
    const visitsCollectionQuery = query(visitsCollections, where('patientId', '==', patientId));
    const visitSnapshots = await getDocs(visitsCollectionQuery);

    const visits: UserVisitDTO[] = [];

    if (visitSnapshots.empty) {
      throw new Error('Visits not found!');
    }

    visitSnapshots.forEach((doc) => {
      if (doc.exists()) {
        visits.push(doc.data() as UserVisitDTO);
      }
    });

    return visits;
  } catch (error) {
    if (error instanceof FirestoreError) {
      const errorMessage = getFirestoreErrorMessage(error.code);
      throw new Error(errorMessage);
    }
    throw new Error('Something wrong happened could not retrive visits');
  }
};

// export const fetchSelectedVisit = async (visitId: string) => {
//   try {
//     const db = firebaseInstance.getDb();

//     const visitRef = doc(db, FIRESTORE_COLLECTIONS.VISITS, visitId).withConverter(
//       visitsDataConverter,
//     );

//     const visitDoc = await getDoc(visitRef);

//     if (!visitDoc.exists()) {
//       throw new Error('Visit in not found');
//     }

//     return visitDoc.data();
//   } catch (error) {
//     if (error instanceof FirestoreError) {
//       const errorMessage = getFirestoreErrorMessage(error.code);
//       throw new Error(errorMessage);
//     }

//     throw new Error('Something went wrong, could not fetch user with visits');
//   }
// };

/**
 * kliknuo je na pacijenta i otisao na screen sa svim njegovom visitima i sa nekim user detals
 */
