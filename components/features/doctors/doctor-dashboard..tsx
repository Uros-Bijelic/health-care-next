'use client';

import SearchCommandDialog from '@/components/ui/search-command-dialog';
import DataTable from '@/components/ui/tables/data-table';
import { useFetchDoctorPatients } from '@/lib/hooks/queries/use-fetch-patients';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { UserProfileDTO } from '../user/profile-edit';
import AddPatientDialog from './add-patient-dialog';

const columns: ColumnDef<UserProfileDTO>[] = [
  {
    accessorKey: 'firstName',
    header: 'First name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created at',
  },
  {
    accessorKey: 'lastVisitedDate',
    header: 'Last Visited',
  },
];

const DoctorDashboard = () => {
  const [query, setQuery] = useState('');

  const handleChangeQuery = (query: string) => {
    setQuery(query);
  };

  const { data: user } = useFetchDoctorPatients();

  const tableColumns = user?.patients.map(
    ({ id, firstName, lastName, createdAt, updatedAt, lastVisitedDate }) => ({
      id,
      firstName,
      lastName,
      createdAt,
      updatedAt,
      lastVisitedDate: lastVisitedDate || 'N/A',
    }),
  ) as ColumnDef<UserProfileDTO>[];

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
      {tableColumns && (
        <div>
          <DataTable columns={columns} data={[]} />
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
