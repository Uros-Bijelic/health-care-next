'use client';

import { Button } from '@/components/ui/button';
import SearchCommandDialog from '@/components/ui/search-command-dialog';
import DataTable from '@/components/ui/tables/data-table';
import { useFetchDoctorPatients } from '@/lib/hooks/queries/use-fetch-patients';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDownIcon } from 'lucide-react';
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          First name
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Last name
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created at
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Updated at
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'lastVisitedDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Last Visited
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
        createdAt: format(new Date(createdAt), 'dd/MMM/yyyy'),
        updatedAt: format(new Date(updatedAt), 'dd/MMM/yyyy'),
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
