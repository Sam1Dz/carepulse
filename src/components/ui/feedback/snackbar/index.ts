/* TYPES */
import type { AlertProps } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AlertBase = {
  severity?: Exclude<AlertProps['severity'], 'warning'>;
  description?: string;
};
