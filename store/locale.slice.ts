import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocaleState { locale: string }
const initialState: LocaleState = { locale: 'en' };

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<string>) {
      state.locale = action.payload;
    }
  }
});

export const { setLocale } = localeSlice.actions;
export default localeSlice.reducer;
