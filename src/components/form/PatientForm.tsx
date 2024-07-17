'use client';

/* FORMIK */
import { useFormik } from 'formik';

/* MATERIAL UI */
import { MuiTelInput } from 'mui-tel-input';
import { LoadingButton as Button } from '@mui/lab';
import { InputAdornment, Stack, TextField, Typography } from '@mui/material';

/* MATERIAL UI | ICONS */
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

/* LIBRARIES */
import { UserFormValidation } from '@/libs/validation';
import { formatDateTime } from '@/libs/utils';

export default function PatientForm() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '+62',
    },
    validationSchema: UserFormValidation,
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const getTranslatedTime = () => {
    const { translatedTime } = formatDateTime(new Date());

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
      <MuiTelInput
        name="phone"
        label="Nomor Telepon *"
        defaultCountry="ID"
        value={formik.values.phone}
        onChange={(value, info) => {
          const prefixCall = `+${info.countryCallingCode}`;

          if (value.length === prefixCall.length) {
            formik.setValues({
              ...formik.values,
              phone: value,
            });
          } else if (value.length > prefixCall.length) {
            formik.setValues({
              ...formik.values,
              phone: value,
            });
          }
        }}
        onBlur={formik.handleBlur}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
      />

      <Button type="submit" variant="contained">
        Mulai
      </Button>
    </Stack>
  );
}
