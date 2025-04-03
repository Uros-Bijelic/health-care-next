'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useFetchCurrentUser } from '@/lib/hooks/queries/use-fetch--current-user';
import { LayoutDashboardIcon, LogOutIcon, UserRoundPenIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';
import SpinningLoader from '../ui/SpinningLoader';

export const NAVIGATION_OPTIONS = [
  {
    href: '/profile/edit',
    label: 'Edit Profile',
    icon: UserRoundPenIcon,
  },
];

const getUserInitials = (userFirstName?: string, userLastName?: string) => {
  if (!userFirstName || !userLastName) {
    return 'N/A';
  }

  return userFirstName.charAt(0) + userLastName.charAt(0);
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const isDoctor = session?.user.role === 'doctor';

  const { data: user, isPending } = useFetchCurrentUser();

  if (isPending) {
    return <SpinningLoader asOverlay />;
  }

  return (
    <div className="sticky left-0 top-[80px] flex h-[calc(100vh-80px)] flex-col justify-between gap-5 bg-cyan-500 p-5 text-white lg:w-[max(240px)]">
      <div className="flex flex-col gap-5">
        <Link href={isDoctor ? '/doctor' : '/user'} className="mt-2 flex items-center gap-1">
          <LayoutDashboardIcon width={30} height={30} />
          <h2 className="h2-bold">Dashboard</h2>
        </Link>
      </div>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex justify-start px-0 hover:bg-transparent hover:text-white"
          >
            <div className="flex-center size-[36px] rounded-full bg-white text-cyan-500">
              {getUserInitials(user?.firstName, user?.lastName)}
            </div>
            <span className="">
              {user?.firstName} {user?.lastName}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[max(220px)]"
          onCloseAutoFocus={(e) => e.preventDefault()}
          sideOffset={10}
        >
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {NAVIGATION_OPTIONS.map(({ href, icon, label }) => {
              const Icon = icon;
              return (
                <DropdownMenuItem key={href} className="transition hover:translate-x-2">
                  <Link
                    key={href}
                    href={href}
                    className="flex h-10 w-full items-center gap-2 hover:text-cyan-500"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon /> {label}
                  </Link>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuItem className="transition hover:translate-x-2">
              <div className="flex gap-2 hover:text-cyan-500">
                <LogOutIcon />
                <span className="hover:text-cyan-500">Log out</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Sidebar;
