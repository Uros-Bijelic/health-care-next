'use client';

import { useAuthContext } from '@/context/auth-context';
import {
  FilePlus,
  HomeIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  UserRoundPenIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export const NAVIGATION_OPTIONS = [
  {
    href: '/',
    label: 'Dashboard',
    icon: HomeIcon,
  },
  {
    href: '/records/create',
    label: 'New Record',
    icon: FilePlus,
  },
  {
    href: '/profile/edit',
    label: 'Edit Profile',
    icon: UserRoundPenIcon,
  },
];

const Sidebar = () => {
  const { signOutUser } = useAuthContext();

  return (
    <div className="sticky left-0 top-[80px] flex h-[calc(100vh-80px)] flex-col gap-5 bg-cyan-500 p-5 text-white lg:w-[max(240px)]">
      <Link href="/" className="mt-2 flex items-center gap-1">
        <LayoutDashboardIcon width={30} height={30} />
        <h2 className="h2-bold">Health Records</h2>
      </Link>
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
            className="text-md bg-transparent p-0 shadow-none hover:bg-transparent [&_svg]:size-auto"
          >
            <LogOutIcon /> Log out
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
