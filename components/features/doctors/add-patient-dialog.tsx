'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useDebounce } from '@/hooks/use-debounce';
import { useFetchUsersWithLimit } from '@/lib/hooks/queries/use-fetch-users-with-limit';
import { cn } from '@/lib/utils';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

const AddPatientDialog = () => {
  const [patientId, setPatientId] = useState('');
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);
  const [open, setOpen] = useState(false);

  const handleChangeQuery = (value: string) => {
    setQuery(value);
  };

  const { data: users } = useFetchUsersWithLimit({ query: debouncedQuery, limit: 10 });

  const selectedPatient = users?.find((u) => u.id === patientId);
  const nameToDisplay = `${selectedPatient?.firstName} ${selectedPatient?.lastName}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white">Add Patient</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Patient</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex items-center gap-2">
          <span>Patient</span>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {patientId ? nameToDisplay : 'Select User...'}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="bottom" align="end">
              <Command>
                <CommandInput
                  value={query}
                  onValueChange={handleChangeQuery}
                  placeholder="Choose patient..."
                />
                <CommandList>
                  <CommandGroup forceMount>
                    {users?.length
                      ? users?.map(({ id, firstName, lastName }) => (
                          <CommandItem
                            key={id}
                            value={id}
                            onSelect={(currentValue) => {
                              console.log('current value:', currentValue);
                              setPatientId(currentValue === patientId ? '' : currentValue);
                              setOpen(false);
                            }}
                          >
                            {firstName} {lastName}
                            <CheckIcon
                              className={cn(
                                'ml-auto',
                                patientId === id ? 'opacity-100' : 'opacity-0',
                              )}
                            />
                          </CommandItem>
                        ))
                      : null}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button className="text-white" type="button">
              Close
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-800"
            disabled={!patientId}
          >
            Add Patient
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientDialog;
