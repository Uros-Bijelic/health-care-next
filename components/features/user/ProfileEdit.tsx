'use client';

import LoadingButton from '@/components/ui/loading-button';
import RHFInput from '@/components/ui/rhf-inputs/rhf-input';
import RHFShadcnDatePicker from '@/components/ui/rhf-inputs/rhf-shadcn-date-picker';
import RHFTextarea from '@/components/ui/rhf-inputs/rhf-textarea';
import SpinningLoader from '@/components/ui/SpinningLoader';
import { useUpdateUser } from '@/lib/hooks/mutations/use-update-user';
import { useFetchUser } from '@/lib/hooks/queries/use-fetch-user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Timestamp } from 'firebase/firestore';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const userProfileSchema = z.object({
  userName: z.string().trim().min(3, 'Username is required and must be at least 3 characters long'),
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  birthDate: z.date({ required_error: 'Date of birth is required' }).optional(),
  profileImg: z.string().trim().optional(), // * add .url() method if later in the app i decide to store user images (probably with google)???
  email: z.string().trim().email('Please provide valid email address'),
  allergies: z.string().trim().optional(),
  specialNotes: z.string().trim().optional(),
  address: z.object({
    country: z.string().trim().min(3, 'Country is required'),
    city: z.string().trim().min(3, 'City is required'),
    street: z.string().trim().min(3, 'Street is required'),
    phone: z.string().trim().min(3, 'Phone is required'),
  }),
});

export type UserProfileSchema = z.infer<typeof userProfileSchema>;

export const userProfileSchemaDTO = userProfileSchema.extend({
  id: z.string().trim(),
  createdAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp),
  birthDate: z.instanceof(Timestamp).optional(),
});

export type UserProfileSchemaDTO = z.infer<typeof userProfileSchemaDTO>;

const ProfileEdit = () => {
  const { data: userData, isPending, error: userDataError } = useFetchUser();
  const { mutateAsync: updateUserAsync } = useUpdateUser();

  const form = useForm<UserProfileSchema>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      birthDate: undefined,
      allergies: '',
      profileImg: '',
      specialNotes: '',
      address: {
        country: '',
        city: '',
        street: '',
        phone: '',
      },
    },
    values: {
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      userName: userData?.userName || '',
      email: userData?.email || '',
      birthDate: userData?.birthDate?.toDate() || undefined,
      allergies: userData?.allergies || '',
      profileImg: userData?.profileImg || '',
      specialNotes: userData?.specialNotes || '',
      address: {
        country: userData?.address?.country || '',
        city: userData?.address?.city || '',
        street: userData?.address?.street || '',
        phone: userData?.address?.phone || '',
      },
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: UserProfileSchema) => {
    await updateUserAsync(
      { data },
      {
        onError(error) {
          toast.error(error.message);
        },
        onSuccess() {
          toast.success('Profile updated successfully');
        },
      },
    );
  };

  if (isPending) {
    return <SpinningLoader asOverlay />;
  }

  return (
    <div className="mx-auto flex w-[min(1000px,100%)] flex-1 flex-col gap-2 p-3 sm:gap-4">
      <h2 className="text-[20px] font-bold">Your Health Card</h2>
      <p className="p2-bold">{userDataError?.message}</p>
      <FormProvider {...form}>
        <form className="gap-6 md:flex lg:gap-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[min(600px,100%)]">
            <p className="p1-bold mb-2 underline">Personal Info</p>
            <div className="flex flex-col gap-2">
              <RHFInput name="firstName" label="First Name" placeholder="First name" />
              <RHFInput name="lastName" label="Last Name" placeholder="Last name" />
              <RHFInput name="userName" label="Userame" placeholder="Username" />
              <RHFInput name="email" label="Email" placeholder="Email" />
              <RHFShadcnDatePicker name="birthDate" label="Date of birth" chooseTime />
              <RHFTextarea name="allergies" placeholder="Allergies" label="Allergies" />
              <RHFTextarea name="specialNotes" placeholder="Special Notes" label="Special Notes" />
            </div>
          </div>
          <div className="w-[min(600px,100%)]">
            <p className="p1-bold mb-2 underline">Address</p>
            <div className="flex flex-col gap-2">
              <RHFInput name="address.country" label="Country" placeholder="Country" />
              <RHFInput name="address.city" label="City" placeholder="City" />
              <RHFInput name="address.street" label="Street" placeholder="Street" />
              <RHFInput name="address.phone" label="Phone" placeholder="Phone" />
            </div>
            <LoadingButton
              type="submit"
              className="mt-4 w-full"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Update
            </LoadingButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ProfileEdit;
