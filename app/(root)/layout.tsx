import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex flex-1">
        <div className="max-lg:hidden">
          <Sidebar />
        </div>
        <div className="mx-auto w-full max-w-7xl p-2 sm:p-4">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
