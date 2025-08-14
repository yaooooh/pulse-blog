'use client'
import '@ant-design/v5-patch-for-react-19';
import { track } from '@vercel/analytics';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  track('enter')
  return children;
}
