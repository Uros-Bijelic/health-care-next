'use client';

import { Button } from '@/components/ui/button';
import RHFInput from '@/components/ui/RHFInputs/RHFInput';
import { ILoginFormSchema, loginFormSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';

// ----------------------------------------------------------------

interface ILoginProps {}

const Login: React.FC<ILoginProps> = () => {
  const methods = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const onSubmit = (data: ILoginFormSchema) => {
    console.log('data u loginu', data);
  };

  return (
    <div className="flex flex-col gap-3 shadow-xl bg-white w-[min(400px,100%)] p-2 sm:p-5">
      <h2 className="h2-bold text-center">Login</h2>
      <FormProvider {...methods}>
        <form action="" className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <RHFInput name="email" type="email" label="Your Email" placeholder="Email" />
          <RHFInput name="password" type="password" label="Your Password" placeholder="Password" />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Login'}
          </Button>
        </form>
        <div className="flex flex-col gap-2 text-center ">
          <p className="p2-medium text-center w-full">
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
