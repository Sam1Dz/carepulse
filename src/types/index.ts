/* TYPES */
import type { StatusCodes } from 'http-status-codes';
import type { Appointment } from './appwrite.type';

// GLOBAL
export type Gender = 'male' | 'female' | 'hidden';
export type Status = 'pending' | 'scheduled' | 'cancelled';

export interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
export interface User extends CreateUserParams {
  $id: string;
}

export interface RegisterUserParams extends CreateUserParams {
  userId: string;
  birthDate: string;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string | undefined;
  insurancePolicyNumber: string | undefined;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string;
  identificationNumber: string;
  identificationDocument: FormData;
}

export type RegisterUserFormParams = Omit<
  RegisterUserParams,
  | 'userId'
  | 'name'
  | 'email'
  | 'phone'
  | 'birthDate'
  | 'gender'
  | 'identificationDocument'
> & {
  gender: Gender | '';
  birthDate: Date | null;
  identificationDocument: File | null;
};

export interface CreateAppointmentParams {
  userId: string;
  patient: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
}

export interface UpdateAppointmentParams {
  appointmentId: string;
  userId: string;
  appointment: Appointment;
  type: string;
}

// CLIENT
export type PropsWithChildren = Readonly<{ children?: React.ReactNode }>;
export type PropsWithChildrenRequired = Readonly<{
  children: React.ReactNode;
}>;

export interface SearchParamProps {
  params: Record<string, string>;
  searchParams: Record<string, string | string[] | undefined>;
}

// SERVER
export interface ResponseType<T> {
  status: 'success' | 'error';
  data: T;
  code: StatusCodes;
  message: string;
  description: string | null;
}
