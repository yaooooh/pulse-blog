import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState { theme: string }
const initialState: ThemeState = { theme: 'dark' };

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload;
    }
  }
});

export const { setTheme } = localeSlice.actions;
export default localeSlice.reducer;
