/* MATERIAL UI */
import { DatePicker as MuiXDatePicker } from '@mui/x-date-pickers';

/* TYPES */
import type { TextFieldProps } from '@mui/material';
import type { DatePickerProps, PickerValidDate } from '@mui/x-date-pickers';

type DatePickerFieldProps = DatePickerProps<PickerValidDate>;

export default function DatePickerField(props: DatePickerFieldProps) {
  const textFieldProps = props.slotProps?.textField;
  const isFieldError = textFieldProps
    ? (textFieldProps as TextFieldProps).error
    : false;

  return (
    <MuiXDatePicker
      {...props}
      sx={{
        '& .MuiSvgIcon-root': {
          color: isFieldError ? 'error.main' : 'text.primary',
        },
        ...props.sx,
      }}
    />
  );
}
