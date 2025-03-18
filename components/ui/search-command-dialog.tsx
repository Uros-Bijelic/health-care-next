'use client';

import { Calculator, Calendar, SearchIcon, Smile } from 'lucide-react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useEffect, useState } from 'react';
import { DialogTitle } from './dialog';

type Props = {
  query: string;
  onQueryChange: (query: string) => void;
};

const SearchCommandDialog = ({ query, onQueryChange }: Props) => {
  const [open, setOpen] = useState(false);

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
        className="flex justify-between rounded-lg border-2 border-gray-200 px-2 py-1.5 transition-colors hover:border-cyan-500"
        onClick={() => setOpen(true)}
      >
        <div className="flex gap-2">
          <SearchIcon />
          <p>Start searching for...</p>
        </div>
        <div>
          <kbd className="pointer-events-none inline-flex select-none items-center gap-1 rounded bg-gray-300 px-1.5 font-mono text-[10px] font-medium">
            <span className="flex-center text-base text-gray-700">⌘ + K</span>
          </kbd>
        </div>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle />
        <CommandInput
          placeholder="Type a command or search..."
          value={query}
          onValueChange={onQueryChange}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem>
              <Calendar />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchCommandDialog;

{
  /* <p className="text-sm text-muted-foreground">
        Press{' '}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p> */
}
