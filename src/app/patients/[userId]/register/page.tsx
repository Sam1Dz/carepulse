'use client';

// http://localhost:3000/patients/669795f40027e0343805/register

import React from 'react';
import { useRouter } from 'next/navigation';

/* MATERIAL UI */
import { Box, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';

/* COMPONENTS */
import Color from '@/components/theme/color-pallete';
import RegisterForm from '@/components/form/RegisterForm';
import { StyledImage } from '@/components/theme';

/* LIBRARIES */
import { GetUser } from '@/libs/actions/patient.action';

/* TYPES */
import { ResponseType, SearchParamProps, User } from '@/types';

/* STYLES */
import { container, sideImg, subContainer } from '@/styles/global';

export default function Register({ params: { userId } }: SearchParamProps) {
  const MuiTheme = useTheme();
  const NextRouter = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [user, setUser] = React.useState<User>();

  /* Main Function */
  const GetDataUser = React.useCallback(async () => {
    try {
      const responses = await GetUser(userId);

      if (responses.status === 'error') throw responses;
      if (responses.status === 'success' && responses.data) {
        setUser({
          $id: responses.data.$id,
          email: responses.data.email,
          name: responses.data.name,
          phone: responses.data.phone,
        });
      }
    } catch (error) {
      const errorResponse = error as unknown as ResponseType<null>;

      if (errorResponse.code === 404) {
        enqueueSnackbar('Pasien tidak ditemukan', {
          variant: 'alert',
          severity: 'error',
          description:
            (error as unknown as ResponseType<null>).description || '',
        });
      } else {
        enqueueSnackbar('Terjadi kesalahan', {
          variant: 'alert',
          severity: 'error',
          description:
            (error as unknown as ResponseType<null>).description || '',
        });
      }
      NextRouter.push(`/`);
    }
  }, [NextRouter, enqueueSnackbar, userId]);

  /* Component Function */
  const logoImage =
    MuiTheme.palette.mode === 'dark'
      ? '/assets/icons/logo-full-dark.svg'
      : '/assets/icons/logo-full-light.svg';
  const sideImage =
    MuiTheme.palette.mode === 'dark'
      ? '/assets/images/register-dark-img.jpeg'
      : '/assets/images/register-light-img.jpeg';

  React.useEffect(() => {
    GetDataUser();
  }, [GetDataUser]);

  if (!user) {
    return (
      <Box
        sx={{
          gap: 2,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
        <Typography>Memuat data pasien...</Typography>
      </Box>
    );
  }

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

          <RegisterForm userData={user} />
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
