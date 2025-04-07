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
import RHFInput from '@/components/ui/rhf-inputs/rhf-input';
import RHFTextarea from '@/components/ui/rhf-inputs/rhf-textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const addVisitSchema = z.object({
  reasonForVisit: z.string().trim().min(1, 'Required'),
  diagnosis: z.string().trim().min(1, 'Required'),
});

type AddVisitForm = z.infer<typeof addVisitSchema>;

const AddVisitDialog = () => {
  const form = useForm<AddVisitForm>({
    resolver: zodResolver(addVisitSchema),
    defaultValues: {
      reasonForVisit: '',
      diagnosis: '',
    },
  });

  const {
    formState: { isValid, isSubmitting },
    handleSubmit,
  } = form;

  const onSubmit = (data: AddVisitForm) => {
    console.log('data', data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-auto">Create Visit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cretae new patient visit</DialogTitle>
          <DialogDescription>Fill in the form to create a new visit</DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <RHFInput
              label="Reason for visit"
              name="reasonForVisit"
              placeholder="Type reason for visit..."
            />
            <RHFTextarea label="Diagnosis" name="diagnosis" placeholder="Diagnosis..." rows={10} />
            <DialogFooter>
              <DialogClose>
                <Button asChild type="button">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AddVisitDialog;
