import { useAuthContext } from '@/context/auth-context';
import { EFirestoreCollections, EQueryKeys } from '@/lib/constants';
import { firebaseInstance } from '@/lib/firebase';
import { getFirestoreErrorMessage } from '@/utils/error-handling';
import { useQuery } from '@tanstack/react-query';
import { doc, FirestoreError, getDoc, Timestamp } from 'firebase/firestore';
import { z } from 'zod';

export const userProfileSchema = z.object({
  userName: z.string().trim().min(3, 'Username is required and must be at least 3 characters long'),
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  birthDate: z.date({ required_error: 'Date of birth is required' }).optional(),
  profileImg: z.string().trim().optional(), // * add .url() method if later in the app i decide to store user images (probably with google)???
  email: z.string().trim().email('Please provide valid email address'),
  allergies: z.string().trim().optional(),
  specialNotes: z.string().trim().optional(),
  address: z.object({
    state: z.string().trim().min(3, 'State is required'),
    city: z.string().trim().min(3, 'City is required'),
    street: z.string().trim().min(3, 'Street is required'),
    phone: z.string().trim().min(3, 'Phone is required'),
  }),
});

export type UserProfileSchema = z.infer<typeof userProfileSchema>;

export const userProfileSchemaDTO = userProfileSchema.extend({
  id: z.string().trim(),
  createdAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp),
  birthDate: z.instanceof(Timestamp).optional(),
});

export type UserProfileSchemaDTO = z.infer<typeof userProfileSchemaDTO>;

export const useFetchUser = () => {
  const db = firebaseInstance.getDb();
  const { user } = useAuthContext();

  return useQuery<Partial<UserProfileSchemaDTO>>({
    queryKey: [EQueryKeys.USER, user?.uid],
    queryFn: async () => {
      try {
        const userDocRef = doc(db, EFirestoreCollections.USERS, user!.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          throw new Error('User data not found!');
        }

        return userDocSnap.data();
      } catch (error) {
        if (error instanceof FirestoreError) {
          const errorMessage = getFirestoreErrorMessage(error.code);
          throw new Error(errorMessage);
        }
        throw new Error('An unexpected error occurred');
      }
    },
    enabled: !!user?.uid,
  });
};
