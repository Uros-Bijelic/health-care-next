'use client';

import { Button } from '@/components/ui/button';
import { CommandItem } from '@/components/ui/command';
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
import SearchCommandDialog from '@/components/ui/search-command-dialog';
import { useDebounce } from '@/hooks/use-debounce';
import { useFetchUsersWithLimit } from '@/lib/hooks/queries/use-fetch-users-with-limit';
import { Label } from '@radix-ui/react-label';
import { UserIcon } from 'lucide-react';
import { useCallback, useState } from 'react';

const AddPatientDialog = () => {
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);

  const handleChangeQuery = (value: string) => {
    setQuery(value);
  };

  const handleToggleSearchDialog = useCallback(() => {
    setIsSearchDialogOpen((open) => !open);
    setPatientId('');
  }, []);

  const { data: users } = useFetchUsersWithLimit({ query: debouncedQuery, limit: 10 });

  const selectedPatient = users?.find((u) => u.id === patientId);
  const nameToDisplay = `${selectedPatient?.firstName} ${selectedPatient?.lastName}`;

  const searchCommandDialogContent = users?.length
    ? users?.map(({ id, firstName, lastName }) => {
        return (
          <CommandItem
            key={id}
            className="cursor-pointer"
            onSelect={() => {
              setPatientId(id);
              setIsSearchDialogOpen(false);
            }}
          >
            <UserIcon />
            <span>
              {firstName} {lastName}
            </span>
          </CommandItem>
        );
      })
    : null;

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
          <Label>Patient</Label>
          <SearchCommandDialog
            query={query}
            onQueryChange={handleChangeQuery}
            onToggleDialog={handleToggleSearchDialog}
            isOpen={isSearchDialogOpen}
            onOpen={setIsSearchDialogOpen}
            placeholder="Click to search patient"
            options={searchCommandDialogContent}
            value={nameToDisplay}
          />
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button className="text-white" type="button">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" className="text-white" disabled={!patientId}>
            Add Patient
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientDialog;
