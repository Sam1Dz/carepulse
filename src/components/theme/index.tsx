'use client';

import React from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { Plus_Jakarta_Sans } from 'next/font/google';

/* MATERIAL UI */
import { styled } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles';

/* COLOR PALLETE */
import Color from './color-pallete';

/* COMPONENTS */
import UISnackbarAlert from '../ui/feedback/snackbar/alert';

/* TYPES */
import type { PaletteMode } from '@mui/material';
import type { PropsWithChildren } from '@/types';
import type { AlertBase } from '../ui/feedback/snackbar';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

declare module 'notistack' {
  interface VariantOverrides {
    default: false;
    alert: AlertBase;
  }
}

const FontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const StyledImage = styled(NextImage)({});
export const StyledLink = styled(NextLink)({});

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [mode] = React.useState<PaletteMode>('dark');

  const appTheme = createTheme({
    breakpoints: {
      values: { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536 },
    },
    palette: {
      mode: mode,
      background: {
        default:
          mode === 'dark' ? Color.neutral.black[300] : Color.neutral.white[200],
      },
      primary: {
        main: mode === 'dark' ? Color.dark.green[500] : Color.light.green[500],
      },
      text: {
        primary:
          mode === 'dark' ? Color.neutral.white[200] : Color.neutral.black[300],
        secondary:
          mode === 'dark' ? Color.neutral.black[700] : Color.neutral.black[500],
      },
      success: {
        main: mode === 'dark' ? Color.dark.green[500] : Color.light.green[500],
      },
      info: {
        main: mode === 'dark' ? Color.dark.blue[500] : Color.light.blue[500],
      },
      error: {
        main: mode === 'dark' ? Color.dark.red[700] : Color.light.red[500],
      },
    },
    typography: {
      fontFamily: [FontSans.style.fontFamily, 'sans-serif'].join(','),
    },
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color:
              mode === 'dark'
                ? Color.neutral.white[200]
                : Color.neutral.black[300],
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor:
              mode === 'dark'
                ? Color.neutral.white[200]
                : Color.neutral.black[300],
          },
        },
      },
    },
  });

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <MuiThemeProvider theme={appTheme}>
        <SnackbarProvider
          Components={{
            alert: UISnackbarAlert,
          }}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <CssBaseline />
          {children}
        </SnackbarProvider>
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  );
}
