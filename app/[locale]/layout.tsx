import type { Metadata } from "next";
import classNames from 'classnames';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import "./globals.css";
import ThemeWrapper from "../../components/theme";
import StoreProvider from '../../store/provide'
import '@ant-design/v5-patch-for-react-19';
import NavBar from "./components/nav-bar";
import Footer from "./components/footer";

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
      <body className={classNames("antialiased h-full", locale === 'en' ? 'ltr' : 'ltr')} >
        <StoreProvider initialLocale={locale}>
          <AntdRegistry>
            <ThemeWrapper>
              <NavBar />
              {children}
              <Footer />
            </ThemeWrapper>
          </AntdRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
