'use client';

import { Button } from '@/components/ui/button';
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
// import { useDebounce } from '@/hooks/use-debounce';
import { useFetchUsersWithLimit } from '@/lib/hooks/queries/use-fetch-users-with-limit';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';

const AddPatientDialog = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);

  const handleChangeQuery = (value: string) => {
    setQuery(value);
  };

  const { data: users } = useFetchUsersWithLimit({ query: debouncedQuery, limit: 10 });

  console.log('users', users);

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
            placeholder="Click to search patient"
          />
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button className="text-white" type="button">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" className="text-white">
            Add Patient
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientDialog;
