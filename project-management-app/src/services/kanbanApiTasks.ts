import { Task } from 'types/kanbanApiTypes';
import { kanbanApi } from './kanbanApi';

export const kanbanApiTasks = kanbanApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasksInColumn: builder.query<Task[], { boardId: string; columnId: string }>({
      query: (payload) => ({
        url: `/boards/${payload.boardId}/columns/${payload.columnId}/tasks`,
        method: 'GET',
      }),
      providesTags: ['TaskTag'],
    }),
    createTaskInColumn: builder.mutation<
      Task,
      {
        boardId: string;
        columnId: string | undefined;
        title: string;
        order: number | undefined;
        description: string;
        userId: string;
        users: string[];
      }
    >({
      query: (payload) => ({
        url: `/boards/${payload.boardId}/columns/${payload.columnId}/tasks`,
        method: 'POST',
        body: {
          title: payload.title,
          order: payload.order,
          description: payload.description,
          userId: payload.userId,
          users: payload.users,
        },
      }),
      invalidatesTags: ['TaskTag'],
    }),
    getTaskById: builder.query<Task, { boardId: string; columnId: string; taskId: string }>({
      query: (payload) => ({
        url: `/boards/${payload.boardId}/columns/${payload.columnId}/tasks/${payload.taskId}`,
        method: 'GET',
      }),
    }),
    updateTaskById: builder.mutation<
      Task,
      {
        boardId: string;
        columnId: string;
        taskId: string;
        title: string;
        order: number;
        description: string;
        userId: number;
        users: string[];
      }
    >({
      query: (payload) => ({
        url: `/boards/${payload.boardId}/columns/${payload.columnId}/tasks/${payload.taskId}`,
        method: 'PUT',
        body: {
          title: payload.title,
          order: payload.order,
          description: payload.description,
          columnId: payload.columnId,
          userId: payload.userId,
          users: payload.users,
        },
      }),
    }),
    deleteTasksById: builder.mutation<Task, { boardId: string; columnId: string; taskId: string }>({
      query: (payload) => ({
        url: `/boards/${payload.boardId}/columns/${payload.columnId}/tasks/${payload.taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TaskTag'],
    }),
    getTasksByIdsList: builder.query<Task[], { ids: string[]; userId: string; search: string }>({
      query: (payload) => ({
        url: `/tasksSet`,
        method: 'GET',
        params: { ids: payload.ids, userId: payload.userId, search: payload.search },
      }),
    }),
    updateSetOfTasks: builder.mutation<Task[], { _id: string; order: number; columnId: string }[]>({
      query: (payload) => ({
        url: `/tasksSet`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['TaskTag'],
    }),
    getTasksByBoardId: builder.query<Task[], { boardId: string }>({
      query: (payload) => ({
        url: `/tasksSet/${payload.boardId}`,
        method: 'GET',
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTasksInColumnQuery,
  useCreateTaskInColumnMutation,
  useGetTaskByIdQuery,
  useUpdateTaskByIdMutation,
  useDeleteTasksByIdMutation,
  useGetTasksByIdsListQuery,
  useUpdateSetOfTasksMutation,
  useGetTasksByBoardIdQuery,
} = kanbanApiTasks;
