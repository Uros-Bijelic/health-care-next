export type EUserRole = 'user' | 'doctor';

export enum EQueryKeys {
  USER = 'user',
}

export const FIRESTORE_COLLECTIONS = {
  USERS: 'users',
  DOCTOR_PATIENTS: 'doctor_patients',
  MEDICAL_EXAMINATIONS: 'medical_examinations',
};
