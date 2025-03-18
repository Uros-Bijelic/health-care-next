import { useEffect, useRef, useState } from 'react';

export const useDebounce = (value: string, timeout = 500) => {
  const [debouncedValue, setDebouncedValue] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [timeout, value]);

  return debouncedValue;
};
