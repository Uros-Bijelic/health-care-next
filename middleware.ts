import NextAuth from 'next-auth';
import { AUTH_CONFIG } from './auth.config';

export const { auth: middleware } = NextAuth(AUTH_CONFIG);
