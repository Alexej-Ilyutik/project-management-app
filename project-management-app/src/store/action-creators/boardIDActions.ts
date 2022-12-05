import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BoardIDState {
  boardID: string;
}

const initialState: BoardIDState = {
  boardID: '',
};

export const boardIDActionsCreator = createSlice({
  name: 'boardID',
  initialState,
  reducers: {
    changeBoardID(state, action: PayloadAction<string>) {
      state.boardID = action.payload;
    },
  },
});

export const boardIDActions = boardIDActionsCreator.actions;
export const boardIDReducer = boardIDActionsCreator.reducer;
