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
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useDebounce } from '@/hooks/use-debounce';
import { useAddPatient } from '@/lib/hooks/mutations/use-add-patient';
import { useFetchUsersWithLimit } from '@/lib/hooks/queries/use-fetch-users-with-limit';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const addPatientFormSchema = z.object({
  patientId: z.string().trim().min(1, 'Requred'),
  query: z.string().trim().optional(),
});

type AddPatientSchema = z.infer<typeof addPatientFormSchema>;

const AddPatientDialog = () => {
  const [isComboboxOpen, setIsComboboxOpen] = useState(false);
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(addPatientFormSchema),
    defaultValues: { patientId: '', query: '' },
  });
  const { handleSubmit, getValues } = form;

  const [query, patientId] = getValues(['query', 'patientId']);
  const debouncedQuery = useDebounce(query);

  const {
    formState: { errors, isValid, isSubmitting },
    control,
  } = form;

  const { data: users } = useFetchUsersWithLimit({ query: debouncedQuery, limit: 10 });
  const { mutateAsync: addPatientAsync } = useAddPatient();

  const onSubmit = (data: AddPatientSchema) => {
    addPatientAsync(
      { patientId: data.patientId },
      {
        onSuccess() {
          toast.success('Patient added successfully');
          setisDialogOpen(false);
        },
      },
    );
  };

  const selectedPatient = users?.find((u) => u.id === patientId);

  const nameToDisplay = `${selectedPatient?.firstName || ''} ${selectedPatient?.lastName || ''}`;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setisDialogOpen}>
      <DialogTrigger asChild>
        <Button className="h-auto">Add Patient</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <DialogHeader>
            <DialogTitle>Add Patient</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="flex items-center gap-2">
            <Label>Patient</Label>
            <Popover open={isComboboxOpen} onOpenChange={setIsComboboxOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={isComboboxOpen}
                  className="w-full justify-between"
                >
                  {selectedPatient ? nameToDisplay : 'Select User...'}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" side="bottom" align="end">
                <Command>
                  <Controller
                    name="query"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <CommandInput
                          value={value}
                          onValueChange={onChange}
                          placeholder="Choose patient..."
                        />
                        {errors.patientId && <p>{errors.patientId.message}</p>}
                      </>
                    )}
                  />
                  <CommandList>
                    <CommandGroup forceMount>
                      {users?.length
                        ? users?.map(({ id, firstName, lastName }) => (
                            <Controller
                              key={id}
                              name="patientId"
                              control={control}
                              render={({ field: { onChange } }) => (
                                <CommandItem
                                  key={id}
                                  value={id}
                                  onSelect={(currentValue) => {
                                    onChange(currentValue === patientId ? '' : currentValue);
                                    setIsComboboxOpen(false);
                                  }}
                                >
                                  {firstName} {lastName}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto text-cyan-500',
                                      patientId === id ? 'opacity-100' : 'opacity-0',
                                    )}
                                  />
                                </CommandItem>
                              )}
                            />
                          ))
                        : null}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <DialogFooter className="flex gap-2 sm:justify-end">
            <DialogClose asChild>
              <Button className="text-white" type="button">
                Close
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-800"
              disabled={!isValid || isSubmitting}
            >
              Add Patient
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientDialog;
