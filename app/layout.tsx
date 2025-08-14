import type { Metadata } from "next";
import Script from 'next/script'
import classNames from 'classnames';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import "./globals.css";
import ThemeWrapper from "../components/theme";
import StoreProvider from '../store/provide'
import '@ant-design/v5-patch-for-react-19';
import { Analytics } from '@vercel/analytics/next';
import NavBar from "./components/nav-bar";
import Footer from "./components/footer";
import Transition from "./components/transition";

export const metadata: Metadata = {
  title: "Pulse Blog",
  description: "online blog about knowledge",
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
      <Script src="/sladar.js"></Script>
      <body className={classNames("antialiased", locale === 'en' ? 'ltr' : 'ltr')} >
        <StoreProvider initialLocale={locale}>
          <AntdRegistry>
            <ThemeWrapper>
              <NavBar />
              <div className="min-h-[calc(100vh-132px)] overflow-hidden flex vertical justify-around items-stretch">
                <div className="flex-1 relative">
                  <Transition children={children} />
                </div>
              </div>
              <div>
                <Footer />
              </div>
            </ThemeWrapper>
          </AntdRegistry>
        </StoreProvider>
        <Analytics />
      </body>
    </html>
  );
}
