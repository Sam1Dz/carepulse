'use client';

import React from 'react';

/* MATERIAL UI */
import {
  Stack,
  Avatar,
  Button,
  Checkbox,
  MenuItem,
  TextField,
  FormGroup,
  Typography,
  ListItemIcon,
  ListItemText,
  InputAdornment,
  FormControlLabel,
  Unstable_Grid2 as Grid,
} from '@mui/material';

/* MATERIAL UI | ICONS */
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

/* COMPONENTS */
import PhoneField from '../ui/inputs/phone-field';
import SelectField from '../ui/inputs/select';
import UploadDndField from '../ui/inputs/upload/upload-dnd-field';
import DatePickerField from '../ui/inputs/date/date-picker-field';
import { StyledImage } from '../theme';

/* CONSTANTS */
import { Doctors, GenderOptions, IdentificationTypes } from '@/constants';

/* TYPES */
import type { SvgIconProps } from '@mui/material';

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

      <Stack component="section" direction="column" gap={3} sx={{ mb: 3 }}>
        <Typography component="h2" variant="h5" fontWeight="bold">
          Informasi Pribadi
        </Typography>

        <Stack component="div" gap={3}>
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
            <Grid xs={12} md={6}>
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
            <Grid xs={12} md={6}>
              <PhoneField fullWidth name="phone" label="Nomor Telepon *" />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <DatePickerField
                fullWidth
                name="birthDate"
                label="Tanggal Lahir *"
              />
            </Grid>
            <Grid md={6} xs={12}>
              <SelectField
                fullWidth
                name="gender"
                label="Jenis Kelamin *"
                renderValue={(value) => {
                  const selectedata = GenderOptions.find(
                    (gender) => value === gender.value,
                  );

                  return (
                    <Stack spacing={1} direction="row">
                      {selectedata?.icon}
                      <Typography>{selectedata?.tlId}</Typography>
                    </Stack>
                  );
                }}
              >
                {GenderOptions.map((gender) => (
                  <MenuItem key={gender.value} value={gender.value}>
                    <ListItemIcon>
                      {React.cloneElement<SvgIconProps>(gender.icon, {
                        fontSize: 'small',
                      })}
                    </ListItemIcon>
                    <ListItemText>{gender.tlId}</ListItemText>
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
                placeholder="Kevin Skinner"
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
        </Stack>
      </Stack>

      <Stack component="section" direction="column" gap={3} sx={{ mb: 3 }}>
        <Typography component="h2" variant="h5" fontWeight="bold">
          Informasi Kesehatan
        </Typography>

        <Stack component="div" gap={3}>
          <SelectField
            fullWidth
            name="primaryPhysician"
            label="Dokter Utama *"
            renderValue={(value) => {
              const selectedata = Doctors.find(
                (doctor) => value === doctor.name,
              );

              return (
                <Stack spacing={1} direction="row">
                  <Avatar sx={{ width: 24, height: 24 }}>
                    <StyledImage
                      fill
                      alt={selectedata?.name ?? ''}
                      src={selectedata?.image ?? ''}
                    />
                  </Avatar>
                  <Typography>{selectedata?.name}</Typography>
                </Stack>
              );
            }}
          >
            {Doctors.map((doctor) => (
              <MenuItem key={doctor.name} value={doctor.name}>
                <ListItemIcon>
                  <Avatar sx={{ width: 20, height: 20 }}>
                    <StyledImage fill alt={doctor.name} src={doctor.image} />
                  </Avatar>
                </ListItemIcon>
                <ListItemText>{doctor.name}</ListItemText>
              </MenuItem>
            ))}
          </SelectField>

          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <TextField
                fullWidth
                name="insuranceProvider"
                label="Penyedia Asuransi"
                placeholder="Jasa Raharja/Prudential/dll"
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                fullWidth
                name="insurancePolicyNumber"
                label="Nomor Polis Asuransi"
                placeholder="ABC123456789"
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="allergies"
                label="Alergi (jika ada)"
                placeholder="Kacang tanah, Penisilin, Serbuk sari, dll"
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="currentMedication"
                label="Obat Saat Ini (jika ada)"
                placeholder="Ibuprofein 200mg, Paracetamol 500mg, dll"
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="pastMedicalHistory"
                label="Riwayat Kesehatan"
                placeholder="Apendektomi, Tonsilektomi, dll"
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="familyMedicalHistory"
                label="Riwayat Kesehatan Keluarga"
                placeholder="Nenek memiliki Diabetes, Kakek memiliki Darah Tinggi, dll"
              />
            </Grid>
          </Grid>
        </Stack>
      </Stack>

      <Stack component="section" direction="column" gap={3}>
        <Typography component="h2" variant="h5" fontWeight="bold">
          Identifikasi dan Verifikasi Data
        </Typography>

        <Stack component="div" gap={3}>
          <SelectField
            fullWidth
            name="identificationType"
            label="Jenis Identitas *"
          >
            {IdentificationTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.tlId}
              </MenuItem>
            ))}
          </SelectField>

          <TextField
            fullWidth
            name="identificationNumber"
            label="Nomor Identitas *"
            placeholder="ABC123456789"
          />

          <UploadDndField
            files={[]}
            onChange={(files) => {
              console.log(files);
            }}
          />
        </Stack>
      </Stack>

      <Stack component="section" direction="column" gap={1}>
        <Typography component="h2" variant="h5" fontWeight="bold">
          Persetujuan dan Privasi
        </Typography>

        <FormGroup>
          <FormControlLabel
            required
            control={<Checkbox />}
            label="Saya setuju untuk menerima perawatan untuk kondisi kesehatan saya."
          />
          <FormControlLabel
            required
            control={<Checkbox />}
            label="Saya menyetujui penggunaan dan pengungkapan informasi kesehatan saya untuk tujuan pengobatan."
          />
          <FormControlLabel
            required
            control={<Checkbox />}
            label="Saya mengakui bahwa saya telah meninjau dan menyetujui kebijakan privasi."
          />
        </FormGroup>
      </Stack>

      <Button type="submit" variant="contained">
        Kirim
      </Button>
    </Stack>
  );
}
