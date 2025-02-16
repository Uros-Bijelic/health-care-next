'use client';

import { useAuthContext } from '@/context/AuthContext';
import { NAVIGATION_OPTIONS } from '@/lib/constants';
import Link from 'next/link';
import DashboardIcon from '../icons/Dashboard';
import LogoutIcon from '../icons/Logout';
import { Button } from '../ui/button';

// ----------------------------------------------------------------

const Sidebar: React.FC = () => {
  const { signOutUser } = useAuthContext();
  return (
    <div className="sticky left-0 top-[80px] flex h-[calc(100vh-80px)] w-[max(240px)] flex-col gap-5 bg-cyan-500 p-5 text-white max-sm:hidden">
      <div className="mt-2 flex gap-1">
        <DashboardIcon width={30} />
        <h2 className="h2-bold">Health Records</h2>
      </div>
      <ul className="flex flex-col gap-2">
        {NAVIGATION_OPTIONS.map(({ href, icon, label }) => {
          const Icon = icon;
          return (
            <li key={href} className="transition hover:translate-x-2">
              <Link href={href} className="flex items-center gap-2">
                <Icon /> {label}
              </Link>
            </li>
          );
        })}
      </ul>
      <ul className="mt-2">
        <li className="flex gap-2 transition hover:translate-x-2">
          <Button
            onClick={signOutUser}
            className="text-md bg-transparent p-0 shadow-none hover:bg-transparent"
          >
            <LogoutIcon /> Log out
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
