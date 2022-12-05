import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { kanbanApi } from 'services/kanbanApi';

import { rootReducer } from './reducers/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(kanbanApi.middleware),
});

setupListeners(store.dispatch);
