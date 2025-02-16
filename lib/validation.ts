import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';
import { EUserRole } from './constants';

/******************************** AUTH  ********************************/

export const registerFormSchema = z.object({
  email: z.string().trim().email('Please enter valid email address'),
  password: z.string().trim().min(6, 'Password must be at least 6 characters'),
  userName: z.string().trim().min(1, 'Name is required'),
  role: z.nativeEnum(EUserRole),
  // role: z.enum(['doctor', 'user'], { message: 'Please choose between doctor and user' }),
});

export type IRegisterFormSchema = z.infer<typeof registerFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().trim().email('Please enter valid email address'),
  password: z.string().trim().min(6, 'Password must be at least 6 characters'),
});

export type ILoginFormSchema = z.infer<typeof loginFormSchema>;

/******************************** AUTH  ********************************/

/******************************** USER  ********************************/

export const userProfileSchema = z.object({
  userName: z.string().trim().min(3, 'Username is required and must be at least 3 characters long'),
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  birthDate: z.date({ required_error: 'Date of birth is required' }).optional().nullable(),
  profileImg: z.string().trim().optional(), // * add .url() method if later in the app i decide to store user images (probably with google)???
  email: z.string().trim().email('Please provide valid email address'),
  allergies: z.string().trim().optional(),
  specialNotes: z.string().trim().optional(),
  address: z.object({
    country: z.string().trim().min(3, 'Country is required'),
    city: z.string().trim().min(3, 'City is required'),
    street: z.string().trim().min(3, 'Street is required'),
    phone: z.string().trim().min(3, 'Phone is required'),
  }),
});

export type IUserProfileSchema = z.infer<typeof userProfileSchema>;

export const userProfileSchemaDTO = userProfileSchema.extend({
  id: z.string().trim(),
  createdAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp),
  birthDate: z.instanceof(Timestamp).optional(),
});

export type IUserProfileSchemaDTO = z.infer<typeof userProfileSchemaDTO>;

/******************************** USER  ********************************/
