'use client';

import SearchCommandDialog from '@/components/ui/search-command-dialog';
import { useFetchPatients } from '@/lib/hooks/queries/use-fetch-patients';
import { useState } from 'react';
import AddPatientDialog from './add-patient-dialog';

const DoctorDashboard = () => {
  const [query, setQuery] = useState('');
  // // const db = firebaseInstance.getDb();

  const handleChangeQuery = (query: string) => {
    setQuery(query);
  };

  const { data: user } = useFetchPatients();

  console.log('user', user);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <div className="flex min-w-[420px] flex-1">
          <SearchCommandDialog query={query} onQueryChange={handleChangeQuery} />
        </div>
        <div className="flex gap-2">
          <AddPatientDialog />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
