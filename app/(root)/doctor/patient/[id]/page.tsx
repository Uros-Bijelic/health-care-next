import PatientVisists from '@/components/features/doctors/patient-visits';
import { fetchCurrentUser } from '@/lib/api/users';
import { fetchPatientVisits } from '@/lib/api/visits';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const patientId = (await params).id;

  try {
    const userVisitsPromise = fetchPatientVisits(patientId);
    const currentUserPromise = fetchCurrentUser(patientId);
    const [visits, currentUser] = await Promise.all([userVisitsPromise, currentUserPromise]);
    // console.log('visits', visits);
    // console.log('currentUser', currentUser);

    return <PatientVisists user={currentUser} visits={visits} patientId={patientId} />;
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error fetching user and visits', error);
      return <h1>{error.message || 'Something went wrong, could not show visit'}</h1>;
    }

    return <h1>Unexpected error occurred.</h1>;
  }
};

export default Page;
