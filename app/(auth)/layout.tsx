import type { ReactNode } from 'react';

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <section className="flex-center h-screen">{children}</section>;
};

export default Layout;
