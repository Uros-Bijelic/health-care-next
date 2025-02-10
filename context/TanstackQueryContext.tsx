'use client';

import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query';
import type { ReactNode } from 'react';

// ----------------------------------------------------------------

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

type QueryClientProvider = {
  children: ReactNode;
};

const QueryClientProvider = ({ children }: QueryClientProvider) => {
  return <TanstackQueryClientProvider client={queryClient}>{children}</TanstackQueryClientProvider>;
};

export default QueryClientProvider;
