/* TYPES */
import type { StatusCodes } from 'http-status-codes';
import type { Appointment } from './appwrite.type';

// GLOBAL
export type Gender = 'Male' | 'Female' | 'Other';
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
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
}

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
