'use client';

/* MATERIAL UI */
import {
  Button,
  Stack,
  MenuItem,
  TextField,
  Typography,
  InputAdornment,
  Unstable_Grid2 as Grid,
} from '@mui/material';

/* MATERIAL UI | ICONS */
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

/* COMPONENTS */
import PhoneField from '../ui/inputs/phone-field';
import SelectField from '../ui/inputs/select';
import DatePickerField from '../ui/inputs/date/date-picker-field';
import { GenderOptions } from '@/constants';

export default function RegisterForm() {
  return (
    <Stack component="form" direction="column" gap={3}>
      <Stack component="section" direction="column" gap={2} sx={{ mb: 3 }}>
        <Typography component="h1" variant="h4" fontWeight="bold">
          Selamat Datang 👋
        </Typography>
        <Typography color="text.secondary">
          Yuk lengkapi data diri kamu terlebih dahulu.
        </Typography>
      </Stack>

      <Stack component="section" direction="column" gap={3}>
        <Stack component="div" direction="column" gap={0.5}>
          <Typography component="h2" variant="h5" fontWeight="bold">
            Informasi Pribadi
          </Typography>
        </Stack>
      </Stack>

      <TextField
        name="name"
        label="Nama *"
        placeholder="John Doe"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon sx={{ color: 'text.primary' }} />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={3}>
        <Grid md={6} xs={12}>
          <TextField
            fullWidth
            name="email"
            label="Email *"
            placeholder="johndoe@email.com"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: 'text.primary' }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid md={6} xs={12}>
          <PhoneField fullWidth name="phone" label="Nomor Telepon *" />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid md={6} xs={12}>
          <DatePickerField fullWidth name="birthDate" label="Tanggal Lahir *" />
        </Grid>
        <Grid md={6} xs={12}>
          <SelectField fullWidth label="Jenis Kelamin *">
            {GenderOptions.map((gender) => (
              <MenuItem key={gender.value} value={gender.value}>
                {gender.tlId}
              </MenuItem>
            ))}
          </SelectField>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid md={6} xs={12}>
          <TextField
            fullWidth
            name="address"
            label="Alamat *"
            placeholder="Alamat Lengkap"
          />
        </Grid>
        <Grid md={6} xs={12}>
          <TextField
            fullWidth
            name="occupation"
            label="Pekerjaan *"
            placeholder="Swasta/Pedagang/dll"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid md={6} xs={12}>
          <TextField
            fullWidth
            name="emergencyContactName"
            label="Nama Kontak Darurat *"
            placeholder="John Doe"
          />
        </Grid>
        <Grid md={6} xs={12}>
          <PhoneField
            fullWidth
            name="emergencyContactNumber"
            label="Nomor Telepon Kontak Darurat *"
          />
        </Grid>
      </Grid>

      <Stack component="section" direction="column" gap={3} sx={{ mt: 3 }}>
        <Stack component="div" direction="column" gap={0.5}>
          <Typography component="h2" variant="h5" fontWeight="bold">
            Informasi Kesehatan
          </Typography>
        </Stack>
      </Stack>

      <Button type="submit" variant="contained">
        Kirim
      </Button>
    </Stack>
  );
}
