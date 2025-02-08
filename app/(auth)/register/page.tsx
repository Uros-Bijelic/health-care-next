'use client';

import { Button } from '@/components/ui/button';
import RHFInput from '@/components/ui/RHFInputs/RHFInput';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';

interface IRegisterProps {}

const Register: React.FC<IRegisterProps> = () => {
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
      userName: '',
      role: '',
    },
  });

  return (
    <div className="flex flex-col gap-3 shadow-xl bg-white w-[min(400px,100%)] p-2 sm:p-5">
      <h2 className="h2-bold text-center">Sign Up</h2>
      <FormProvider {...methods}>
        <form action="" className="flex flex-col gap-3">
          <RHFInput name="userName" type="text" label="Your Username" placeholder="UserName" />
          <RHFInput name="email" type="email" label="Your Email" placeholder="Email" />
          <RHFInput name="password" type="password" label="Your Password" placeholder="Password" />
          <Button type="submit">Sign Up</Button>
        </form>
        <div className="flex flex-col gap-2 text-center ">
          <p className="p2-medium text-center w-full">
            Or if you don&apos;t have account yet create one
          </p>
          <Link href="/login" className="text-blue-500 underline">
            Sign Up
          </Link>
        </div>
      </FormProvider>
    </div>
  );
};

export default Register;
