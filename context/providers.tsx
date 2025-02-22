'use client';

import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import AuthContextProvider from './auth-context';
import QueryClientProvider from './tanstack-query-context';

type Props = {
  children?: ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <>
      <Toaster />
      <QueryClientProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </QueryClientProvider>
    </>
  );
};

export default Providers;
