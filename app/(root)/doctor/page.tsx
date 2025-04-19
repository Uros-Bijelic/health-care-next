'use client';

import AddPatientDialog from '@/components/features/doctors/add-patient-dialog';
import { Button } from '@/components/ui/button';
import { Command, CommandInput } from '@/components/ui/command';
import DataTable from '@/components/ui/tables/data-table';
import { useDebounce } from '@/hooks/use-debounce';
import { useFetchDoctorPatients } from '@/lib/hooks/queries/use-fetch-doctor-patients';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDownIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type TableData = {
  id: string;
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
          Last Name
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

const DoctorHome = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const handleChangeQuery = (query: string) => {
    setQuery(query);
  };

  const handleClickRow = (user: TableData) => {
    router.push(`/doctor/patient/${user.id}`);
  };

  const { data: user } = useFetchDoctorPatients({ query: debouncedQuery, limit: 10 });

  let tableData: TableData[] = [];

  if (user) {
    tableData = user?.patients.map(
      ({ id, firstName, lastName, email, createdAt, updatedAt, lastVisitedDate }) => ({
        id,
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
        <div className="flex min-w-[420px] flex-1 rounded-lg border">
          <Command>
            <CommandInput
              placeholder="Search for a patient..."
              value={query}
              onValueChange={handleChangeQuery}
            />
          </Command>
        </div>
        <div className="flex gap-2">
          <AddPatientDialog />
        </div>
      </div>
      {tableData && (
        <div>
          <DataTable columns={columns} data={tableData} enableSorting onRowClick={handleClickRow} />
        </div>
      )}
    </div>
  );
};

export default DoctorHome;
