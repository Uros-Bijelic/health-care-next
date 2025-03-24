'use client';

import { SearchIcon } from 'lucide-react';

import { CommandDialog, CommandGroup, CommandInput, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { type ReactNode, useEffect, useState } from 'react';
import { DialogDescription, DialogTitle } from './dialog';

type Props = {
  query: string;
  onQueryChange: (query: string) => void;
  placeholder?: string;
  className?: string;
  options?: ReactNode;
  groupHeadning?: string;
};

const SearchCommandDialog = ({
  query,
  onQueryChange,
  placeholder = 'Start searching for...',
  className,
  options,
  groupHeadning = '',
}: Props) => {
  const [open, setOpen] = useState(false);

  console.log('opetions', options);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <div
        className={cn(
          `flex flex-1 shrink-0 justify-between gap-4 rounded-lg border-2 border-gray-200 px-2 py-1.5 transition-colors hover:border-cyan-500`,
          className,
        )}
        onClick={() => setOpen(true)}
      >
        <div className="flex shrink-0 gap-2">
          <SearchIcon />
          <p>{placeholder}</p>
        </div>
        <div className="flex shrink-0">
          <kbd className="pointer-events-none inline-flex select-none items-center gap-1 rounded bg-gray-300 px-1.5 font-mono text-[10px] font-medium">
            <span className="flex-center text-base text-gray-700">⌘ + K</span>
          </kbd>
        </div>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle />
        <DialogDescription />
        <CommandInput
          placeholder="Type a command or search..."
          value={query}
          onValueChange={onQueryChange}
        />
        <CommandList>
          <CommandGroup heading={groupHeadning} forceMount>
            {options}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchCommandDialog;
