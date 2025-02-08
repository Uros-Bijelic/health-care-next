export enum EUserRole {
  USER = 'user',
  DOCTOR = 'doctor',
}

// Use this just on Register page to choose the role
export const USER_APP_ROLES = [
  {
    id: '1',
    label: 'Doctor',
    value: 'doctor',
  },
  {
    id: '2',
    label: 'Patient',
    value: 'user',
  },
];
