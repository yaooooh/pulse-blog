'use client'
import '@ant-design/v5-patch-for-react-19';
import { track } from '@vercel/analytics';
import { usePrefetch } from '../../hooks/usePrefetch';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  usePrefetch();
  track('enter')
  return children;
}
