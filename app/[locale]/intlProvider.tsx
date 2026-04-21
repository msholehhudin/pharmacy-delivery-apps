"use client";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";

type Props = {
  locale: string;
  messages: any;
  children: ReactNode;
};

export default function IntlProvider({ locale, children, messages }: Props) {
  // const messages = await getMessages({ locale });
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
