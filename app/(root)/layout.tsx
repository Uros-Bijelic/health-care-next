'use client';

import Sidebar from '@/components/layout/Sidebar';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <section>
      <Sidebar />
      {children}
    </section>
  );
};

export default Layout;
