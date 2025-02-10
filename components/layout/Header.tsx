// import { NAVIGATION_OPTIONS } from '@/lib/constants';
// import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
// import { useFetchUser } from '@/lib/hooks/queries/use-fetch-user';
import Image from 'next/image';
import Link from 'next/link';
// import LoadingSpinner from '../ui/LoadingSpinner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NAVIGATION_OPTIONS } from '@/lib/constants';
import MenuIcon from '../icons/Menu';

// ----------------------------------------------------------------

const Header: React.FC = () => {
  // const { data, isPending } = useFetchUser();

  // let initials = '';

  // if (data?.firstName && data?.lastName) {
  //   initials = data.firstName.charAt(0) + data.lastName.charAt(0);
  // } else {
  //   initials = data?.userName?.charAt(0) || '';
  // }

  // if (isPending) {
  //   return <LoadingSpinner asLayout />;
  // }

  return (
    <header className="flex-between sticky left-0 top-0 h-[80px] bg-slate-50 px-2 shadow-md sm:px-5">
      <Link href="/">
        <Image src="/assets/images/logo.svg" width={80} height={80} alt="Logo" />
      </Link>
      <div className="flex items-center gap-2">
        <div className="flex-center size-[36px] rounded-full bg-cyan-500 text-white">UB</div>
        {/* <p className="p3-medium">{data?.userName}</p> */}
        <p className="p3-medium">Uros Bijelic</p>
        <div className="flex-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MenuIcon className="text-cyan-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {NAVIGATION_OPTIONS.map(({ href, icon, label }) => {
                const Icon = icon;
                return (
                  <DropdownMenuItem
                    key={href}
                    className="relative flex cursor-pointer select-none items-center rounded-[3px] pr-[5px] text-[13px] leading-none outline-none transition hover:translate-x-2 hover:bg-cyan-400 hover:text-white data-[disabled]:pointer-events-none data-[highlighted]:bg-cyan-500 data-[disabled]:text-gray-500 data-[highlighted]:text-white"
                  >
                    <Link href={href} className="flex w-full items-center gap-2">
                      <Icon /> {label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
