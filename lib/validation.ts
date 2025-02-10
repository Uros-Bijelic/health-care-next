import { z } from 'zod';
import { EUserRole } from './constants';

// ----------------------------------------------------------------

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
