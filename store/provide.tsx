'use client';
import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, RootStore } from './index';

interface Props {
  initialLocale: string;
  children: React.ReactNode;
}

export default function StoreProvider({ initialLocale, children }: Props) {
  const storeRef = useRef<RootStore>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore(initialLocale);
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
