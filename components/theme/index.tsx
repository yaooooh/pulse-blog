'use client';

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { ConfigProvider, theme as antdTheme } from 'antd';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Inner antChildren={children} />
    </NextThemesProvider>
  );
}

function Inner({ antChildren }: { antChildren: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const algorithm =
    resolvedTheme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm;
  return <ConfigProvider theme={{ algorithm }}>{antChildren}</ConfigProvider>;
}
