import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocaleState { tags: string[] }
const initialState: LocaleState = { tags: [] };

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setTags(state, action: PayloadAction<string[]>) {
      state.tags = action.payload;
    }
  }
});

export const { setTags } = articleSlice.actions;
export default articleSlice.reducer;
