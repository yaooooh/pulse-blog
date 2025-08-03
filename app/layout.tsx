import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Pulse Blog",
  description: "online blog about knowledge"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
