// store/userSlice.ts
interface Profile { id: string; name: string; avatar: string; bio: string }
interface Stats { articles: number; comments: number; likes: number }
interface ArticleRec { id: string; title: string; description?: string; }

interface User { profile: Profile, stats: Stats, recommendedArticles: ArticleRec };

const initialState = {
  profile: { id: 'u1', name: '李四', avatar: '/avatar.png', bio: '全栈开发者' },
  stats: { articles: 23, comments: 64, likes: 340 },
  recommendedArticles: [
    { id: 'a1', title: '文章一', description: '摘要一' },
    // … 更多
  ] as ArticleRec[]
}

import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<User>) {
      state.profile = action.payload.profile;
    }
  }
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;