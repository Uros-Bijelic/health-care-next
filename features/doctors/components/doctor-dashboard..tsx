'use client';

import SearchCommandDialog from '@/components/ui/search-command-dialog';
import Link from 'next/link';
import { useState } from 'react';

const DoctorDashboard = () => {
  const [query, setQuery] = useState('');

  const handleChangeQuery = (query: string) => {
    setQuery(query);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between gap-2">
        <div className="flex basis-[min(32rem,100%)] self-end">
          <SearchCommandDialog query={query} onQueryChange={handleChangeQuery} />
        </div>
        <div className="flex-end flex flex-col justify-end gap-2">
          <p className="p2-bold">Create new:</p>
          <div className="flex gap-4">
            <Link
              className="rounded-lg bg-cyan-500 px-3 py-1 text-white transition-colors hover:bg-cyan-400 md:px-4"
              href="/record/create?examination"
            >
              Examination
            </Link>
            <Link
              className="rounded-lg bg-cyan-500 px-2 py-1 text-white transition-colors hover:bg-cyan-400 md:px-4"
              href="/record/create?vaccination"
            >
              Vaccination
            </Link>
            <Link
              className="rounded-lg bg-cyan-500 px-2 py-1 text-white transition-colors hover:bg-cyan-400 md:px-4"
              href="/record/create?medicine"
            >
              Medicine
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
