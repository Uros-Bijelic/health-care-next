'use client';

import { firebaseInstance } from '@/lib/firebase';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type AuthContextProps = {
  user: User | null;
  signOutUser: () => void;
};

const AuthContext = createContext<AuthContextProps>({ user: null, signOutUser: () => {} });

type AuthContextProviderProps = {
  children: ReactNode;
};

const AUTH_ROUTES = ['/login', '/register'];

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const auth = firebaseInstance.getAuth();

  const [user, setUser] = useState<User | null>(null);

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log('Error signing out user: ', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        if (AUTH_ROUTES.includes(pathName)) {
          router.push('/');
        }
      } else {
        if (!AUTH_ROUTES.includes(pathName)) {
          router.push('/login');
        }
      }

      return () => unsubscribe();
    });
  }, [auth, pathName, router]);

  return <AuthContext.Provider value={{ user, signOutUser }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) throw new Error('useAuthContext must be used within AuthContextProvider');

  return authContext;
};

export default AuthContextProvider;
