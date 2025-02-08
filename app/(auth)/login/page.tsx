import { Input } from '@/components/ui/input';

interface ILoginProps {}

const Login: React.FC<ILoginProps> = () => {
  return (
    <div className="flex flex-col gap-3 shadow-xl bg-white w-[min(400px,100%)] p-2 sm:p-5">
      <Input />
      This is new pagt
    </div>
  );
};

export default Login;
