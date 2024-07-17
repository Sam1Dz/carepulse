/* TYPES */
import { type SxProps, type Theme } from '@mui/material';

export type ThemeSx = SxProps<Theme>;

export const container: ThemeSx = {
  px: '5%',
  flex: '1 1 0%',
  height: '100vh',
  position: 'relative',
  overflowY: 'auto',
};

export const removeScrollbar: ThemeSx = {
  '::-webkit-scrollbar': {
    width: 0,
    height: 0,
    borderRadius: 0,
  },
  '::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    background: 'transparent',
    borderRadius: 0,
    '&:hover': {
      background: 'transparent',
    },
  },
};

export const sideImg: ThemeSx = {
  height: '100%',
  objectFit: 'cover',
  display: { xs: 'none', md: 'block' },
};

export const subContainer: ThemeSx = {
  mx: 'auto',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};
