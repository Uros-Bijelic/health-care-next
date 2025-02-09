import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <section className="flex-center h-screen">{children}</section>;
};

export default Layout;
