import { auth } from '@/auth';
import { NotFoundImage } from '@/public/assets/images/not-found';
import Link from 'next/link';

const NotFound = async () => {
  const session = await auth();
  const isDoctor = session?.user.role === 'doctor';

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex min-w-[320px] flex-col items-center p-3 text-center">
        <h3 className="text-xl sm:text-3xl">404 Page Not Found</h3>
        <NotFoundImage className="-my-6" />
        <div className="flex items-center gap-2">
          Go back
          <Link
            className="rounded-md bg-cyan-500 px-3 py-2 text-white"
            href={isDoctor ? '/doctor' : '/user'}
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
