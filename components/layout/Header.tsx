// import { NAVIGATION_OPTIONS } from '@/lib/constants';
// import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
// import { useFetchUser } from '@/lib/hooks/queries/use-fetch-user';
import Image from 'next/image';
import Link from 'next/link';
// import LoadingSpinner from '../ui/LoadingSpinner';

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
        <div className="flex-center sm:hidden">
          {/* <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="bg-white" aria-label="Customise options">
                <MenuIcon className="text-cyan-500" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade flex min-w-[220px] flex-col gap-1 rounded-md bg-gray-100 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
                align="end"
                sideOffset={15}
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                {NAVIGATION_OPTIONS.map(({ href, icon, label }) => {
                  const Icon = icon;
                  return (
                    <DropdownMenu.Item
                      key={href}
                      className="relative flex h-[25px] cursor-pointer select-none items-center rounded-[3px] pl-2 pr-[5px] text-[13px] leading-none outline-none transition hover:translate-x-2 data-[disabled]:pointer-events-none data-[highlighted]:bg-cyan-500 data-[disabled]:text-gray-500 data-[highlighted]:text-white"
                    >
                      <NavLink to={href} className="flex w-full items-center gap-2">
                        <Icon /> {label}
                      </NavLink>
                    </DropdownMenu.Item>
                  );
                })}
                <DropdownMenu.Separator className="my-0.5 border border-gray-300" />
                <DropdownMenu.Item
                  className="relative flex h-[25px] cursor-pointer select-none items-center gap-2 rounded-[3px] pl-2 pr-[5px] text-[13px] leading-none outline-none transition hover:translate-x-2 data-[disabled]:pointer-events-none data-[highlighted]:bg-cyan-500 data-[disabled]:text-gray-500 data-[highlighted]:text-white"
                  onClick={() => signOut(auth)}
                >
                  <LogoutIcon /> Log out
                </DropdownMenu.Item>
                <DropdownMenu.Arrow className="fill-gray-200" />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
