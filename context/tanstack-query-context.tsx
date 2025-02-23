'use client';

import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query';
import type { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 3, // ? checked this in docs and chatbot, it is 0  by default. Please check again.
      refetchOnWindowFocus: false, // ? is it good or bad practice?
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
