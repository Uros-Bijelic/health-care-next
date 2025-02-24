export type EUserRole = 'user' | 'doctor';

export enum EQueryKeys {
  USER = 'user',
}

export const FIRESTORE_COLLECTIONS = {
  USERS: 'users',
  MEDICAL_EXAMINATIONS: 'medical_examinations',
};
