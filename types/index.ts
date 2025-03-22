/**
 * * User this file to add different examples of types or DTO-s, delete later in not needed!
 */

import { Timestamp } from 'firebase-admin/firestore';

export type UserProfileDTO = {
  userName: string;
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
  birthDate?: Date | undefined;
  profileImg?: string | undefined;
  allergies?: string | undefined;
  specialNotes?: string | undefined;
};
