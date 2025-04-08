'use client';

import { Button } from '@/components/ui/button';
import { Command, CommandInput } from '@/components/ui/command';
import DataTable from '@/components/ui/tables/data-table';
import type { UserProfileWithVisits } from '@/lib/validation';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDownIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AddVisitDialog from './add-visit-dialog';

type Props = {
  user: UserProfileWithVisits;
  patientId: string;
};

type TableData = {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  reasonForVisit: string;
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
          First Name
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
    accessorKey: 'reasonForVisit',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Reason for visit
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

const VisitsOverview = ({ user, patientId }: Props) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  // const debouncedQuery = useDebounce(query, 300);

  const handleChangeQuery = (query: string) => {
    setQuery(query);
  };

  const handleClickRow = (data: TableData) => {
    console.log('a', data);

    router.push(`/doctor/visit/${data.id}`);
  };

  let tableData: TableData[] = [];

  if (user.visits.length > 0) {
    tableData = user.visits.map(({ firstName, lastName, createdAt, reasonForVisit, id }) => ({
      firstName,
      lastName,
      createdAt: format(new Date(createdAt), 'dd/MMM/yyyy'),
      reasonForVisit,
      id,
    }));
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 p-3 shadow-md">
        <h1 className="text-2xl font-bold">Patient Info</h1>
        <div className="flex flex-col gap-2">
          <p className="p3-medium">
            <span className="font-bold">Creted at:</span>
            {format(new Date(user.createdAt), 'dd/MMM/yyyy')}
          </p>
          <p className="p3-medium">
            <span className="font-bold">Patient:</span> {user.firstName} {user.lastName}
          </p>
          <p className="p3-medium">
            <span className="font-bold">Allergies:</span> {user.allergies || 'N/A'}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="flex min-w-[420px] flex-1">
          <Command>
            <CommandInput
              placeholder="Type a command or search..."
              value={query}
              onValueChange={handleChangeQuery}
            />
          </Command>
        </div>
        <div className="flex gap-2">
          <AddVisitDialog
            patientId={patientId}
            firstName={user.firstName}
            lastName={user.lastName}
          />
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

export default VisitsOverview;
