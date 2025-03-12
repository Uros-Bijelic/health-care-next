import { SessionProvider as NextSessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const SessionProvider = ({ children }: Props) => {
  return <NextSessionProvider>{children}</NextSessionProvider>;
};

export default SessionProvider;
