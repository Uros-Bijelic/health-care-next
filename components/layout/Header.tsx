'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CircleXIcon, MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Sidebar from './Sidebar';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex-between sticky left-0 top-0 h-[80px] bg-slate-50 px-2 shadow-md sm:px-5">
      <Link href="/">
        <Image src="/assets/images/logo.svg" width={80} height={80} alt="Logo" />
      </Link>
      <div className="flex items-center gap-2">
        <div className="flex-center lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <MenuIcon className="cursor-pointer text-cyan-500" />
            </SheetTrigger>
            <SheetContent
              className="w-[min(320px,100%)] border-transparent bg-cyan-500"
              onOpenAutoFocus={(e) => e.preventDefault()}
              onCloseAutoFocus={(e) => e.preventDefault}
              onPointerDownOutside={() => setIsOpen(false)}
              onInteractOutside={() => setIsOpen(false)}
              onClick={() => setIsOpen(false)}
              withDefaultClose={false}
            >
              <SheetClose asChild>
                <CircleXIcon
                  width={32}
                  height={32}
                  className="absolute right-10 cursor-pointer text-white"
                />
              </SheetClose>
              <SheetTitle />
              <SheetDescription />
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
