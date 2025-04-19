'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import RHFInput from '@/components/ui/rhf-inputs/rhf-input';
import RHFTextarea from '@/components/ui/rhf-inputs/rhf-textarea';
import { useCreateNewVisit } from '@/lib/hooks/mutations/use-create-new-visit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const addVisitSchema = z.object({
  reasonForVisit: z.string().trim().min(1, 'Required'),
  diagnosis: z.string().trim().min(1, 'Required'),
  specialNotes: z.string().trim().optional(),
});

export type AddVisitForm = z.infer<typeof addVisitSchema>;

type Props = {
  patientId: string;
  firstName: string;
  lastName: string;
};

const AddVisitDialog = ({ patientId, firstName, lastName }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<AddVisitForm>({
    resolver: zodResolver(addVisitSchema),
    defaultValues: {
      reasonForVisit: '',
      diagnosis: '',
      specialNotes: '',
    },
  });

  const { mutateAsync: createNewVisitAsync } = useCreateNewVisit();

  const {
    formState: { isValid, isSubmitting },
    handleSubmit,
  } = form;

  const onSubmit = async (data: AddVisitForm) => {
    const visit = {
      ...data,
      firstName,
      lastName,
      patientId,
    };

    try {
      await createNewVisitAsync(visit, {
        onSuccess() {
          toast.success('You have successfully create new visit');
          setIsOpen(false);
        },
        onError(error) {
          toast.error(error.message);
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error creating new user', error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="h-auto">Create Visit</Button>
      </DialogTrigger>
      <DialogContent className="!w-[min(400px, 100%)]">
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
            <RHFTextarea label="Diagnosis" name="diagnosis" placeholder="Diagnosis..." rows={5} />
            <RHFTextarea
              label="Special Notes"
              name="specialNotes"
              placeholder="Special notes..."
              rows={5}
            />
            <DialogFooter>
              <Button type="button" onClick={() => setIsOpen(false)}>
                Close
              </Button>
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
