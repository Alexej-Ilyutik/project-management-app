import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from 'types/kanbanApiTypes';
import { kanbanApi } from './kanbanApi';

export const kanbanApiAuth = kanbanApi.injectEndpoints({
  endpoints: (builder) => ({
    authSignIn: builder.query<SignInResponse, SignInRequest>({
      query: (payload) => ({
        url: `/auth/signin`,
        method: 'POST',
        body: payload,
      }),
    }),
    authSignUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (payload) => ({
        url: `/auth/signup`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAuthSignUpMutation, useAuthSignInQuery } = kanbanApiAuth;
