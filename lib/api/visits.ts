import type { UserVisitFS } from '@/lib/validation';
import { getFirestoreErrorMessage } from '@/utils/error-handling';
import {
  addDoc,
  collection,
  doc,
  type FirestoreDataConverter,
  FirestoreError,
  getDoc,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  type SnapshotOptions,
  Timestamp,
  where,
} from 'firebase/firestore';
import { FIRESTORE_COLLECTIONS } from '../constants';
import { firebaseInstance } from '../firebase';
import { AddVisitData } from '../hooks/mutations/use-create-new-visit';
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

export const fetchPatientVisits = async ({
  patientId,
  searchQuery,
}: {
  patientId: string;
  searchQuery: string;
}) => {
  try {
    const db = firebaseInstance.getDb();

    const visitsCollections = collection(db, FIRESTORE_COLLECTIONS.VISITS);

    const visitsCollectionQuery = query(
      visitsCollections,
      where('patientId', '==', patientId),
      limit(10),
    ).withConverter(visitsDataConverter);

    const visitSnapshots = await getDocs(visitsCollectionQuery);

    const visits: UserVisitDTO[] = [];

    if (visitSnapshots.empty) {
      throw new Error('Visits not found!');
    }

    visitSnapshots.forEach((doc) => {
      if (doc.exists()) {
        const newDoc = {
          ...doc.data(),
          id: doc.id,
        };
        visits.push(newDoc as UserVisitDTO);
      }
    });

    const filteredVisits = visits.filter((visit) => {
      const searchQueryLowerCase = searchQuery.trim().toLowerCase();

      return visit.reasonForVisit.toLowerCase().includes(searchQueryLowerCase);
    });

    return filteredVisits;
  } catch (error) {
    if (error instanceof FirestoreError) {
      const errorMessage = getFirestoreErrorMessage(error.code);
      throw new Error(errorMessage);
    }
    throw new Error('Something wrong happened could not retrive visits');
  }
};

export const fetchPatientVisitsTEST = async ({
  patientId,
  searchQuery,
}: {
  patientId: string;
  searchQuery: string;
}) => {
  try {
    const db = firebaseInstance.getDb();
    const visitsCollections = collection(db, FIRESTORE_COLLECTIONS.VISITS);

    const queryConstraints = [where('patientId', '==', patientId)];

    if (searchQuery) {
      queryConstraints.push(
        where('reasonForVisit', '>=', searchQuery),
        where('reasonForVisit', '<=', searchQuery + '\uf8ff'),
      );
    }

    const visitsCollectionQuery = query(visitsCollections, ...queryConstraints).withConverter(
      visitsDataConverter,
    );

    const visitSnapshots = await getDocs(visitsCollectionQuery);

    const visits: UserVisitDTO[] = [];

    if (visitSnapshots.empty) {
      throw new Error('Visits not found!');
    }

    visitSnapshots.forEach((doc) => {
      if (doc.exists()) {
        const newDoc = {
          ...doc.data(),
          id: doc.id,
        };
        visits.push(newDoc as UserVisitDTO);
      }
    });

    const filteredVisits = visits.filter((visit) => {
      const searchQueryLowerCase = searchQuery.trim().toLowerCase();

      return visit.reasonForVisit.toLowerCase().includes(searchQueryLowerCase);
    });

    console.log('filteredVisits', filteredVisits);

    return filteredVisits;
  } catch (error) {
    if (error instanceof FirestoreError) {
      const errorMessage = getFirestoreErrorMessage(error.code);
      throw new Error(errorMessage);
    }
    throw new Error('Something wrong happened could not retrive visits');
  }
};

export const createNewVisit = async (data: AddVisitData, doctorId: string) => {
  try {
    const db = firebaseInstance.getDb();

    const visitCollectionRef = collection(db, FIRESTORE_COLLECTIONS.VISITS);
    await addDoc(visitCollectionRef, {
      ...data,
      doctorId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    if (error instanceof FirestoreError) {
      const errorMessage = getFirestoreErrorMessage(error.code);
      throw new Error(errorMessage);
    }
    throw new Error('Something went wrong. Could not create new doctor visit.');
  }
};

export const fetchVisitById = async (visitId: string) => {
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
// where('reasonForVisit', '>=', searchQuery),
// where('reasonForVisit', '<=', searchQuery + '\uf8ff'),
