'use client';

import SearchCommandDialog from '@/components/ui/search-command-dialog';
import DataTable from '@/components/ui/tables/data-table';
import { useFetchDoctorPatients } from '@/lib/hooks/queries/use-fetch-patients';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useState } from 'react';
import AddPatientDialog from './add-patient-dialog';

type TableData = {
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  lastVisitedDate: string;
};

const columns: ColumnDef<TableData>[] = [
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

  let tableData: TableData[] = [];

  if (user) {
    tableData = user?.patients.map(
      ({ firstName, lastName, email, createdAt, updatedAt, lastVisitedDate }) => ({
        firstName,
        lastName,
        email,
        createdAt: format(new Date(createdAt), 'dd/MM/yyyy'),
        updatedAt: format(new Date(updatedAt), 'dd/MM/yyyy'),
        lastVisitedDate: lastVisitedDate ? format(new Date(lastVisitedDate), 'dd/MM/yyyy') : 'N/A',
      }),
    );
  }

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
      {tableData && (
        <div>
          <DataTable columns={columns} data={tableData} />
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
