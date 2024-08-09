import React from 'react';

/* MATERIAL UI */
import {
  Box,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';

/* TYPES */
import type { PropsWithChildrenRequired } from '@/types';
import type { SelectProps } from '@mui/material/Select';

type SelectFieldProps = Omit<SelectProps, 'labelId'> &
  PropsWithChildrenRequired & {
    fullWidth?: boolean;
    helperText?: React.ReactNode;
  };

export default function SelectField(props: SelectFieldProps) {
  const { children, error, fullWidth, helperText, label } = props;

  return (
    <Box component="div">
      <FormControl fullWidth={fullWidth}>
        <InputLabel id={`select-label-${label}`} error={error}>
          {label}
        </InputLabel>
        <Select
          labelId={`select-label-${label}`}
          {...props}
          sx={{
            '& .MuiSvgIcon-root': {
              color: error ? 'error.main' : 'text.primary',
            },
            ...props.sx,
          }}
        >
          {children}
        </Select>
      </FormControl>
      <FormHelperText error={error} sx={{ mx: 1.75 }}>
        {helperText}
      </FormHelperText>
    </Box>
  );
}
