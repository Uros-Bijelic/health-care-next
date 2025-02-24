'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar, CalendarProps } from '@/components/ui/calendar';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type Props = {
  name: string;
  label?: string;
  description?: string;
  chooseTime?: boolean;
} & CalendarProps;

const RHFShadcnDatePicker = ({ name, label, description, chooseTime = false, ...rest }: Props) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && <FormLabel>{label}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                initialFocus
                {...rest}
              />
              {chooseTime && (
                <label className="flex gap-2 bg-gray-100 p-2 px-4">
                  Set the time: <input type="time" className="w-full flex-1 cursor-pointer pl-1" />
                </label>
              )}
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RHFShadcnDatePicker;
