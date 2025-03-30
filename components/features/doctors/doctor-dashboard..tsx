'use client';

import SearchCommandDialog from '@/components/ui/search-command-dialog';
import { useState } from 'react';
import AddPatientDialog from './add-patient-dialog';

const DoctorDashboard = () => {
  const [query, setQuery] = useState('');

  const handleChangeQuery = (query: string) => {
    setQuery(query);
  };

  // /  const { data: user } = useFetchDoctorPatients();

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
      TABELA
    </div>
  );
};

export default DoctorDashboard;
