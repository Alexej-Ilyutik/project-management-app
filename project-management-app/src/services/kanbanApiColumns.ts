import { Column } from 'types/kanbanApiTypes';
import { kanbanApi } from './kanbanApi';

export const kanbanApiColumns = kanbanApi.injectEndpoints({
  endpoints: (builder) => ({
    getColumnsInBoard: builder.query<Column[], string>({
      query: (boardId) => ({
        url: `/boards/${boardId}/columns`,
        method: 'GET',
      }),
      providesTags: ['ColumnTag'],
    }),
    createColumnInBoard: builder.mutation<
      Column,
      { boardId: string; title: string; order: number | undefined }
    >({
      query: (payload) => ({
        url: `/boards/${payload.boardId}/columns`,
        method: 'POST',
        body: { title: payload.title, order: payload.order },
      }),
      invalidatesTags: ['ColumnTag'],
    }),
    getColumnById: builder.query<Column, { boardId: string; columnId: string }>({
      query: (payload) => ({
        url: `/boards/${payload.boardId}/columns/${payload.columnId}`,
        method: 'GET',
      }),
    }),
    updateColumnById: builder.mutation<
      Column,
      { boardId: string; columnId: string; title: string; order: string }
    >({
      query: (payload) => ({
        url: `/boards/${payload.boardId}/columns/${payload.columnId}`,
        method: 'PUT',
        body: { title: payload.title, order: payload.order },
      }),
    }),
    deleteColumnById: builder.mutation<Column, { boardId: string; columnId: string }>({
      query: (payload) => ({
        url: `/boards/${payload.boardId}/columns/${payload.columnId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ColumnTag'],
    }),
    getColumnByIdsList: builder.query<Column[], { ids?: string[]; userId?: string }>({
      query: (payload) => ({
        url: `/columnsSet`,
        method: 'GET',
        params: { ids: payload.ids || '', userId: payload.userId || '' }, //!!!
      }),
    }),
    updateSetOfColumns: builder.mutation<Column[], { _id: string; order: number }[]>({
      query: (payload) => ({
        url: `/columnsSet`,
        method: 'PATH',
        body: payload,
      }),
    }),
    createSetOfColumns: builder.mutation<
      Column[],
      { title: string; order: number; boardId: string }[]
    >({
      query: (payload) => ({
        url: `/columnsSet`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetColumnsInBoardQuery,
  useCreateColumnInBoardMutation,
  useGetColumnByIdQuery,
  useUpdateColumnByIdMutation,
  useDeleteColumnByIdMutation,
  useGetColumnByIdsListQuery,
  useUpdateSetOfColumnsMutation,
  useCreateSetOfColumnsMutation,
} = kanbanApiColumns;
