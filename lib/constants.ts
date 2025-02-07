export type EUserRole = 'user' | 'doctor';

export const NAVIGATION_OPTIONS_HOME = [
  {
    href: '/records/create?record=examination',
    label: 'Dashboard',
  },
  {
    href: '/records/create?record=vaccination',
    label: 'New Record',
  },
  {
    href: '/records/create?record=medicine',
    label: 'Edit Profile',
  },
];

export enum EQueryKeys {
  USER = 'user',
}

export enum EFirestoreCollections {
  USERS = 'users',
  MEDICAL_EXAMINATIONS = 'medical_examinations',
}
