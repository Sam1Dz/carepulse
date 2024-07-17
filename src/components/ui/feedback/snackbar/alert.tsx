import React from 'react';

/* MATERIAL UI */
import { useTheme } from '@mui/material';
import { Alert, AlertTitle } from '@mui/material';
import { SnackbarContent, useSnackbar } from 'notistack';

/* COMPONENTS */
import Color from '@/components/theme/color-pallete';

/* TYPES */
import type { AlertBase } from '.';
import type { CustomContentProps } from 'notistack';

type UISnackbarAlertProps = CustomContentProps & AlertBase;

const UISnackbarAlert = React.forwardRef<HTMLDivElement, UISnackbarAlertProps>(
  ({ id, message, severity, description, ...props }, ref) => {
    const MuiTheme = useTheme();
    const { closeSnackbar } = useSnackbar();

    /* Component Function */
    const getAlertType = () => {
      switch (severity) {
        case 'error':
          return {
            severity,
            bgcolor:
              MuiTheme.palette.mode === 'dark'
                ? Color.dark.red[700]
                : Color.light.red[500],
          };

        case 'info':
          return {
            severity,
            bgcolor:
              MuiTheme.palette.mode === 'dark'
                ? Color.dark.blue[500]
                : Color.light.blue[500],
          };

        default:
          return {
            severity,
            bgcolor:
              MuiTheme.palette.mode === 'dark'
                ? Color.dark.green[500]
                : Color.light.green[500],
          };
      }
    };

    const handleDismiss = React.useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
      <SnackbarContent ref={ref} {...props}>
        <Alert
          variant="filled"
          severity={getAlertType().severity}
          onClose={handleDismiss}
          sx={{
            width: '100%',
            bgcolor: getAlertType().bgcolor,
          }}
        >
          {!description ? (
            message
          ) : (
            <React.Fragment>
              <AlertTitle>{message}</AlertTitle>
              {description}
            </React.Fragment>
          )}
        </Alert>
      </SnackbarContent>
    );
  },
);
UISnackbarAlert.displayName = 'UISnackbarAlert';

export default UISnackbarAlert;
