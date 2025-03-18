'use client';

import SearchCommandDialog from '@/components/ui/search-command-dialog';
import { useEffect, useRef, useState } from 'react';

const useDebounce = (value: string, timeout = 500) => {
  const [debouncedValue, setDebouncedValue] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);

    return () => clearTimeout(timeoutRef.current);
  }, [timeout, value]);

  return debouncedValue;
};

const DoctorDashboard = () => {
  const [query, setQuery] = useState('');
  const debouncedValue = useDebounce(query);

  const handleChangeQuery = (query: string) => {
    setQuery(query);
  };

  useEffect(() => {
    console.log('query', query);
    console.log('debouncedValue', debouncedValue);
  }, [query]);

  return (
    <div>
      <div>
        <SearchCommandDialog query={query} onQueryChange={handleChangeQuery} />
      </div>
    </div>
  );
};

export default DoctorDashboard;
