export type EUserRole = 'user' | 'doctor';

export enum EQueryKeys {
  USER = 'user',
}

export const FIRESTORE_COLLECTIONS = {
  USERS: 'users',
  DOCTOR_PATIENTS: 'doctor_patients',
  MEDICAL_EXAMINATIONS: 'medical_examinations',
};

export const patients = [
  {
    id: '3Vzqb08WYdMnvjFktXKsQvPNiAn2',
    doctorId: '25Y429fDcdSovEyKOZzB17wN2R43',
    email: 'test5@gmail.com',
    firstName: 'Petar',
    lastName: 'Peric',
    role: 'user',
    updatedAt: { seconds: 1742208375, nanoseconds: 449000000 },
    createdAt: { seconds: 1742208375, nanoseconds: 449000000 },
  },
  {
    id: 'LrgS3KFGiVPSqzT4plo80IoymZk1',
    doctorId: '25Y429fDcdSovEyKOZzB17wN2R43',
    email: 'test7@gmail.com',
    firstName: 'Predrag',
    lastName: 'Rajkovic',
    role: 'user',
    updatedAt: { seconds: 1742208509, nanoseconds: 852000000 },
    createdAt: { seconds: 1742208438, nanoseconds: 427000000 },
  },
  {
    id: '3Vzqb08WYdMnvjFktXKsQvPNiAn2',
    doctorId: '25Y429fDcdSovEyKOZzB17wN2R43',
    email: 'test5@gmail.com',
    firstName: 'Petar',
    lastName: 'Peric',
    role: 'user',
    updatedAt: { seconds: 1742208375, nanoseconds: 449000000 },
    createdAt: { seconds: 1742208375, nanoseconds: 449000000 },
  },

  // ...
];
