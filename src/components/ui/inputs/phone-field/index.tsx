/* MATERIAL UI */
import { MuiTelInput } from 'mui-tel-input';

/* TYPES */
import type { MuiTelInputProps } from 'mui-tel-input';

export default function PhoneField(props: MuiTelInputProps) {
  return <MuiTelInput defaultCountry="ID" langOfCountryName="id" {...props} />;
}
