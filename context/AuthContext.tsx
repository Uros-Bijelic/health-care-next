'use client';

import { firebaseInstance } from '@/lib/firebase';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

// ----------------------------------------------------------------

type AuthContextProps = {
  user: User | null;
  signOutUser: () => void;
};

// https://stackoverflow.com/questions/78333331/how-to-use-tanstack-query-in-sync-with-firebase-firestore-to-leverage-the-featur
const AuthContext = createContext<AuthContextProps>({ user: null, signOutUser: () => {} });

type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const router = useRouter();
  const auth = firebaseInstance.getAuth();

  const [user, setUser] = useState<User | null>(null);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.log('Error signing out user: ', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('IMA USERA');
        setUser(currentUser);
      } else {
        console.log('NEMA USERA');
        setUser(null);
      }

      return () => unsubscribe();
    });
  }, [auth]);

  return <AuthContext.Provider value={{ user, signOutUser }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) throw new Error('useAuthContext must be used within AuthContextProvider');

  return authContext;
};

export default AuthContextProvider;
