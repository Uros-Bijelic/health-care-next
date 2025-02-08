import type { ReactNode } from 'react';

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return <section className="flex-center h-screen">{children}</section>;
};

export default Layout;
