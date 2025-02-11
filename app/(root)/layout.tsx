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
      <main className="flex">
        <Sidebar />
        <div className="mx-auto h-full max-w-7xl border-2 border-red-500 p-2 sm:p-4">
          {children}
        </div>
      </main>
    </section>
  );
};

export default Layout;
