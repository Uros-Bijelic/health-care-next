'use client';

import DatePicker from '@/components/ui/DatePicker';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import RHFInput from '@/components/ui/RHFInputs/RHFInput';
import RHFTextarea from '@/components/ui/RHFInputs/RHFTextarea';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useUpdateUser } from '@/lib/hooks/mutations/use-update-user';
import { useFetchUser } from '@/lib/hooks/queries/use-fetch-user';
import { IUserProfileSchema, userProfileSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

// ----------------------------------------------------------------

const ProfileEdit = () => {
  const router = useRouter();
  const { data: userData, isPending, error: userDataError } = useFetchUser();
  const { mutateAsync: updateUserAsync } = useUpdateUser();

  const methods = useForm<IUserProfileSchema>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      birthDate: null,
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
      birthDate: userData?.birthDate?.toDate() || null,
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
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: IUserProfileSchema) => {
    try {
      await updateUserAsync(
        { data },
        {
          onError(error) {
            toast.error(error.message);
          },
          onSuccess() {
            toast.success('Profile updated successfully');
            router.push('/');
          },
        },
      );
    } catch (error) {
      console.log('Error updating User profile info', error);
    }
  };

  if (isPending) {
    return <LoadingSpinner asLayout />;
  }

  return (
    <section className="m-auto flex flex-1 flex-col gap-2 p-3 max-sm:w-[min(600px,100%)] sm:gap-4">
      <h2 className="text-[20px] font-bold">Your Health Card</h2>
      <p className="p2-bold">{userDataError?.message}</p>
      <FormProvider {...methods}>
        <form className="gap-6 md:flex lg:gap-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[min(600px,100%)]">
            <p className="p1-bold mb-2 underline">Personal Info</p>
            <div className="flex flex-col gap-2">
              <RHFInput name="firstName" label="First Name" placeholder="First name" />
              <RHFInput name="lastName" label="Last Name" placeholder="Last name" />
              <RHFInput name="userName" label="Userame" placeholder="Username" />
              <RHFInput name="email" label="Email" placeholder="Email" />
              <FormField
                control={control}
                name="birthDate"
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>Birth Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        errorMessage={error?.message}
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                        placeholderText="Click to select a date"
                        maxDate={new Date()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            <Button type="submit" className="mt-4 w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Submit'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default ProfileEdit;
