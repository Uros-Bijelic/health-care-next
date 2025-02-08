'use client';

// ----------------------------------------------------------------

import Link from 'next/link';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectProps } from '@radix-ui/react-select';
import { useFormContext } from 'react-hook-form';

interface IRHFSelectProps extends SelectProps {
  name: string;
  label: string;
  placeholder?: string;
  options: {
    id: string;
    value: string;
    label: string;
  }[];
}

const RHFSelect: React.FC<IRHFSelectProps> = ({ label, options, placeholder, name }) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options?.map(({ id, value, label }) => (
                <SelectItem key={id} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            You can manage email addresses in your{' '}
            <Link href="/examples/forms">email settings</Link>.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RHFSelect;
