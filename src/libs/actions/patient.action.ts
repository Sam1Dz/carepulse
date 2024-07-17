'use server';

import { AppwriteException, ID, Models, Query } from 'node-appwrite';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Users } from '../appwrite.config';

/* TYPES */
import type { CreateUserParams, ResponseType } from '@/types';

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
