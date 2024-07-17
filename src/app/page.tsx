'use client';

import React from 'react';
import NextLink from 'next/link';

/* MATERIAL UI */
import { useTheme } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';

/* COMPONENTS */
import PatientForm from '@/components/form/PatientForm';
import Color from '@/components/theme/color-pallete';
import { StyledImage } from '@/components/theme';

/* STYLES */
import {
  container,
  removeScrollbar,
  sideImg,
  subContainer,
} from '@/styles/global';

export default function Home() {
  const MuiTheme = useTheme();

  /* Component Function */
  const logoImg =
    MuiTheme.palette.mode === 'dark'
      ? '/assets/icons/logo-full-dark.svg'
      : '/assets/icons/logo-full-light.svg';
  const sectionBoxSx = {
    ...removeScrollbar,
    ...container,
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        maxHeight: '100vh',
      }}
    >
      {/* TODO: OTP Verification | PasskeyModal */}

      <Box
        component="section"
        sx={{
          ...sectionBoxSx,
          my: 'auto',
        }}
      >
        <Box
          sx={{
            ...subContainer,
            pt: 5,
            maxWidth: 496,
          }}
        >
          <StyledImage
            alt="logo"
            src={logoImg}
            height={1000}
            width={1000}
            sx={{
              mb: 6,
              height: 40,
              width: 'fit-content',
            }}
          />

          <PatientForm />
          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              mt: 3,
              pb: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                justifyItems: 'end',
                color: (theme) =>
                  theme.palette.mode === 'dark'
                    ? Color.neutral.black[600]
                    : Color.neutral.black[500],
                textAlign: { xs: 'initial', xl: 'left' },
              }}
            >
              &copy; 2024 CarePulse
            </Typography>
            <NextLink href="/?admin=true">
              <Button>Admin</Button>
            </NextLink>
          </Box>
        </Box>
      </Box>

      <StyledImage
        alt="doctor"
        src="/assets/images/onboarding-img.png"
        width={1000}
        height={1000}
        sx={{
          ...sideImg,
          maxWidth: '50%',
        }}
      />
    </Box>
  );
}
