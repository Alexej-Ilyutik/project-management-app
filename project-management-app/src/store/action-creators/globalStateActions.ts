import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getToken } from 'services/getToken';
import { getUserId } from 'services/getUserId';

interface GlobalStateInterface {
  token: string;
  userId: string;
}

const initialState: GlobalStateInterface = {
  token: getToken(),
  userId: getUserId(),
};

export const globalStateActionsCreator = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string, string>) => {
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
      };
    },
    setUserId: (state, action: PayloadAction<string, string>) => {
      localStorage.setItem('userId', action.payload);
      return {
        ...state,
        userId: action.payload,
      };
    },
  },
});

export const globalStateActions = globalStateActionsCreator.actions;
export const globalStateReducer = globalStateActionsCreator.reducer;
