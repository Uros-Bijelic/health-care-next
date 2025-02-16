'use client';

import { Button } from '@/components/ui/button';
import ButtonLoadingSpinner from '@/components/ui/ButtonLoadingSpinner';
import RHFInput from '@/components/ui/RHFInputs/RHFInput';
import { useLoginUser } from '@/lib/hooks/mutations/use-login-user';
import { ILoginFormSchema, loginFormSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

const Login = () => {
  const router = useRouter();
  const methods = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { error, mutateAsync: loginUserAsync } = useLoginUser();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: ILoginFormSchema) => {
    const { email, password } = data;

    try {
      await loginUserAsync(
        { email, password },
        {
          onSuccess() {
            router.push('/');
          },
        },
      );
    } catch (error) {
      console.log('Error logging in user on Login page', error);
    }
  };

  return (
    <div className="flex w-[min(400px,100%)] flex-col gap-3 bg-white p-2 shadow-xl sm:p-5">
      <h2 className="h2-bold text-center">Login</h2>
      {error && <p className="p1-medium text-center text-red-500">{error.message}</p>}
      <FormProvider {...methods}>
        <form action="" className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <RHFInput name="email" type="email" label="Your Email" placeholder="Email" />
          <RHFInput name="password" type="password" label="Your Password" placeholder="Password" />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <ButtonLoadingSpinner />} {isSubmitting ? 'Processing...' : 'Login'}
          </Button>
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
