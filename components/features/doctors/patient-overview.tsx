'use client';

import SearchCommandDialog from '@/components/ui/search-command-dialog';
import { format } from 'date-fns';
// import { format } from 'path';
import type { UserProfileWithVisits } from '@/lib/validation';
import { useState } from 'react';
import AddPatientDialog from './add-patient-dialog';

type Props = {
  user: UserProfileWithVisits;
};

// type TableData = {};

// const columns: ColumnDef<TableData>[] = [
//   {
//     accessorKey: 'firstName',
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           className="px-0"
//           onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//         >
//           Patient Full Name
//           <ArrowUpDownIcon className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//   },
//   {
//     accessorKey: 'createdAt',
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           className="px-0"
//           onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//         >
//           Created at
//           <ArrowUpDownIcon className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//   },
//   {
//     accessorKey: 'lastVisitedDate',
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           className="px-0"
//           onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//         >
//           Last Visited
//           <ArrowUpDownIcon className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//   },
// ];

const PatientOverview = ({ user }: Props) => {
  const [query, setQuery] = useState('');
  // const debouncedQuery = useDebounce(query, 300);

  const handleChangeQuery = (query: string) => {
    setQuery(query);
  };

  console.log('user', user);

  // const handleClickRow = (user: string) => {};

  // console.log('user patient overerview', user);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 shadow-md max-sm:p-2">
        <h1 className="text-2xl font-bold">Patient Info</h1>
        <div className="flex flex-col gap-1">
          <p className="p3-medium">Cretaed at: {format(new Date(user.createdAt), 'dd/MMM/yyyy')}</p>
          <p className="p3-medium">
            Patient: {user.firstName} {user.lastName}
          </p>
        </div>
        <p className="p3-medium">Allergies: {user.allergies}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="flex min-w-[420px] flex-1">
          <SearchCommandDialog
            query={query}
            onQueryChange={handleChangeQuery}
            // options={searchDialogOptions}
          />
        </div>
        <div className="flex gap-2">
          <AddPatientDialog />
        </div>
      </div>
      {/* {tableData && (
        <div>
          <DataTable columns={columns} data={tableData} enableSorting onRowClick={handleClickRow} />
        </div>
      )} */}
    </div>
  );
};

export default PatientOverview;
