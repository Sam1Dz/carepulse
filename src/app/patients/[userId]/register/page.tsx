'use client';

// http://localhost:3000/patients/669525fa003c831999ff/register

import React from 'react';

/* MATERIAL UI */
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

/* COMPONENTS */
import Color from '@/components/theme/color-pallete';
import RegisterForm from '@/components/form/RegisterForm';
import { StyledImage } from '@/components/theme';

/* LIBRARIES */
import { GetUser } from '@/libs/actions/patient.action';

/* TYPES */
import { SearchParamProps } from '@/types';

/* STYLES */
import { container, sideImg, subContainer } from '@/styles/global';

export default function Register({ params: { userId } }: SearchParamProps) {
  const MuiTheme = useTheme();

  /* Component Function */
  const logoImage =
    MuiTheme.palette.mode === 'dark'
      ? '/assets/icons/logo-full-dark.svg'
      : '/assets/icons/logo-full-light.svg';
  const sideImage =
    MuiTheme.palette.mode === 'dark'
      ? '/assets/images/register-dark-img.jpeg'
      : '/assets/images/register-light-img.jpeg';

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        maxHeight: '100vh',
      }}
    >
      <Box
        component="section"
        sx={{
          ...container,
          my: 'auto',
        }}
      >
        <Box
          sx={{
            ...subContainer,
            mx: 0,
            pt: 5,
          }}
        >
          <StyledImage
            alt="logo"
            src={logoImage}
            height={1000}
            width={1000}
            sx={{
              mb: 6,
              height: 40,
              width: 'fit-content',
            }}
          />

          <RegisterForm />
          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              mt: 3,
              pb: 3,
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
          </Box>
        </Box>
      </Box>

      <StyledImage
        alt="register"
        src={sideImage}
        width={1000}
        height={1000}
        sx={{
          ...sideImg,
          maxWidth: '25%',
        }}
      />
    </Box>
  );
}
