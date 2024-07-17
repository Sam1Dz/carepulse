import * as yup from 'yup';
import { matchIsValidTel } from 'mui-tel-input';

export const UserFormValidation = yup.object({
  name: yup
    .string()
    .min(2, 'Nama minimal harus memiliki 2 karakter.')
    .max(50, 'Nama maksimal 50 karakter.')
    .required('Nama tidak boleh kosong'),
  email: yup
    .string()
    .email('Alamat email tidak valid.')
    .required('Alamat email tidak boleh kosong'),
  phone: yup
    .string()
    .test({
      name: 'phone',
      test(value, ctx) {
        if (!matchIsValidTel(value || '')) {
          return ctx.createError({ message: 'Nomor Telepon tidak valid.' });
        }

        return true;
      },
    })
    .required('Nomor Telepon tidak boleh kosong'),
});
