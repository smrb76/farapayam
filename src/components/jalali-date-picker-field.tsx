import DatePicker from 'react-multi-date-picker';
import type { DateObject } from 'react-multi-date-picker';

import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

type Props = {
  value?: string; // "YYYY/MM/DD"
  onChange?: (v: string) => void;
  className?: string;
  placeholder?: string;
};

export default function JalaliDatePickerField({
  value = '',
  onChange,
  className = '',
  placeholder = '__/__/__',
}: Props) {
  return (
    <DatePicker
      calendar={persian}
      locale={persian_fa}
      format="YYYY/MM/DD"
      value={value || undefined}
      onChange={(d: DateObject | null) => {
        onChange?.(d ? d.format('YYYY/MM/DD') : '');
      }}
      calendarPosition="bottom-right"
      render={(val: string, openCalendar: () => void) => (
        <input
          readOnly
          value={val || ''}
          onClick={openCalendar}
          className={className}
          placeholder={placeholder}
        />
      )}
    />
  );
}
