import RHFInput from '@/components/ui/RHFInputs/RHFInput';
import { FormProvider, useForm } from 'react-hook-form';

interface ILoginProps {}

const Login: React.FC<ILoginProps> = () => {
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className="flex flex-col gap-3 shadow-xl bg-white w-[min(400px,100%)] p-2 sm:p-5">
      <h2 className="h2-bold text-center">Login</h2>
      <FormProvider {...methods}>
        <RHFInput name="email" type="email" label="Your Email" placeholder="Email" />
        <RHFInput name="password" type="password" label="Your Password" placeholder="Password" />
      </FormProvider>
      This is new pagt
    </div>
  );
};

export default Login;
