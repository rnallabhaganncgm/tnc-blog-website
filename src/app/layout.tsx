import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import ClientOnly from "@/components/client-only";
import { ReactQueryProvider } from "@/components/react-query-provider";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crypto Blog - Blockchain | Cryptocurrency News Media | Crypto Guide",
  description:
    "Crypto Blog is an online media publication that helps to educate readers about crypto news, exchanges, and markets in the crypto and blockchain industry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable}`}>
      <body className={`font-sans antialiased`}>
        <ClientOnly>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <main className="py-10">{children}</main>
            </ThemeProvider>
          </ReactQueryProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
