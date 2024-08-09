/* MATERIAL UI | ICONS */
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

export const GenderOptions = [
  {
    value: 'male',
    tlId: 'Laki - Laki',
    tlEn: 'Male',
    icon: <MaleIcon />,
  },
  {
    value: 'female',
    tlId: 'Perempuan',
    tlEn: 'Female',
    icon: <FemaleIcon />,
  },
  {
    value: 'hidden',
    tlId: 'Tidak Menjawab',
    tlEn: 'Hidden',
    icon: <NotInterestedIcon />,
  },
];

export const Doctors = [
  {
    image: '/assets/images/dr-green.png',
    name: 'John Green',
  },
  {
    image: '/assets/images/dr-cameron.png',
    name: 'Leila Cameron',
  },
  {
    image: '/assets/images/dr-livingston.png',
    name: 'David Livingston',
  },
  {
    image: '/assets/images/dr-peter.png',
    name: 'Evan Peter',
  },
  {
    image: '/assets/images/dr-powell.png',
    name: 'Jane Powell',
  },
  {
    image: '/assets/images/dr-remirez.png',
    name: 'Alex Ramirez',
  },
  {
    image: '/assets/images/dr-lee.png',
    name: 'Jasmine Lee',
  },
  {
    image: '/assets/images/dr-cruz.png',
    name: 'Alyana Cruz',
  },
  {
    image: '/assets/images/dr-sharma.png',
    name: 'Hardik Sharma',
  },
];

export const IdentificationTypes = [
  {
    value: 'National Identity Card',
    tlId: 'Kartu Tanda Penduduk (KTP)',
    tlEn: 'National Identity Card',
  },
  {
    value: 'Student ID Card',
    tlId: 'Kartu Pelajar',
    tlEn: 'Student ID Card',
  },
  {
    value: 'Medical Insurance Card/Policy',
    tlId: 'Kartu BPJS Kesehatan',
    tlEn: 'Medical Insurance Card/Policy',
  },
  {
    value: "Driver's License",
    tlId: 'Surat Izin Mengemudi (SIM)',
    tlEn: "Driver's License",
  },
  {
    value: 'Birth Certificate',
    tlId: 'Akta kelahiran',
    tlEn: 'Birth Certificate',
  },
  {
    value: 'Passport',
    tlId: 'Passpor',
    tlEn: 'Passport',
  },
];
