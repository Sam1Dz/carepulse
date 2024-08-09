'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { useFormik } from 'formik';

/* MATERIAL UI */
import {
  Stack,
  Avatar,
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
import { LoadingButton as Button } from '@mui/lab';
import { useSnackbar } from 'notistack';

/* MATERIAL UI | ICONS */
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

/* COMPONENTS */
import PhoneField from '../ui/inputs/phone-field';
import SelectField from '../ui/inputs/select';
import DatePickerField from '../ui/inputs/date/date-picker-field';
import UploadImageDndField from '../ui/inputs/upload/upload-image-dnd-field';
import { StyledImage } from '../theme';

/* CONSTANTS */
import { Doctors, GenderOptions, IdentificationTypes } from '@/constants';

/* LIBRARIES */
import { RegisterPatient } from '@/libs/actions/patient.action';
import { ConvertToISOLocalTime, FormatDateToDayJs } from '@/libs/utils';
import { PatientFormValidation } from '@/libs/validation';

/* TYPES */
import type { SvgIconProps } from '@mui/material';
import type {
  Gender,
  RegisterUserFormParams,
  RegisterUserParams,
  ResponseType,
  User,
} from '@/types';

interface RegisterFormProps {
  userData: User;
}

export default function RegisterForm({ userData }: RegisterFormProps) {
  const NextRouter = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  /* Main Function */
  const formik = useFormik<RegisterUserFormParams>({
    initialValues: {
      birthDate: null,
      gender: '',
      address: '',
      occupation: '',
      emergencyContactName: '',
      emergencyContactNumber: '',
      primaryPhysician: '',
      insuranceProvider: '',
      insurancePolicyNumber: '',
      allergies: '',
      currentMedication: '',
      pastMedicalHistory: '',
      familyMedicalHistory: '',
      identificationType: '',
      identificationNumber: '',
      identificationDocument: null,
    },
    validationSchema: PatientFormValidation,
    onSubmit: async (values) => {
      try {
        if (values.identificationDocument && values.birthDate) {
          // Convert document file to Form Data
          let DocumentFile = new FormData();

          const blobFile = new Blob([values.identificationDocument], {
            type: values.identificationDocument.type,
          });

          DocumentFile.append('blobFile', blobFile);
          DocumentFile.append('fileName', values.identificationDocument.name);

          // Build payload data
          const patientData: RegisterUserParams = {
            ...values,
            userId: userData.$id,
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            birthDate: ConvertToISOLocalTime(values.birthDate),
            gender: values.gender as Gender,
            identificationDocument: DocumentFile,
          };

          // Send Data to server
          const responses = await RegisterPatient(patientData);

          if (responses.status === 'error') throw responses;
          if (responses.status === 'success' && responses.data) {
            enqueueSnackbar('Berhasil registrasi pasien', {
              variant: 'alert',
              severity: 'success',
            });

            NextRouter.push(`/patients/${responses.data.$id}/new-appointment`);
          }
        } else {
          throw {
            status: 'error',
            data: null,
            code: StatusCodes.BAD_REQUEST,
            message: ReasonPhrases.BAD_REQUEST,
            description: '(400) BAD_REQUEST',
          };
        }
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

  return (
    <Stack
      gap={3}
      component="form"
      direction="column"
      onSubmit={formik.handleSubmit}
    >
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
            disabled
            name="name"
            label="Nama *"
            placeholder="John Doe"
            value={userData.name}
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
                disabled
                fullWidth
                name="email"
                label="Email *"
                value={userData.email}
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
              <PhoneField
                disabled
                fullWidth
                name="phone"
                label="Nomor Telepon *"
                value={userData.phone}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <DatePickerField
                name="birthDate"
                label="Tanggal Lahir *"
                disabled={formik.isSubmitting}
                value={FormatDateToDayJs(formik.values.birthDate)}
                onChange={(value) => {
                  if (value) {
                    formik.setValues({
                      ...formik.values,
                      birthDate: value.toDate(),
                    });
                  }
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error:
                      formik.touched.birthDate &&
                      Boolean(formik.errors.birthDate),
                    helperText:
                      formik.touched.birthDate && formik.errors.birthDate,
                    onBlur: formik.handleBlur,
                  },
                }}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <SelectField
                fullWidth
                name="gender"
                label="Jenis Kelamin *"
                value={formik.values.gender}
                disabled={formik.isSubmitting}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={formik.touched.gender && formik.errors.gender}
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
                value={formik.values.address}
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                fullWidth
                name="occupation"
                label="Pekerjaan *"
                placeholder="Swasta/Pedagang/dll"
                value={formik.values.occupation}
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.occupation && Boolean(formik.errors.occupation)
                }
                helperText={
                  formik.touched.occupation && formik.errors.occupation
                }
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
                value={formik.values.emergencyContactName}
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.emergencyContactName &&
                  Boolean(formik.errors.emergencyContactName)
                }
                helperText={
                  formik.touched.emergencyContactName &&
                  formik.errors.emergencyContactName
                }
              />
            </Grid>
            <Grid md={6} xs={12}>
              <PhoneField
                fullWidth
                name="emergencyContactNumber"
                label="Nomor Telepon Kontak Darurat *"
                value={formik.values.emergencyContactNumber}
                disabled={formik.isSubmitting}
                onChange={(value) => {
                  formik.setValues({
                    ...formik.values,
                    emergencyContactNumber: value,
                  });
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.emergencyContactNumber &&
                  Boolean(formik.errors.emergencyContactNumber)
                }
                helperText={
                  formik.touched.emergencyContactNumber &&
                  formik.errors.emergencyContactNumber
                }
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
            value={formik.values.primaryPhysician}
            disabled={formik.isSubmitting}
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.primaryPhysician &&
              Boolean(formik.errors.primaryPhysician)
            }
            helperText={
              formik.touched.primaryPhysician && formik.errors.primaryPhysician
            }
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
                value={formik.values.insuranceProvider}
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.insuranceProvider &&
                  Boolean(formik.errors.insuranceProvider)
                }
                helperText={
                  formik.touched.insuranceProvider &&
                  formik.errors.insuranceProvider
                }
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                fullWidth
                name="insurancePolicyNumber"
                label="Nomor Polis Asuransi"
                placeholder="ABC123456789"
                value={formik.values.insurancePolicyNumber}
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.insurancePolicyNumber &&
                  Boolean(formik.errors.insurancePolicyNumber)
                }
                helperText={
                  formik.touched.insurancePolicyNumber &&
                  formik.errors.insurancePolicyNumber
                }
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
                value={formik.values.allergies}
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.allergies && Boolean(formik.errors.allergies)
                }
                helperText={formik.touched.allergies && formik.errors.allergies}
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
                value={formik.values.currentMedication}
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.currentMedication &&
                  Boolean(formik.errors.currentMedication)
                }
                helperText={
                  formik.touched.currentMedication &&
                  formik.errors.currentMedication
                }
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
                value={formik.values.pastMedicalHistory}
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.pastMedicalHistory &&
                  Boolean(formik.errors.pastMedicalHistory)
                }
                helperText={
                  formik.touched.pastMedicalHistory &&
                  formik.errors.pastMedicalHistory
                }
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
                value={formik.values.familyMedicalHistory}
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.familyMedicalHistory &&
                  Boolean(formik.errors.familyMedicalHistory)
                }
                helperText={
                  formik.touched.familyMedicalHistory &&
                  formik.errors.familyMedicalHistory
                }
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
            value={formik.values.identificationType}
            disabled={formik.isSubmitting}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.identificationType &&
              Boolean(formik.errors.identificationType)
            }
            helperText={
              formik.touched.identificationType &&
              formik.errors.identificationType
            }
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
            value={formik.values.identificationNumber}
            disabled={formik.isSubmitting}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.identificationNumber &&
              Boolean(formik.errors.identificationNumber)
            }
            helperText={
              formik.touched.identificationNumber &&
              formik.errors.identificationNumber
            }
          />

          <UploadImageDndField
            name="identificationDocument"
            label="Foto/Scan Identitas *"
            acceptFile={['image/png', 'image/jpeg', 'image/webp']}
            helperAcceptFormat="PNG, JPEG, atau WebP"
            file={formik.values.identificationDocument}
            disabled={formik.isSubmitting}
            onChange={(file) => {
              formik.setValues({
                ...formik.values,
                identificationDocument: file,
              });
            }}
            error={
              formik.touched.identificationDocument &&
              Boolean(formik.errors.identificationDocument)
            }
            helperText={
              formik.touched.identificationDocument &&
              formik.errors.identificationDocument
            }
          />
        </Stack>
      </Stack>

      <Stack
        component="section"
        direction="column"
        sx={{ gap: { xs: 3, md: 1.5 } }}
      >
        <Typography component="h2" variant="h5" fontWeight="bold">
          Persetujuan dan Privasi
        </Typography>

        <FormGroup sx={{ gap: { xs: 1.5, md: 0 } }}>
          <FormControlLabel
            required
            control={<Checkbox />}
            disabled={formik.isSubmitting}
            label="Saya setuju untuk menerima perawatan untuk kondisi kesehatan saya."
          />
          <FormControlLabel
            required
            control={<Checkbox />}
            disabled={formik.isSubmitting}
            label="Saya menyetujui penggunaan dan pengungkapan informasi kesehatan saya untuk tujuan pengobatan."
          />
          <FormControlLabel
            required
            control={<Checkbox />}
            disabled={formik.isSubmitting}
            label="Saya mengakui bahwa saya telah meninjau dan menyetujui kebijakan privasi."
          />
        </FormGroup>
      </Stack>

      <Button type="submit" variant="contained" loading={formik.isSubmitting}>
        Kirim
      </Button>
    </Stack>
  );
}
