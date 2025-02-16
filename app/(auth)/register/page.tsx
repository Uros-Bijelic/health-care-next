'use client';

import { Button } from '@/components/ui/button';
import ButtonLoadingSpinner from '@/components/ui/ButtonLoadingSpinner';
import RHFInput from '@/components/ui/RHFInputs/RHFInput';
import RHFSelect from '@/components/ui/RHFInputs/RHFSelect';
import { USER_APP_ROLES } from '@/lib/constants';
import { useRegisterUser } from '@/lib/hooks/mutations/use-register-user';
import { IRegisterFormSchema, registerFormSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const Register = () => {
  const router = useRouter();
  const methods = useForm<IRegisterFormSchema>({
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
  } = methods;

  const onSubmit = async (data: IRegisterFormSchema) => {
    const { email, password, role, userName } = data;

    try {
      await registerUserAsync(
        { password, userName, email, role },
        {
          onSuccess() {
            toast.success('You have registered successfully');
            router.push('/');
          },
        },
      );
    } catch (error) {
      console.log('Error registering new user in Register page.tsx', error);
    }
  };

  return (
    <div className="flex w-[min(400px,100%)] flex-col gap-3 bg-white p-2 shadow-xl sm:p-5">
      <h2 className="h2-bold text-center">Sign Up</h2>
      {error && <p className="p1-medium text-center text-red-500">{error.message}</p>}
      <FormProvider {...methods}>
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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <ButtonLoadingSpinner />} {isSubmitting ? 'Processing...' : 'Sign Up'}
          </Button>
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
