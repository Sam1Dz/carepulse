import * as yup from 'yup';
import { matchIsValidTel } from 'mui-tel-input';

/* TYPES */
import type { ObjectSchema } from 'yup';
import type { CreateUserParams, Gender, RegisterUserFormParams } from '@/types';

export const UserFormValidation: ObjectSchema<CreateUserParams> = yup.object({
  name: yup
    .string()
    .min(2, 'Nama minimal harus memiliki 2 karakter')
    .max(50, 'Nama maksimal 50 karakter')
    .required('Nama tidak boleh kosong'),
  email: yup
    .string()
    .email('Alamat email tidak valid')
    .required('Alamat email tidak boleh kosong'),
  phone: yup
    .string()
    .test({
      name: 'phone',
      test(value, ctx) {
        if (!matchIsValidTel(value || '')) {
          return ctx.createError({ message: 'Nomor Telepon tidak valid' });
        }

        return true;
      },
    })
    .required('Nomor Telepon tidak boleh kosong'),
});

export const PatientFormValidation: ObjectSchema<RegisterUserFormParams> =
  yup.object({
    birthDate: yup
      .date()
      .typeError('Tanggal Lahir tidak valid')
      .required('Tanggal Lahir tidak boleh kosong'),
    gender: yup
      .mixed<Gender>()
      .oneOf(['male', 'female', 'hidden'])
      .required('Jenis Kelamin tidak boleh kosong'),
    address: yup.string().required('Alamat tidak boleh kosong'),
    occupation: yup.string().required('Pekerjaan tidak boleh kosong'),
    emergencyContactName: yup
      .string()
      .required('Nama Kontak Darurat tidak boleh kosong'),
    emergencyContactNumber: yup
      .string()
      .test({
        name: 'emergencyContactNumber',
        test(value, ctx) {
          if (!matchIsValidTel(value || '')) {
            return ctx.createError({
              message: 'Nomor Telepon Kontak Darurat tidak valid',
            });
          }

          return true;
        },
      })
      .required('Nomor Telepon Kontak Darurat tidak boleh kosong'),
    primaryPhysician: yup.string().required('Dokter Utama tidak boleh kosong'),
    insuranceProvider: yup.string(),
    insurancePolicyNumber: yup.string(),
    allergies: yup.string(),
    currentMedication: yup.string(),
    pastMedicalHistory: yup.string(),
    familyMedicalHistory: yup.string(),
    identificationType: yup
      .string()
      .required('Jenis Identitas tidak boleh kosong'),
    identificationNumber: yup
      .string()
      .required('Nomor Identitas tidak boleh kosong'),
    identificationDocument: yup
      .mixed<File>()
      .required('Foto/Scan Identitas tidak boleh kosong'),
  });
