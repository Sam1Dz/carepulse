/* MATERIAL UI */
import { DatePicker as MuiXDatePicker } from '@mui/x-date-pickers';

/* TYPES */
import type { DatePickerProps, PickerValidDate } from '@mui/x-date-pickers';

type DatePickerFieldProps = DatePickerProps<PickerValidDate> & {
  fullWidth?: boolean;
};

export default function DatePickerField(props: DatePickerFieldProps) {
  const isFullWidth = props.fullWidth
    ? {
        width: '100%',
      }
    : {};

  return (
    <MuiXDatePicker
      sx={{
        width: isFullWidth,
        '& .MuiSvgIcon-root': {
          color: 'text.primary',
        },
      }}
      {...props}
    />
  );
}
