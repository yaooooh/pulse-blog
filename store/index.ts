import { configureStore } from '@reduxjs/toolkit';
import localeReducer from './locale.slice';
import themeReducer from './theme.slice';

export function makeStore(preloadedLocale?: string) {
  return configureStore({
    reducer: { locale: localeReducer, theme: themeReducer },
    preloadedState: preloadedLocale
      ? {
          locale: {
            locale: preloadedLocale
          },
          theme: {
            theme: preloadedLocale
          }
        }
      : undefined,
  });
}

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = typeof makeStore extends () => infer S ? S : unknown;
