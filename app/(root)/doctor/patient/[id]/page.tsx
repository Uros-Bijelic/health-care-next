import PatientOverview from '@/components/features/doctors/patient-overview';
import { fetchUserVisits } from '@/lib/api/visits';

type Props = {
  params: Promise<{ id: string }>;
};

// Ovu stranu namerno radim SSR da bih prodiskutovao sa Nenadom pitanje u mom test editoru

const Page = async ({ params }: Props) => {
  const patientId = (await params).id;

  const userWithVisits = await fetchUserVisits(patientId);

  console.log('userWithVisits', userWithVisits);

  return userWithVisits ? <PatientOverview user={userWithVisits} /> : null;
};

export default Page;
