'use client';

import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import SessionProvider from './next-auth-session-provider';
import QueryClientProvider from './tanstack-query-context';

type Props = {
  children?: ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <QueryClientProvider>
        <Toaster />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
