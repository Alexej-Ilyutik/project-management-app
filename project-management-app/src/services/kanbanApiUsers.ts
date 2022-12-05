import { updateUserRequestInterface, userInterface } from 'types/kanbanApiTypes';
import { kanbanApi } from './kanbanApi';

export const kanbanApiUsers = kanbanApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<userInterface, void>({
      query: () => ({
        url: `/users`,
        method: 'GET',
      }),
    }),
    getUserById: builder.query<userInterface, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
    }),
    updateUserById: builder.mutation<userInterface, updateUserRequestInterface>({
      query: (payload) => ({
        url: `/users/${payload.userId}`,
        method: 'PUT',
        body: { name: payload.name, login: payload.login, password: payload.password },
      }),
    }),
    deleteUserById: builder.mutation<userInterface, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
} = kanbanApiUsers;
