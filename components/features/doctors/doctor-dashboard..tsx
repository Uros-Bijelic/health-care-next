'use client';

import SearchCommandDialog from '@/components/ui/search-command-dialog';
import Link from 'next/link';
import { useState } from 'react';

const doctorNavLinkStyles =
  'rounded-lg bg-cyan-500 px-3 py-1 !text-white transition-colors hover:bg-cyan-400 md:px-4';

const DoctorDashboard = () => {
  const [query, setQuery] = useState('');

  const handleChangeQuery = (query: string) => {
    setQuery(query);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap justify-between gap-2">
        <div className="flex basis-[min(32rem,100%)] self-end">
          <SearchCommandDialog query={query} onQueryChange={handleChangeQuery} />
        </div>
        <div className="flex-end flex flex-col justify-end gap-2">
          <p className="p2-bold">Create new:</p>
          <div className="flex gap-4">
            <Link className={doctorNavLinkStyles} href="/record/create?type=examination">
              Examination
            </Link>
            <Link className={doctorNavLinkStyles} href="/record/create?type=vaccination">
              Vaccination
            </Link>
            <Link className={doctorNavLinkStyles} href="/record/create?type=medicine">
              Medicine
            </Link>
          </div>
        </div>
      </div>
      <div>
        <aside>CHART HERE</aside>
        <div>MAIN PART PATIENTE</div>
        <aside>LAST VISITED</aside>
      </div>
    </div>
  );
};

export default DoctorDashboard;
