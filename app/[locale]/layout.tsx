import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import ClientLayout from "./ClientLayout";
import { AuthProvider } from "@/context/AuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Providers from "./providers";
import IntlProvider from "./intlProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediXpress | Delivery Pharmacy App",
  description: "Buildin by Revingerz, Inc.",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return [{ locale: "id" }, { locale: "en" }];
}

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;

  // Get messages for the locale
  const messages = await getMessages({ locale });

  // const messages = {};

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <IntlProvider locale={locale} messages={messages}>
          {/* <NextIntlClientProvider locale={locale} messages={messages}> */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <Providers>
                <ClientLayout>{children}</ClientLayout>
              </Providers>
            </AuthProvider>
          </ThemeProvider>
          {/* </NextIntlClientProvider> */}
        </IntlProvider>
      </body>
    </html>
  );
}
