import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '../icons/Calendar';

import './DatePicker.css';

// ----------------------------------------------------------------

type TDatePickerProps = React.ComponentProps<typeof ReactDatePicker>;

type IDatePickerProps = TDatePickerProps & {
  label?: string;
  errorMessage?: string;
};

const DatePicker: React.FC<IDatePickerProps> = ({ label = '', errorMessage = '', id, ...rest }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="p2-regular text-gray-700" htmlFor={id}>
        {label}
      </label>
      <ReactDatePicker
        className="w-full cursor-pointer rounded-md border-2 border-gray-300 text-gray-800 outline-none transition placeholder:text-sm focus:border-cyan-400"
        showIcon
        icon={<CalendarIcon />}
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
        toggleCalendarOnIconClick
        dateFormat="MMMM d, yyyy"
        {...rest}
      />
      {errorMessage && <p className="p3-medium text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default DatePicker;
