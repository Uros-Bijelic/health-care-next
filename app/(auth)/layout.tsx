import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return <div className="flex-center h-screen">{children}</div>;
};

export default Layout;
