'use client';

import SearchCommandDialog from '@/components/ui/search-command-dialog';
import { useState } from 'react';

const DoctorDashboard = () => {
  const [query, setQuery] = useState('');

  const handleChangeQuery = (query: string) => {
    setQuery(query);
  };

  return (
    <div>
      <div>
        <SearchCommandDialog query={query} onQueryChange={handleChangeQuery} />
      </div>
    </div>
  );
};

export default DoctorDashboard;
