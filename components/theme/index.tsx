'use client';

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { useEffect, useState } from 'react';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Inner>{children}</Inner>
    </NextThemesProvider>
  );
}

function Inner({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const algorithm =
    resolvedTheme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm;

  //延迟渲染 ConfigProvider，等待客户端 hydration 完成
  useEffect(() => {
    setMounted(true);
  }, [resolvedTheme]);

  if (!mounted) return null;

  return <ConfigProvider theme={{ algorithm }}>{children}</ConfigProvider>;
}