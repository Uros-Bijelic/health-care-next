import VisitsOverview from '@/components/features/doctors/visits-overview';
import { fetchCurrentUser } from '@/lib/api/users';
import { fetchUserVisits } from '@/lib/api/visits';
import { UserProfileWithVisits } from '@/lib/validation';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const patientId = (await params).id;

  let userWithVisits = {} as UserProfileWithVisits;

  try {
    const userVisitsPromise = fetchUserVisits(patientId);
    const currentUserPromise = fetchCurrentUser(patientId);
    const [userVisits, currentUser] = await Promise.all([userVisitsPromise, currentUserPromise]);

    userWithVisits = {
      ...currentUser,
      visits: userVisits,
    };
  } catch (error) {
    console.log('Error', error);
    if (error instanceof Error) {
      return <h1>{error.message || 'Something went wrong, could not show visit'}</h1>;
    }
  }

  return userWithVisits ? <VisitsOverview user={userWithVisits} patientId={patientId} /> : null;
};

export default Page;
