'use client';

import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <section>
      <Header />
      <Sidebar />
      {children}
    </section>
  );
};

export default Layout;
