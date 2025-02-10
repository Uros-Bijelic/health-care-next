'use client';

import { firebaseInit } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

// ----------------------------------------------------------------

type AuthContextProps = {
  isAuth: boolean;
};

const AuthContext = createContext<AuthContextProps>({ isAuth: false });

type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const auth = firebaseInit.getAuth();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }

      return () => unsubscribe();
    });
  }, [auth]);

  return <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) throw new Error('useAuthContext must be used within AuthContextProvider');
};

export default AuthContextProvider;
