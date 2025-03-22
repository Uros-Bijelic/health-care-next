import { FirestoreAdapter } from '@auth/firebase-adapter';
import { cert } from 'firebase-admin/app';
import NextAuth from 'next-auth';
import { AUTH_CONFIG } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID || '',
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL || '',
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
    }),
  }),
  session: {
    strategy: 'jwt',
  },
  ...AUTH_CONFIG,
});
