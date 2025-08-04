import type { Metadata } from "next";
import classNames from 'classnames';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import "./globals.css";
import ThemeWrapper from "../../components/theme";
import StoreProvider from '../../store/provide'
import '@ant-design/v5-patch-for-react-19';

export const metadata: Metadata = {
  title: "Pulse Blog",
  description: "online blog about knowledge"
};

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  params: { locale: string };
  children: React.ReactNode;
}>) {
  const { locale } = await params;

  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={classNames("h-full bg-white dark:bg-gray-900", locale === 'en' ? 'ltr' : 'ltr')} >
        <StoreProvider initialLocale={locale}>
          <ThemeWrapper>
            <AntdRegistry>
              {children}
            </AntdRegistry>
          </ThemeWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
