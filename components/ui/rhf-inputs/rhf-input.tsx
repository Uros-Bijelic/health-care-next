'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { ComponentPropsWithRef } from 'react';
import { useFormContext } from 'react-hook-form';

type RHFInputProps = {
  name: string;
  label?: string;
  description?: string;
} & ComponentPropsWithRef<'input'>;

const RHFInput = ({ name, label, description, ...rest }: RHFInputProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...field} {...rest} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RHFInput;
