import ProfileEdit from '@/components/features/user/ProfileEdit';
import { typedFetch } from '@/lib/api';

import { cookies } from 'next/headers';

const Page = async () => {
  const BASE_URL = process.env.LOCALHOST_API;
  const storeCookes = await cookies();

  const token = storeCookes.get('token')?.value || '';
  // console.log('token u PAGE U SERVER KOMONENTI ', token);

  const response = await typedFetch({
    url: `${BASE_URL}/api/user`,
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log('response na FE', response);

  return <ProfileEdit />;
};

export default Page;
