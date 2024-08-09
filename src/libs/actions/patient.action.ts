'use server';

import { AppwriteException, ID, Models, Query } from 'node-appwrite';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { InputFile } from 'node-appwrite/file';
import {
  APPWRITE_BUCKET_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_PATIENT_COLLECTION_ID,
  APPWRITE_PROJECT_ID,
  Database,
  ENDPOINT,
  Storage,
  Users,
} from '../appwrite.config';

/* TYPES */
import type {
  CreateUserParams,
  RegisterUserParams,
  ResponseType,
} from '@/types';

export const CreateUser = async (
  user: CreateUserParams,
): Promise<ResponseType<Models.User<Models.Preferences> | null>> => {
  try {
    const NewUser = await Users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name,
    );

    return {
      status: 'success',
      code: StatusCodes.CREATED,
      data: NewUser,
      message: 'Success create new user',
      description: '(201) CREATED',
    };
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      if (error.code === 409) {
        const Documents = await Users.list([
          Query.equal('email', [user.email]),
        ]);

        return {
          status: 'success',
          code: StatusCodes.NOT_MODIFIED,
          data: Documents.users[0],
          message: 'User already exists on the server',
          description: '(304) NOT_MODIFIED',
        };
      } else {
        return {
          status: 'error',
          code: error.code,
          data: null,
          message: error.message,
          description: `(${error.code}) ${error.type.toUpperCase()}`,
        };
      }
    } else {
      return {
        status: 'error',
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        description: `(500) INTERNAL_SERVER_ERROR`,
      };
    }
  }
};

export const GetUser = async (
  userId: string,
): Promise<ResponseType<Models.User<Models.Preferences> | null>> => {
  try {
    const UserData = await Users.get(userId);

    return {
      status: 'success',
      code: StatusCodes.OK,
      data: UserData,
      message: 'Success get user',
      description: '(200) OK',
    };
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      return {
        status: 'error',
        code: error.code,
        data: null,
        message: error.message,
        description: `(${error.code}) ${error.type.toUpperCase()}`,
      };
    } else {
      return {
        status: 'error',
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        description: `(500) INTERNAL_SERVER_ERROR`,
      };
    }
  }
};

export const RegisterPatient = async ({
  identificationDocument,
  ...payload
}: RegisterUserParams) => {
  try {
    let DocumentFile: Models.File;

    // Upload document file to Appwrite Bucket
    const FileData = InputFile.fromBuffer(
      identificationDocument.get('blobFile') as Blob,
      identificationDocument.get('fileName') as string,
    );
    const FileStorage = await Storage.createFile(
      APPWRITE_BUCKET_ID!,
      ID.unique(),
      FileData,
    );
    DocumentFile = FileStorage;

    // Save patient data to Appwrite Database
    const RegisteredPatient = await Database.createDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: DocumentFile.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${APPWRITE_BUCKET_ID}/files/${DocumentFile.$id}/view?project=${APPWRITE_PROJECT_ID}`,
        ...payload,
      },
    );

    return {
      status: 'success',
      code: StatusCodes.CREATED,
      data: RegisteredPatient,
      message: 'Success registered patient',
      description: '(201) CREATED',
    };
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      return {
        status: 'error',
        code: error.code,
        data: null,
        message: error.message,
        description: `(${error.code}) ${error.type.toUpperCase()}`,
      };
    } else {
      return {
        status: 'error',
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        description: `(500) INTERNAL_SERVER_ERROR`,
      };
    }
  }
};
