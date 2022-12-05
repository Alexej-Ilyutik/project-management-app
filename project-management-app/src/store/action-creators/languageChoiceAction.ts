import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface languageChoiceState {
  languageChoice: boolean;
}

const initialState: languageChoiceState = {
  languageChoice: true,
};

export const languageChoiceActionsCreator = createSlice({
  name: 'languageChoice',
  initialState,
  reducers: {
    changeLanguage(state, action: PayloadAction<boolean>) {
      state.languageChoice = action.payload;
    },
  },
});

export const languageActions = languageChoiceActionsCreator.actions;
export const languageReducer = languageChoiceActionsCreator.reducer;
