import { fetchVisitById } from '@/lib/api/visits';
import { UserVisitDTO } from '@/lib/validation';
import { format } from 'date-fns';
import Link from 'next/link';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const visitId = (await params).id;

  const visit: UserVisitDTO | undefined = await fetchVisitById(visitId);

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex flex-col gap-2">
        <p className="flex gap-2">
          <span className="font-bold">Creted at:</span>{' '}
          {format(new Date(visit?.createdAt), 'dd/MMM/yyyy')}
        </p>
        <p className="flex gap-2">
          <span className="font-bold">Patient:</span>
          {visit?.firstName} {visit?.lastName}
        </p>
        <p className="flex gap-2">
          <span className="font-bold">Reason for visit:</span>
          {visit?.reasonForVisit}
        </p>
        <p className="flex gap-2">
          <span className="font-bold">Diagnosis:</span>
          {visit?.diagnosis}
        </p>
      </div>
      <div className="flex-end flex flex-1 items-end justify-end">
        <Link
          className="rounded-lg bg-cyan-500 px-4 py-2 text-white"
          href={`/doctor/patient/${visit.patientId}`}
        >
          Back To Patient
        </Link>
      </div>
    </div>
  );
};

export default Page;
