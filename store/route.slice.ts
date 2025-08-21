interface Route { key: string, href: string };
interface Router {
  route: Route[];
}

const initialState: Router = {
  route: [
    { key: 'home', href: '/home' },
    { key: 'article', href: '/article' },
    { key: 'publish', href: '/publish' },
    { key: 'contact', href: '/contact' },
  ]
}

import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setRoute(state, action: PayloadAction<Route[]>) {
      state.route = action.payload;
    }
  }
});

export const { setRoute } = routeSlice.actions;
export default routeSlice.reducer;