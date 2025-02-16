import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import type { ReactNode } from 'react';

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <section>
      <Header />
      <main className="flex">
        <Sidebar />
        <div className="mx-auto flex h-full max-w-7xl flex-1 p-2 sm:p-4">{children}</div>
      </main>
    </section>
  );
};

export default Layout;
