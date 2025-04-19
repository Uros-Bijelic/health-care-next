/**
 * * User this file to add different examples of types or DTO-s, delete later in not needed!
 */

import { Timestamp } from 'firebase-admin/firestore';

export type UserProfileDTO = {
  firstName: string;
  lastName: string;
  email: string;
  address: {
    country: string;
    city: string;
    street: string;
    phone: string;
  };
  doctorsTreatedBy: string[];
  lastVisitedDate: Timestamp;
  birthDate?: Date | null;
  profileImg?: string | null;
  allergies?: string | null;
  specialNotes?: string | null;
  patientsRefs?: string[] | null;
  doctorRefs?: string[] | null;
  patients: UserProfileDTO[];
};
