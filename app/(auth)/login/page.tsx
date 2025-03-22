'use client';

import LoadingButton from '@/components/ui/loading-button';
import RHFInput from '@/components/ui/rhf-inputs/rhf-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().trim().email('Please enter valid email address'),
  password: z.string().trim().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

const Login = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: LoginFormSchema) => {
    await signIn('credentials', { ...data, redirectTo: '/' });
  };

  return (
    <div className="flex w-[min(400px,100%)] flex-col gap-3 bg-white p-2 shadow-xl sm:p-5">
      <h2 className="h2-bold text-center">Login</h2>
      {error && <p className="p1-medium text-center text-red-500">Invalid Credentials</p>}
      <FormProvider {...form}>
        <form action="" className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <RHFInput name="email" type="email" label="Your Email" placeholder="Email" />
          <RHFInput name="password" type="password" label="Your Password" placeholder="Password" />
          <LoadingButton type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
            Login
          </LoadingButton>
        </form>
        <div className="flex flex-col gap-2 text-center">
          <p className="p2-medium w-full text-center">
            Or if you don&apos;t have account yet create one
          </p>
          <Link href="/register" className="text-blue-500 underline">
            Sign Up
          </Link>
        </div>
      </FormProvider>
    </div>
  );
};

export default Login;
