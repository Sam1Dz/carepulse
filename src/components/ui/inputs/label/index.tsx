/* MATERIAL UI */
import { FormLabel as MuiFormLabel } from '@mui/material';

/* types */
import type { PropsWithChildrenRequired } from '@/types';
import type { FormLabelProps as MuiFormLabelProps } from '@mui/material';

type FormLabelProps = MuiFormLabelProps & PropsWithChildrenRequired;

export default function FormLabel(props: FormLabelProps) {
  return (
    <MuiFormLabel
      {...props}
      sx={{
        mx: 1.75,
        color: (theme) =>
          !props.error ? theme.palette.text.primary : theme.palette.error.main,
        ...props.sx,
      }}
    >
      {props.children}
    </MuiFormLabel>
  );
}
