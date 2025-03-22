import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { FIRESTORE_COLLECTIONS } from './lib/constants';
import { firebaseInstance } from './lib/firebase';

export const AUTH_CONFIG = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        try {
          const db = firebaseInstance.getDb();

          const usersRef = collection(db, FIRESTORE_COLLECTIONS.USERS);
          const q = query(usersRef, where('email', '==', credentials.email), limit(1));

          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            user = {
              id: doc.data().id,
              email: doc.data().email,
              userName: doc.data().userName,
              role: doc.data().role,
            };
          }
        } catch (error) {
          console.log('Error SignInUser', error);
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthConfig;
