import PatientVisits from '@/components/features/doctors/patient-visits';
import { fetchCurrentUser } from '@/lib/api/users';
import { fetchPatientVisits } from '@/lib/api/visits';
import { UserProfileDTO, UserVisitDTO } from '@/lib/validation';
import { FirestoreError } from 'firebase/firestore';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const patientId = (await params).id;

  let user = {} as UserProfileDTO;
  let userVisits = [] as UserVisitDTO[];

  try {
    const userVisitsPromise = fetchPatientVisits({ patientId, searchQuery: '' });
    const currentUserPromise = fetchCurrentUser(patientId);
    const [visits, currentUser] = await Promise.all([userVisitsPromise, currentUserPromise]);

    userVisits = visits;
    user = currentUser;
  } catch (error) {
    if (error instanceof FirestoreError) {
      console.log('Error fetching user and visits', error);
      return <h1>{error.message || 'Something went wrong, could not show visit'}</h1>;
    }
  }

  return (
    <PatientVisits
      user={user as UserProfileDTO}
      visits={userVisits as UserVisitDTO[]}
      patientId={patientId}
    />
  );
};

export default Page;
