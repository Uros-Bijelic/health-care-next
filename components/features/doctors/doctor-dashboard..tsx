'use client';

import SearchCommandDialog from '@/components/ui/search-command-dialog';
import { useState } from 'react';
import AddPatientDialog from './add-patient-dialog';

const DoctorDashboard = () => {
  const [query, setQuery] = useState('');
  // const debouncedQuery = useDebounce(query);
  // // const db = firebaseInstance.getDb();

  const handleChangeQuery = (query: string) => {
    setQuery(query);
  };

  // const { data: usersData } = useQuery({
  //   queryKey: [FIRESTORE_COLLECTIONS.USERS],
  //   queryFn: async () => {
  //     try {
  //       const usersCollection = collection(db, FIRESTORE_COLLECTIONS.USERS);
  //       const usersSnapshots = await getDocs(usersCollection);

  //       const users: UserProfileDTO[] = [];

  //       usersSnapshots.forEach((doc) => {
  //         if (doc.exists()) {
  //           console.log('USER DOC', doc.data());
  //           users.push(doc.data() as UserProfileDTO);

  //           console.log('users', users);
  //           console.log('debouncedQuery', debouncedQuery);
  //         }
  //       });

  //       return users;
  //     } catch (error) {
  //       if (error instanceof FirestoreError) {
  //         const errorMessage = getFirestoreErrorMessage(error.code);
  //         throw new Error(errorMessage);
  //       }
  //     }
  //   },
  //   enabled: !!debouncedQuery,
  // });

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
    </div>
  );
};

export default DoctorDashboard;
