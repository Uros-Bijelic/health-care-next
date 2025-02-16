import CreateRecordIcon from '@/components/icons/CreateRecord';
import HomeIcon from '@/components/icons/Home';
import ProfileEditIcon from '@/components/icons/ProfileEdit';

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

export const NAVIGATION_OPTIONS = [
  {
    href: '/',
    label: 'Dashboard',
    icon: HomeIcon,
  },
  {
    href: '/records/create',
    label: 'New Record',
    icon: CreateRecordIcon,
  },
  {
    href: '/profile-edit',
    label: 'Edit Profile',
    icon: ProfileEditIcon,
  },
];

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
