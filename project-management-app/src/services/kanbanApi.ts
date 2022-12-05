import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from './getToken';

export const kanbanApi = createApi({
  reducerPath: 'kanbanApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://project-management-system-backend.up.railway.app',
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', 'Bearer ' + token);
      }
      return headers;
    },
  }),
  tagTypes: ['TaskTag', 'ColumnTag', 'BoardTag'],
  endpoints: () => ({}),
});
