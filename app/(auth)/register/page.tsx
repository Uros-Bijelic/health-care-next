'use client';

import LoadingButton from '@/components/ui/loading-button';
import RHFInput from '@/components/ui/rhf-inputs/rhf-input';
import RHFSelect from '@/components/ui/rhf-inputs/rhf-select';
import { useRegisterUser } from '@/lib/hooks/mutations/use-register-user';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const USER_APP_ROLES = [
  {
    id: '1',
    label: 'Doctor',
    value: 'doctor',
  },
  {
    id: '2',
    label: 'Patient',
    value: 'user',
  },
];

const registerFormSchema = z.object({
  email: z.string().trim().email('Please enter valid email address'),
  password: z.string().trim().min(6, 'Password must be at least 6 characters'),
  userName: z.string().trim().min(1, 'Name is required'),
  role: z.enum(['doctor', 'user'], { message: 'Please choose between doctor and user' }),
});

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

const Register = () => {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      userName: '',
      role: undefined,
    },
  });

  const { error, mutateAsync: registerUserAsync } = useRegisterUser();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: RegisterFormSchema) => {
    await registerUserAsync(data, {
      async onSuccess() {
        toast.success('You have registered successfully');
        await signIn('credentials', { ...data, redirectTo: '/' });
      },
    });
  };

  return (
    <div className="flex w-[min(400px,100%)] flex-col gap-3 bg-white p-2 shadow-xl sm:p-5">
      <h2 className="h2-bold text-center">Sign Up</h2>
      {error && <p className="p1-medium text-center text-red-500">{error.message}</p>}
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <RHFInput name="userName" type="text" label="Your Username" placeholder="UserName" />
          <RHFInput name="email" type="email" label="Your Email" placeholder="Email" />
          <RHFInput name="password" type="password" label="Your Password" placeholder="Password" />
          <RHFSelect
            name="role"
            options={USER_APP_ROLES}
            label="Role"
            placeholder="Choose your role"
          />
          <LoadingButton type="submit" isLoading={isSubmitting}>
            Sign Up
          </LoadingButton>
        </form>
        <div className="flex flex-col gap-2 text-center">
          <p className="p2-medium w-full text-center">
            Or if you do have an account Sign In instead
          </p>
          <Link href="/login" className="text-blue-500 underline">
            Sign In
          </Link>
        </div>
      </FormProvider>
    </div>
  );
};

export default Register;
