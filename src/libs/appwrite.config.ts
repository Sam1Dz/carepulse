import * as SDK from 'node-appwrite';

export const {
  APPWRITE_API_KEY,
  APPWRITE_PROJECT_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_DOCTOR_COLLECTION_ID,
  APPWRITE_PATIENT_COLLECTION_ID,
  APPWRITE_APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  NEXT_PUBLIC_APPWRITE_BUCKET_ID: APPWRITE_BUCKET_ID,
} = process.env;

const Client = new SDK.Client();
Client.setEndpoint(ENDPOINT!)
  .setProject(APPWRITE_PROJECT_ID!)
  .setKey(APPWRITE_API_KEY!);

export const Database = new SDK.Databases(Client);
export const Storage = new SDK.Storage(Client);
export const Messaging = new SDK.Messaging(Client);
export const Users = new SDK.Users(Client);
