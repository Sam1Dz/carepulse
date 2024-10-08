'use client';

import { useRouter } from 'next/navigation';

/* FORMIK */
import { useFormik } from 'formik';

/* MATERIAL UI */
import { useSnackbar } from 'notistack';
import { LoadingButton as Button } from '@mui/lab';
import { InputAdornment, Stack, TextField, Typography } from '@mui/material';

/* MATERIAL UI | ICONS */
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

/* COMPONENTS */
import PhoneField from '../ui/inputs/phone-field';

/* LIBRARIES */
import { CreateUser } from '@/libs/actions/patient.action';
import { UserFormValidation } from '@/libs/validation';
import { RemoveTelFormatting, FormatDateTime } from '@/libs/utils';

/* TYPES */
import type { CreateUserParams, ResponseType } from '@/types';

export default function PatientForm() {
  const NextRouter = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  /* Main Function */
  const formik = useFormik<CreateUserParams>({
    initialValues: {
      name: '',
      email: '',
      phone: '+62',
    },
    validationSchema: UserFormValidation,
    onSubmit: async ({ name, email, phone }) => {
      try {
        const responses = await CreateUser({
          name,
          email,
          phone: RemoveTelFormatting(phone),
        });

        if (responses.status === 'error') throw responses;
        if (responses.status === 'success' && responses.code !== 304) {
          enqueueSnackbar('Berhasil kirim data', {
            variant: 'alert',
            severity: 'success',
          });
        }

        NextRouter.push(`/patients/${responses.data?.$id}/register`);
      } catch (error) {
        enqueueSnackbar('Terjadi kesalahan', {
          variant: 'alert',
          severity: 'error',
          description:
            (error as unknown as ResponseType<null>).description || '',
        });
      }
    },
  });

  /* Components Fuction */
  const getTranslatedTime = () => {
    const { translatedTime } = FormatDateTime(new Date());

    switch (translatedTime) {
      case 'morning':
        return 'Pagi';

      case 'noon':
        return 'Siang';

      case 'evening':
        return 'Sore';

      default:
        return 'Malam';
    }
  };

  return (
    <Stack
      component="form"
      direction="column"
      gap={3}
      onSubmit={formik.handleSubmit}
    >
      <Stack component="section" direction="column" gap={2} sx={{ mb: 6 }}>
        <Typography component="h1" variant="h4" fontWeight="bold">
          Selamat {getTranslatedTime()} 👋
        </Typography>
        <Typography color="text.secondary">
          Jadwalkan janji temu pertama kamu.
        </Typography>
      </Stack>

      <TextField
        name="name"
        label="Nama *"
        placeholder="John Doe"
        value={formik.values.name}
        disabled={formik.isSubmitting}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon sx={{ color: 'text.primary' }} />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        name="email"
        label="Email *"
        placeholder="johndoe@email.com"
        value={formik.values.email}
        disabled={formik.isSubmitting}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon sx={{ color: 'text.primary' }} />
            </InputAdornment>
          ),
        }}
      />
      <PhoneField
        name="phone"
        label="Nomor Telepon *"
        value={formik.values.phone}
        disabled={formik.isSubmitting}
        onChange={(value) => {
          formik.setValues({
            ...formik.values,
            phone: value,
          });
        }}
        onBlur={formik.handleBlur}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
      />

      <Button type="submit" variant="contained" loading={formik.isSubmitting}>
        Mulai
      </Button>
    </Stack>
  );
}
