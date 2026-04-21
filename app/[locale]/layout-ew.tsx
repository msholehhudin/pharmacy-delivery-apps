// app/[locale]/layout.tsx (temporary test)
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test App",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>
        <div>Locale: {locale}</div>
        {children}
      </body>
    </html>
  );
}
