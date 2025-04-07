import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';

export const userProfileSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  birthDate: z.date({ required_error: 'Date of birth is required' }).optional(),
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

export type UserProfile = z.infer<typeof userProfileSchema>;

const documentReferenceSchema = z
  .object({
    id: z.string(),
  })
  .passthrough();

export type DocumentReferenceSchema = z.infer<typeof documentReferenceSchema>;

export const userProfileSchemaResponse = userProfileSchema.extend({
  id: z.string().trim().min(1, 'Required'),
  doctorId: z.string().trim().min(1, 'Required'),
  role: z.enum(['user', 'doctor']),
  createdAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp),
  birthDate: z.instanceof(Timestamp).optional(),
  lastVisitedDate: z.instanceof(Timestamp).optional(),
  userRefs: z.array(documentReferenceSchema),
  doctorRefs: z.array(documentReferenceSchema),
});

export type UserProfileResponse = z.infer<typeof userProfileSchemaResponse>;

export const userProfileSchemaDTO = userProfileSchemaResponse.extend({
  createdAt: z.string(),
  updatedAt: z.string(),
  birthDate: z.string().optional(),
  lastVisitedDate: z.string().optional(),
});

export type UserProfileDTO = z.infer<typeof userProfileSchemaDTO>;

export const userProfileSchemaWithPatients = userProfileSchemaResponse.extend({
  patients: z.array(userProfileSchemaResponse),
});

export type UserProfileWithPatientsDTO = z.infer<typeof userProfileSchemaWithPatients>;

export const userVisitSchemaResponse = z.object({
  id: z.string().trim().min(1, 'Required'),
  doctorId: z.string().trim().min(1, 'Required'),
  diagnosis: z.string().trim().min(1, 'Required'),
  reasonForVisit: z.string().trim().min(1, 'Required'),
  specialNotes: z.string().trim().optional(),
  createdAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp),
});

export type UserVisitFS = z.infer<typeof userVisitSchemaResponse>;

export const userVisitSchemaDTO = userVisitSchemaResponse.extend({
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UserVisitDTO = z.infer<typeof userVisitSchemaDTO>;

export const userProfileSchemaWithVisitsFS = userProfileSchemaDTO.extend({
  visits: z.array(userVisitSchemaDTO),
});

export type UserProfileWithVisits = z.infer<typeof userProfileSchemaWithVisitsFS>;
