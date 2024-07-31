/* MATERIAL UI */
import { FormControl, InputLabel, Select } from '@mui/material';

/* TYPES */
import type { PropsWithChildrenRequired } from '@/types';
import type { SelectProps } from '@mui/material/Select';

type SelectFieldProps = SelectProps &
  PropsWithChildrenRequired & {
    fullWidth?: boolean;
  };

export default function SelectField(props: SelectFieldProps) {
  const { children, fullWidth, label } = props;

  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel id={`select-label-${label}`}>{label}</InputLabel>
      <Select
        labelId={`select-label-${label}`}
        sx={{
          ...props.sx,
          '& .MuiSvgIcon-root': {
            color: 'text.primary',
          },
        }}
        {...props}
      >
        {children}
      </Select>
    </FormControl>
  );
}
