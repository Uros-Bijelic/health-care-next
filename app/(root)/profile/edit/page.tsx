import ProfileEdit from '@/components/features/user/ProfileEdit';

import { cookies } from 'next/headers';

const Page = async () => {
  const storeCookes = await cookies();

  const token = storeCookes.get('token');
  console.log('token u PAGE U SERVER KOMONENTI ', token);

  return <ProfileEdit />;
};

export default Page;
